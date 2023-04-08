const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://tong76030075:OLIyUxFexeOB5oiY@psh.5a2csdf.mongodb.net/?retryWrites=true&w=majority', {
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

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(port, () => {
    console.log(`running in port ${port}`);
});

console.log('hi');