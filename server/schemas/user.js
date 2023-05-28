const mongoose = require('mongoose');
const { Schema } = mongoose;

// user 스키마 정의
const userSchema = Schema({
	name: { type: String, maxlength: 50 },
	email: { type: String, trim: true, unique: 1 },
	password: { type: String, minlength: 5 },
	lastname: { type: String, maxlength: 50 },
	role: { type: Number, default: 0 },
	image: String,
	token: { type: String },
	tokenExp: { type: Number },
});

module.exports = mongoose.model('User', userSchema);
