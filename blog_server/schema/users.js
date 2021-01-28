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
