const express = require('express');
const router = express.Router();
const User = require('../schema/users');

// 注册逻辑
router.post('/register', (req, res)=>{
    const {username, password, rePassword} = req.body;
    // console.log(username, password, rePassword);
    if(!username) return res.send({code: 1, msg: '用户名不能为空'});
    if(!password) return res.send({code: 1, msg: '密码不能为空'});
    if(password !== rePassword) return res.send({code: 1, msg: '两次输入的密码不一致'});

    // 判断该用户是否注册, 没有注册就将该用户保存到数据库
    User.findOne({username}).then((data)=>{
        if(data) return res.send({code: 1, msg: '该用户已存在'});
        // 保存到数据库
        new User({username, password}).save(()=>{
            res.send({code: 0, msg: '注册成功'});
        });
    });

});

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

module.exports = router;
