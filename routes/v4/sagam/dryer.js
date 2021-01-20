const express = require('express');
const { Sagam, Dryer, Dormitory } = require('../../../models');
const {hasToken} = require('../middlewares');

const router = express.Router()

router.post('/add', hasToken, async (req, res, next) =>{
    try{
        const sagam = await Sagam.findOne({where:{id: req.decode.id}})
        await Dryer.create({
            floor: req.body.floor,
            status: '비었음',
            dormitory: sagam.dormitory,
        })
        return res.status(201).json({
            message: `${req.body.floor}층에 건조기가 추가되었습니다.`
        });
    }catch(error){
        console.error(error);
        return next(error);
    }
})

router.delete('/delete', hasToken, async (req, res, next) =>{
    try{
        await Dryer.destroy({where:{id: req.body.dryer}});
        return res.status(200).json({
            message: `건조기가 삭제되었습니다.`
        });
    }catch(error){
        console.error(error);
        return next(error);
    }
})

module.exports = router;