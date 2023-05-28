const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();

const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const apiRouter = require('./routes/api');

const connect = require('./schemas');

const app = express();

app.set('port', process.env.PORT || 5000);

connect();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
	session({
		resave: false,
		saveUninitialized: false,
		secret: process.env.COOKIE_SECRET,
		cookie: {
			httpOnly: true,
			secure: false,
		},
	})
);

app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/api', apiRouter);

app.use((err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
	res.status(err.status || 500).render('error');
});

app.listen(app.get('port'), () => {
	console.log(`${app.get('port')}번 포트에서 서버 대기 중`);
});
