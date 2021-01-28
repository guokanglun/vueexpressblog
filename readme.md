## 0. 项目描述

本项目是一个前后端分离的个人博客， 前端使用vue全家桶，后端使用express

前台项目使用技术：

1. 数据处理：vue vue-router vuex element-ui swiper moment 。。。

2. 数据交互：postman  axios  
3. 模块化：es6  babel   

4. 项目构建：vue-cli  webpack

5. css预处理器： less

后台项目：

express  mongoose    api接口文档



## 1. 服务端

##### 1. 刷新重启项目配置

模块安装

`npm install nodemon --save`

配置package.json

```json
"scripts": {
    "start": "nodemon ./bin/www"
}
```

##### 2. mongoose 使用

app.js

```js
const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost:27017/blog',
    {useNewUrlParser:true,useUnifiedTopology:true}, err=>{
        if(err){
            console.log('数据库连接失败');
            return
        }
        console.log('数据库连接成功');
        app.listen(5000);
    });
```



schema/user.js

```js
const mongoose = require('mongoose');

// 定义用户的数据格式
const userSchema = new mongoose.Schema({
    username:String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
});

// 暴露用户的模型
module.exports = mongoose.model('users', userSchema);
```



api.js 调用

```js
const User = require('../schema/users');

// 登录逻辑
router.post('/login', (req, res)=>{
   const {username, password} = req.body;
    if(!username) return res.send({code: 1, msg: '用户名不能为空'});
    if(!password) return res.send({code: 1, msg: '密码不能为空'});

    // 查询数据库，是否有该用户
    User.findOne({username, password}).then((data)=>{
        if(data){
            // 设置cookie
            res.cookie('userInfo', JSON.stringify(data), {maxAge: 24 * 60 * 60 * 1000});
            res.send({code: 0, msg:data})
        }else{
            res.send({code: 1, msg:'用户名或密码错误'})
        }
    })

});
```





## 2. 客户端



## 3. 遇到的问题

##### 1. 路由守卫死循环

```js
router.beforeEach((to, from, next)=>{
  const {isAdmin} = JSON.parse(localStorage.getItem('userInfo')).msg;
  if(isAdmin){
    next()
  }else {
	next('/')
});
```

只有管理员才能进入后台管理系统，死循环原因：当不是管理员的时候，执行else语句，此时路由发生改变，又得重新判断是否是管理员，再一次进入else，导致死循环



解决办法： 当不是管理员的时候，进行一次判断，直接放行

```js
router.beforeEach((to, from, next)=>{
  const {isAdmin} = JSON.parse(localStorage.getItem('userInfo')).msg;
  if(isAdmin){
    next()
  }else {
    if (to.path == '/') {
      next();
    } else {
      next({path: '/'})
    }
  }

});
```



##### 2. moment过滤器

```js
import Vue from 'vue'
import moment from 'moment'
// import format from 'date-fns/format'
// 自定义过滤器  value 必须为数字类型
Vue.filter('date-format', function (value, formatStr='YYYY-MM-DD HH:mm:ss') {
  return moment(value*1).format(formatStr)
  // return format(value, formatStr)
})

```

