const express = require('express');
const router = express.Router();
const User = require('../schema/users');
const Category = require('../schema/category');
const Content = require('../schema/contents');

// 获取用户以及分页逻辑
router.get('/user', (req, res)=>{
    // 页数
    let page = req.query.page*1 || 1;
    // 每页数量
    let limit = req.query.limit*1 || 2;
    // 跳过多少条数据
    let skip = (page - 1) * 2;
    var total;
    User.find().count().then((count)=>{
        total = count
    });
    User.find().limit(limit).skip(skip).then((data)=>{
        res.send({code: 0, msg:data, total})
    })
});

// 添加分类
router.post('/categoryAdd', (req, res)=>{
   const {category} = req.body;
   if(!category) return res.send({code: 1, msg: '分类不能为空'});
   // 查询数据库，是否有该分类
    Category.findOne({name: category}).then((data)=>{
        if(data) return res.send({code:1, msg:'该分类已经存在'});
        new Category({name:category}).save().then((data)=>{
            res.send({code:0, msg:'分类保存成功'})
        })
    })
});

// 获取分类
router.get('/category', (req, res)=>{
    // {_id:-1} 按照_id逆序
    Category.find().sort({_id:-1}).then((data)=>{
        res.send({code:0, msg: data})
    })
});

// 删除分类
router.post('/delCategory', (req, res)=>{
    const {category} = req.body;
    Category.deleteOne({name:category}).then((data)=>{
        if(data.deletedCount){
            res.send({code: 0, msg:'删除成功'})
        }
    })
});

// 修改分类
router.post('/updateCategory', (req, res)=>{
    const {_id, category} = req.body;
    Category.updateOne({_id}, {$set:{name:category}}).then((data)=>{
        if(data.nModified === 1){
            res.send({code:0, msg: '修改成功'})
        }
    })
});

// 添加内容
router.post('/contentAdd', (req, res)=>{
    const {title, author, category, desc, content} = req.body;
    if(!title) return res.send({code:1, msg: '标题不能为空'});
    if(!author) return res.send({code:1, msg: '作者不能为空'});
    if(!category) return res.send({code:1, msg: '分类不能为空'});
    if(!desc) return res.send({code:1, msg: '描述不能为空'});
    if(!content) return res.send({code:1, msg: '内容不能为空'});

    // 查询数据库
    Content.findOne({content}).then((data)=>{
        if(data) return res.send({code:1, msg:'该文章已经存在'});
        // 保存文章
        new Content({title, author, category, desc, content}).save().then(data=>{
            res.send({code:0, msg:'文章保存成功'})
        })
    });

});

// 获取内容 分页
router.get('/contentGet', (req, res)=>{
    // 页数
    let page = req.query.page*1 || 1;
    // 每页数量
    let limit = req.query.limit*1 || 2;
    // 跳过多少条数据
    let skip = (page - 1) * 2;
    var total;
    Content.find().count().then((count)=>{
        total = count
    });

    Content.find().limit(limit).skip(skip).then(data=>{
        res.send({code: 0, msg: data, total})
    })
});

// 获取所有内容
router.get('/contentGet/all', (req, res)=>{
    Content.find().then(data=>{
        res.send({code: 0, msg: data})
    })
});

// 通过分类获取内容
router.get('/contentGet/cate', (req, res)=>{
    const {category} = req.query;

    var count;
    Content.find({category}).count().then(data=>{
       count = data
    });

    Content.find({category}).then(data=>{
        res.send({code:0, msg:data, count})
    })
});

// 删除内容
router.post('/contentDelete', (req, res)=>{
    const {_id} = req.body;
    Content.deleteOne({_id}).then(data=>{
        if(data.deletedCount){
            res.send({code: 0, msg:'删除成功'})
        }
    })
});

// 更新内容
router.post('/contentUpdate', (req, res)=>{
    const {_id, title, category, desc, content} = req.body;

    Content.findOne({content}).then(data=>{
        if(data) return res.send({code: 1, msg: '该文章已经存在'})
        Content.updateOne({_id}, {$set:{title, category, desc, content}}).then((data)=>{
            if(data.nModified === 1){
                res.send({code:0, msg: '修改成功'})
            }
        })
    });



});

// 文章评论添加
router.post('/commentadd', (req, res)=>{
    // 文章id 评论内容 评论人
    const {_id, comment, author} = req.body;
    Content.findOne({_id}).then(data=>{
        let commentNum = data.commentNum;
        let currentComment = {
          author,
          time: Date.now(),
          content: comment
        };
        commentNum.unshift(currentComment);

        // 更新content
        Content.updateOne({_id}, {$set:{commentNum}}).then(data=>{

        });
        res.send(commentNum)
    });

});

// 获取评论信息
router.get('/comment', (req, res)=>{
    const {_id} = req.query;
    Content.findOne({_id}).then(data=>{
        res.send({code: 0, msg: data.commentNum})
    })
});

// 增加阅读量
router.get('/readNum', (req, res)=>{
    const {_id} = req.query; // 文章id
    Content.findOne({_id}).then(data=>{
        let readNum = data.readNum + 1;

        // 更新readNum
        Content.updateOne({_id}, {$set: {readNum}}).then(data=>{

        });

        res.send({code:0, msg:readNum})
    })
});

module.exports = router;
