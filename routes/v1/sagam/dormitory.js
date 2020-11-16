const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Sagam, Dormitory } = require('../../../models');
const {hasToken} = require('../middlewares')

const secret = process.env.JWT || '13@@4d%sf!a'

const router = express.Router()

router.post('/add', hasToken, async (req,res,next) =>{
    const {name, identifier} = req.body;
    try{
        const exName = await Dormitory.findOne({where:{name}});
        if(exName){
            return res.status(409).json({
                message:'이미 가입된 이름입니다.'
            })
        }
        Dormitory.create({
            name: name,
            identifier: identifier
        });

        var sagam = Sagam.findOne({where:{email: req.decode.email}});
        var dormitory = Dormitory.findOne({where:{name: name}});
        sagam.dormitory = dormitory.id;

        return res.status(201).json({
            message: `기숙사 이름: ${name}, 기숙사 비밀번호: ${identifier} 로 생성되었습니다.`
        })
    }catch(error){
        console.error(error);
        return next(error);
    }

});

module.exports = router;
