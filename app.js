const express = require('express');
const {sequelize} = require('./models');
const morgan = require('morgan');
const passport = require('passport');
const jsyaml = require('js-yaml');
const fs = require('fs');
const swaggerUI = require('swagger-ui-express');
const swaggerV3 = fs.readFileSync('swaggerV3.yaml','utf8')
const swaggerV2 = fs.readFileSync('swaggerV2.yaml','utf8')
const swaggerV3Doc = jsyaml.safeLoad(swaggerV3);
const swaggerV2Doc = jsyaml.safeLoad(swaggerV2);

const app = express();
app.set('port', process.env.PORT || 3000);

sequelize.sync({force:false})
    .then(() =>{
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    })

app.use(morgan('dev')) //로그
app.use(express.json()); //json요청 처리.
app.use(express.urlencoded({extended:false}));


app.use(passport.initialize());
const passportConfig = require('./config/passport');
passportConfig(); // passport 사용

const routes = require('./routes');

app.use('/api-docs/v3',swaggerUI.serve,swaggerUI.setup(swaggerV3Doc));
app.use('/api-docs/v2',swaggerUI.serve,swaggerUI.setup(swaggerV2Doc));


app.use('/', routes);


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