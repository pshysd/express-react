const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../schemas/user');

const router = express.Router();

router.post('/register', async (req, res, next) => {
	try {
		const { name, password, email, lastname } = req.body;
		const hash = bcrypt.hash(password, 12);
		const user = await User.create({
			name,
			hash,
			email,
			lastname,
		});

		console.log(user);
		res.status(201).json(user);
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.post('/login', async (req, res, next) => {
	try {
		// 입력받은 이메일, 패스워드
		const { email, password } = req.body;

		// 이메일 존재하는지 체크
		const user = User.findOne({ email }, (err, userInfo) => {
			if (!userInfo) res.json({ loginSuccess: false, message: '존재하지않는 이메일입니다.' });
		});
		if (user) {
			const hash = bcrypt.hash(password, 12);
			if (hash === user.password) res.json({ loginSuccess: true, message: '로그인 되었습니다.' });
			next();
		}
	} catch (error) {
		console.error(error);
		next(error);
	}
});
module.exports = router;
