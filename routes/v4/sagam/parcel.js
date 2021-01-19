const express = require('express');
const { Parcel, User, Sagam } = require('../../../models');
const {hasToken} = require('../middlewares');

const router = express.Router()

router.post('/add', hasToken, async (req, res, next) =>{
    try{
        const sagam = await Sagam.findOne({where:{id: req.decode.id}})
        console.log(sagam)
        await Parcel.create({
            sender: req.body.sender,
            status: '보관중',
            recipient: req.body.recipient,
            room: req.body.room,
            dormitory: sagam.dormitory
        })

        return res.status(201).json({
            message: `${req.body.sender}가 ${req.body.recipient}에게 보낸 택배물을 저장했습니다.`
        });
    }catch(error){
        console.error(error);
        return next(error);
    }
})

module.exports = router;