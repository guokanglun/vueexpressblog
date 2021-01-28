# 接口文档

[TOC]

## 1、注册

### 请求URL：
	http://localhost:5000/user/register

### 请求方式：
	post

### 参数类型

	|参数		|是否必选 |类型     |说明
	|username    |Y       |string   |用户名
	|password    |Y       |string   |密码
	|rePassword    |Y       |string   |确认密码

### 返回示例：

	注册失败：{code: 1, msg: '用户名不能为空'}
	注册成功：{code: 0, msg: '注册成功'}



## 2、登录

### 请求URL：

```
http://localhost:5000/user/login
```

### 请求方式：

```
post
```

### 参数类型

```
|参数		|是否必选 |类型     |说明
|username    |Y       |string   |用户名
|password    |Y       |string   |密码
```

### 返回示例：

```
登录失败：{code: 1, msg: '用户名不能为空'}
登录成功：
{
    "code": 0,
    "msg": {
        "_id": "600f97768e583c28bc0b8235",
        "username": "gkl",
        "password": "123",
        "__v": 0
    }
}
```



## 3、获取所有用户

### 请求URL：

```
http://127.0.0.1:5000/admin/user?page=1&limit=4
```

### 请求方式：

```
get
```

### 参数类型 query

```
|参数		|是否必选 |类型     |说明
|page    |N       |string   |当前页数
|limit    |N       |string   |每页数量
```

### 返回示例：

```
[{"isAdmin":true,"_id":"600fc17dc26c0e2b84a66374","username":"admin","password":"123","__v":0},{"isAdmin":false,"_id":"600fc218574d0b2ffc877d03","username":"gkl","password":"123","__v":0}]
```



## 4、添加分类

### 请求URL：

```
http://localhost:5000/admin/categoryAdd
```

### 请求方式：

```
post
```

### 参数类型 query

```
|参数		|是否必选 |类型     |说明
|category    |Y       |string   |分类
```

### 返回示例：

```
失败：{
    "code": 1,
    "msg": "分类不能为空"
}

成功：{
    "code": 0,
    "msg": "分类保存成功"
}
```



## 5、获取分类

### 请求URL：

```
http://127.0.0.1:5000/admin/category
```

### 请求方式：

```
get
```

### 参数类型 

```
无
```

### 返回示例：

```
{"code":0,"msg":[{"_id":"601021f83376d2240c7e2792","name":"css","__v":0},{"_id":"6010255da25f653e2c993448","name":"css3","__v":0}]}
```



## 6、删除分类

### 请求URL：

```
http://localhost:5000/admin/delCategory
```

### 请求方式：

```
post
```

### 参数类型 

```
category
```

### 返回示例：

```
{
    "code": 0,
    "msg": "删除成功"
}
```





## 7、修改分类

### 请求URL：

```
http://localhost:5000/admin/updateCategory
```

### 请求方式：

```
post
```

### 参数类型 

```
|参数		|是否必选 |类型     |说明
|category    |Y       |string   |修改后分类
|_id    |Y       |string   |分类的id
```

### 返回示例：

```
{
    "code": 0,
    "msg": "修改成功"
}
```



## 8、添加内容

### 请求URL：

```
http://localhost:5000/admin/contentAdd
```

### 请求方式：

```
post
```

### 参数类型 

```
|参数		|是否必选 |类型     |说明
title, author, category, desc, content
标提    作者   分类      描述   内容
必选参数
```

### 返回示例：

```
{
    "code": 0,
    "msg": "文章保存成功"
}
```



## 9、获取内容

### 请求URL：

```
http://127.0.0.1:5000/admin/contentGet?page=1&limit=1
```

### 请求方式：

```
get
```

### 参数类型  query

```
|参数		|是否必选 |类型     |说明
|page    |N       |string   |当前页数
|limit    |N       |string   |每页数量
```

### 返回示例：

```
{"code":0,"msg":[{"publish_time":"2021-01-27T03:26:02.544Z","readNum":[],"commentNum":[],"_id":"6010de54534fcc0ef02c03e5","title":"css简介","author":"admin","category":"css","desc":"hhh","content":"aaaa","__v":0},{"publish_time":"2021-01-27T03:26:02.544Z","readNum":[],"commentNum":[],"_id":"6010df0f534fcc0ef02c03e6","title":"css简介","author":"admin","category":"css","desc":"a","content":"a","__v":0}]}
```



## 10、删除内容

### 请求URL：

```
http://127.0.0.1:5000/admin/contentDelete
```

### 请求方式：

```
post
```

### 参数类型  query

```
_id
```

### 返回示例：

```
{code: 0, msg:'删除成功'}
```



## 11、修改内容

### 请求URL：

```
http://127.0.0.1:5000/admin/contentUpdate
```

### 请求方式：

```
post
```

### 参数类型  query

```
_id, title, category, desc, content
```

### 返回示例：

```
{code:0, msg: '修改成功'}
```





## 12、通过category获取内容

### 请求URL：

```
http://127.0.0.1:5000/admin/contentGet/cate?category=css
```

### 请求方式：

```
get
```

### 参数类型  query

```
category
```

### 返回示例：

```
{"code":0,"msg":[{"publish_time":"1611739759317","readNum":0,"commentNum":[],"_id":"601134584bb7ce253c412e9c","title":"js测试","author":"admin","category":"js","desc":"aaa","content":"test","__v":0},{"publish_time":"1611739759317","readNum":0,"commentNum":[],"_id":"601134604bb7ce253c412e9d","title":"js测试1","author":"admin","category":"js","desc":"aaa","content":"test1","__v":0}],"count":2}
```





## 13、添加评论

### 请求URL：

```
http://localhost:5000/admin/commentadd
```

### 请求方式：

```
post
```

### 参数类型  

```
|参数		|是否必选 |类型     |说明
|_id    |Y       |string   |文章id
|comment    |Y       |string   |评论内容
|author    |Y       |string   |评论人
```

### 返回示例：

```
[
    {
        "author": "gkl",
        "time": 1611801497206,
        "content": "有点看不懂啊"
    },
    {
        "author": "gkl",
        "time": 1611801462086,
        "content": "写的真好"
    }
]
```





## 14、获取评论

### 请求URL：

```
http://localhost:5000/admin/comment?_id=601196a8676f4a370ce22fa1
```

### 请求方式：

```
get
```

### 参数类型  

```
|参数		|是否必选 |类型     |说明
|_id    |Y       |string   |文章id
```

### 返回示例：

```
{
    "code": 0,
    "msg": [
        {
            "author": "gkl",
            "time": 1611801497206,
            "content": "有点看不懂啊"
        },
        {
            "author": "gkl",
            "time": 1611801462086,
            "content": "写的真好"
        }
    ]
}
```





## 15、添加阅读量

### 请求URL：

```
http://localhost:5000/admin/readNum?_id=601196a8676f4a370ce22fa1
```

### 请求方式：

```
get
```

### 参数类型   query

```
|参数		|是否必选 |类型     |说明
|_id    |Y       |string   |文章id
```

### 返回示例：

```
{"code":0,"msg":5}
```





## 16. 首页轮播数据

http://localhost:5000/main/swiper

