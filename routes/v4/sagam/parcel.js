const express = require('express');
const { Parcel, User, Sagam } = require('../../../models');
const {hasToken} = require('../middlewares');

const router = express.Router()

router.post('/add', hasToken, async (req, res, next) =>{
    try{
        const sagam = await Sagam.findOne({where:{id: req.decode.id}})
        const recipient = await User.findOne({where:{id: req.body.recipient}})
        
        await Parcel.create({
            sender: req.body.sender,
            status: '보관중',
            recipient: recipient.id,
            room: recipient.room,
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


router.get('/', hasToken,async(req, res, next) =>{
    try{
        const sagam = await Sagam.findOne({where:{
            id:req.decode.id
        }})

        const parcels = await Parcel.findAll({
            where:{
                dormitory: sagam.dormitory
            } 
        });
        return res.status(200).json(parcels);
    }catch(error){
        console.error(error);
        return next(error);
    }
})

module.exports = router;