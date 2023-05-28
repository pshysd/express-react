const mongoose = require('mongoose');

const connect = () => {
	// 배포 모드가 아닐 경우에 디버그 로그 표시할 수 있도록 설정
	if (process.env.NODE_ENV !== 'production') {
		mongoose.set('debug', true);
	}

	mongoose
		.connect('mongodb://root:root@localhost:27017/admin', {
			dbName: 'ahnjohn',
			useNewUrlParser: true,
		})
		.then(() => {
			console.log('mongoDB connected');
		})
		.catch((error) => {
			console.log('mongoDB connection Error: ', error);
		});
};

mongoose.connection.on('error', (error) => {
	console.error('mongoDB connection Error: ', error);
});

mongoose.connection.on('disconnected', () => {
	console.error('mongoDB 연결 끊김, 연결 재시도중');
	connect();
});

module.exports = connect;
