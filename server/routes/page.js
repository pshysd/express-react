const express = require('express');

const router = express.Router();


router.get('/', () => {
	res.send('Hello Express!');
});

module.exports = router;