const express = require('express');
const {sequelize} = require('./models');
const morgan = require('morgan');
const v1 = require('./routes/v1');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.set('port', process.env.PORT || 3000);

sequelize.sync({force:true})
    .then(() =>{
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    })

app.use(morgan('dev'))//로그
app.use(express.json());//json요청 처리.
app.use(express.urlencoded({extended:false}));


app.use('/v1',v1);

app.use((req,res,next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
    error.status = 404;
    next(error);
})

app.use((err,req,res,next)=> {
    res.status(err.status||500).send(err);
});

app.listen(app.get('port'), () =>{
    console.log(app.get('port'),"번 포트에서 대기중");
})