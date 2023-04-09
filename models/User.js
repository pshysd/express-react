// 스키마: 데이터베이스에 들어가는 정보들의 타입들을 정의해놓은 것... 이라고 이해해야할까
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

userSchema.pre('save', function (next) {

    const user = this;

    if (user.isModified) {
        // 비밀번호를 암호화
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (plainPassword, callback) {

    // plainPassword: 1234567 암호화된 비밀번호: 12415153ㄴㅇㄻㄴㅇㄹ3$#$@#^%
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return callback(err),
            cb(null, isMatch);
    });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };