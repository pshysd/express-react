const User = require('../models/User');

// 인증 처리를 함
let auth = (req, res, next) => {

    // 클라이언트에서 쿠키를 가져옴
    let token = cookies.x_auth;
    // 토큰을 복호화한 후 유저를 찾음
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true });

        req.token = token;
        req.user = user;
        next();
    });
    // 유저가 있으면 true

    // 없으면 false
};

module.exports = {
    auth
};
