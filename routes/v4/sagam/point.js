const express = require('express');
const { Point, User, Sagam } = require('../../../models');
const {hasToken} = require('../middlewares');

const router = express.Router()


router.post('/add', hasToken, async (req, res, next) =>{
    try{
        const sagam = await Sagam.findOne({where:{id: req.decode.id}});

        await Point.create({
            user: req.body.user,
            amount: req.body.amount,
            type: req.body.type,
            reason: req.body.reason,
            dormitory: sagam.dormitory,
        })
        return res.status(201).json({
            message: `${req.body.user}에게 ${req.body.type}을 ${req.body.amount}점 부여.`
        });
    }catch(error){
        console.error(error);
        return next(error);
    }
})


router.get('/', hasToken,async(req, res, next) =>{
    try{
        const sagam = await Sagam.findOne({where:{
            id:req.decode.id
        }})
        
        const points = await Point.findAll({
            where:{
                dormitory: sagam.dormitory
            } 
        });
        return res.status(200).json(points);
    }catch(error){
        console.error(error);
        return next(error);
    }
})

router.put('/updateAmount', hasToken, async(req, res, next) =>{
    try{
        const point = await Point.findOne({where: {id: req.body.point}})
        point.amount = req.body.amount
        await point.save();
        return res.status(200).json({
            message: "정상적으로 처리되었습니다."
        })
    }catch(error){
        console.error(error);
        return next(error);
    }
})

router.delete('/delete', hasToken,async(req, res, next) =>{
    try{
        
        
        const point = await Point.findOne({
            where:{
                id: req.query.point
            } 
        });
        point.destroy()
        await point.save()
        return res.status(200).json({
            message: `상/벌점 제거 완료`
        });
    }catch(error){
        console.error(error);
        return next(error);
    }
})

module.exports = router;