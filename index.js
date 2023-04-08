const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const { User } = require('./models/User');
const config = require('./config/key');


mongoose.connect(config.mongoURI, {
    /* 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
        몽구스 6.0 이상 부터는 default로 적용되어 작성 시 오류 발생시킨다.    
    */
}).then(() => console.log('mongoDB successfully connected'))
    .catch((err) => {
        console.log('err', err);
    });

// application/json
app.use(express.json());

// header에 application/x-www.form.urlencoded
app.use(express.urlencoded({
    extended: true,
}));



app.get('/', (req, res) => {
    res.send('노드몬 사용중');
});

app.post('/register', async (req, res) => {
    try {
        // 회원가입할 때 필요한 데이터를 Client로부터 가져오면 그 데이터를 DB에 저장
        const user = new User(req.body);

        const result = await user.save();

        if (!result) {
            const err = new Error('failed');
            res.status(400).json({ success: false, err });
        }
        res.status(200).json({ success: true });
        console.log('result', result);
    } catch (err) {
        res.status(500).send(err);
        console.log('err', err);
    }

    /*  mongoose에서 callback은 deprecated
        user.save((err, userInfo) => { // User는 mongoose.model()로 만들어지는 객체기 때문에 mongoose에 내장되어있는 메서드를 사용 가능함
            if (err) res.json({ success: false, err });
            return res.status(200).json({
                success: true
            });
        });
    */
});

app.listen(port, () => {
    console.log(`running in port ${port}`);
});