const express = require('express');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
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
        const dormitory = await Dormitory.create({
            name: name,
            identifier: identifier
        });

        Sagam.update({
            dormitory: dormitory.id
        },{
            where: { id: req.decode.id }
        })

        return res.status(201).json({
            message: `기숙사 이름: ${name}, 기숙사 비밀번호: ${identifier} 로 생성되었습니다.`
        })
    }catch(error){
        console.error(error);
        return next(error);
    }
})

router.post('/join', hasToken, async (req,res,next) =>{
    const {name, identifier} = req.body;
    try{
        const dormitory = await Dormitory.findOne({
            where: {
                [Op.and]: [
                    { name: name },
                    { identifier: identifier }
                ]
            }
        });

        if (!dormitory) return res.status(400).json({
            message: `등록되지 않은 기숙사거나 비밀번호가 잘못되었습니다.`
        })

        Sagam.update({
            dormitory: dormitory.id
        },{
            where: { id: req.decode.id }
        })

        return res.status(201).json({
            message: `${name}의 사감으로 등록되었습니다.`
        })
    }catch(error){
        console.error(error);
        return next(error);
    }
})

module.exports = router;
