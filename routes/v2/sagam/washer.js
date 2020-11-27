const express = require('express');
const { Sagam, Washer, Dormitory } = require('../../../models');
const {hasToken} = require('../middlewares');

const router = express.Router()

router.post('/add', hasToken, async (req, res, next) =>{
    try{
        const sagam = await Sagam.findOne({where:{id: req.decode.id}})
        const dormitory = await Dormitory.findOne({where:{id: sagam.dormitory}})
        await Washer.create({
            floor: req.body.floor,
            status: '비었음',
            dormitory: dormitory.id,
        })
        return res.status(201).json({
            message: `${req.body.floor}층에 세탁기가 추가되었습니다.`
        });
    }catch(error){
        console.error(error);
        return next(error);
    }
})

router.delete('/delete', hasToken, async (req, res, next) =>{
    try{
        await Washer.destroy({where:{id: req.body.washerId}});
        return res.status(200).json({
            message: `세탁기가 삭제되었습니다.`
        });
    }catch(error){
        console.error(error);
        return next(error);
    }
})

module.exports = router;