const express = require('express');
const User = require('../schemas/user');

const router = express.Router();

router.post('/register', async (req, res) => {
	try {
		const user = await User.create({
			name: req.body.name,
			password: req.body.password,
			email: req.body.email,
			lastname: req.body.lastname,
		});
		console.log(user);
		res.status(201).json(user);
	} catch (error) {
		console.error(error);
		next(error);
	}
});

module.exports = router;
