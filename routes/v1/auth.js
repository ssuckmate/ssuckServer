const express = require('express');
var app = express();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../../models');

const secret = process.env.JWT || '13@@4d%sf!a'

const router = express.Router()

router.post('/login', async (req,res,next) =>{
    console.log("askldfjn");
    passport.authenticate('local', {session:false},(authError, user, info) =>{
        if(authError){
            console.error(authError);
            return res.status(500).json('알 수 없는 에러입니다.');
        }
        if(!user){
            return res.status(202).json(info.message);
        }
        // const token = jwt.sign({req.user.email}, secret);
        return res.status(200).json(token);
    })    
}
);

    // passport.authenticate('local', {session: false}, ()),
    // (req, res) => {
    //     const token = jwt.sign({
    //         email: req.user.email,
    //     }, secret);
    //     console.log(token);
    //     res.status(200).send(token);
    // }

router.post('/join', async (req, res, next) => {
    const {email, password, name} = req.body;
    console.log('tl;qkf');
    try{
        const exUser = await User.findOne({where:{email}});
        if(exUser){
            return res.status(409).json({
                message:'이미 가입된 이메일입니다.'
            })
        }
        User.create({
            email: email,
            password: password,
            name: name,
        });
        return res.status(201).json({
            message: '가입이 완료되었습니다. 로그인하세요.'
        })
    }catch(error){
        console.error(error);
        return next(error);
    }
    
})

module.exports = router;