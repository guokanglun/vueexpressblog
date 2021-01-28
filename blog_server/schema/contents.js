const mongoose = require('mongoose');

// 定义用户的数据格式
const contentSchema = new mongoose.Schema({
    title: String,  // 标题
    author: String, // 作者
    publish_time: {
        type: String,
        default: Date.now()
    },  // 发布日期
    category: String, // 所属分类
    desc: String, // 简介
    content: String, // 内容
    readNum: {
        type: Number,
        default: 0
    },
    commentNum: {
        type:Array,
        default:[]
    }
});

// 暴露用户的模型
module.exports = mongoose.model('contents', contentSchema);
