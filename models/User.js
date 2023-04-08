// 스키마: 데이터베이스에 들어가는 정보들의 타입들을 정의해놓은 것... 이라고 이해해야할까

const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        minlength: 5,
    },
    lastname: {
        type: String,
        maxlength: 50,
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,

    token: {
        type: String
    },
    tokenExp: {
        type: Number,

    }
});

const User = mongoose.model('User', userSchema);

module.exports = { User };