const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Dormitory} = require('../../../models');
const {hasToken} = require('../middlewares')

const secret = process.env.JWT || '13@@4d%sf!a'

const router = express.Router()

router.post('/login', (req,res,next) =>{
    passport.authenticate('user_local',(authError, user, info) =>{
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){
            return res.status(400).json(info.message);
        }
        return req.login(user,{session:false}, (loginError)=>{
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            const token = jwt.sign(user.toJSON(), secret);
            return res.status(200).json({
                status:"200",
                token:token
            });
        });
    })(req,res,next);
});


router.post('/join', async (req, res, next) => {
    const {email, password, name, phoneNum, dormitoryCode} = req.body;
    try{
        const exUser = await User.findOne({where:{phoneNum}});
        if(exUser){
            return res.status(409).json({
                message:'이미 가입된 전화번호 입니다..'
            })
        }
        const dormitory = await Dormitory.findOne({where:{
            id : dormitoryCode
        }})
        const newUser = await User.create({
            email: email,
            password: password,
            name: name,
            phoneNum:phoneNum,
            dormitory:dormitory.id,
            isAuthed:false
        });
        return res.status(201).json({
            message: '가입 신청이 완료되었습니다. 관리자에게 승인을 받으신 후 로그인하세요.'
        })
    }catch(error){
        console.error(error);
        return next(error);
    }
})

module.exports = router;