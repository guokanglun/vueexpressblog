const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// 引入中间件  解析cookie
app.use(cookieParser());
app.use(express.static('data'));

// post 请求配置
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use((req, res, next)=>{
    // console.log(req.cookies);
   if(req.cookies.userInfo){
       req.userInfo = JSON.parse(req.cookies.userInfo)
   }
   next();
});

// 不同的模块划分不同的路由
app.use('/admin', require('./routers/admin'));
app.use('/user', require('./routers/api'));
app.use('/main', require('./routers/main'));

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
