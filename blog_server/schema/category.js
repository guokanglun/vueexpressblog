const mongoose = require('mongoose');

// 定义用户的数据格式
const categorySchema = new mongoose.Schema({
    name: String
});

// 暴露分类的模型
module.exports = mongoose.model('categorys', categorySchema);
