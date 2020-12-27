const express = require('express');
const { Washer, Dormitory, User} = require('../../../models');
const {hasToken} = require('../middlewares');

const router = express.Router()

router.get('/floor', hasToken, async (req, res, next) =>{
    try{
        const user = await User.findOne({
            where:{
                id:req.decode.id
            }
        })
        const washers = await Washer.findAll({
            where: {
                dormitory: user.dormitory,
                floor: req.body.floor
            }
        })
        return res.status(200).json(washers);
    }catch(error){
        console.error(error);
        return next(error);
    }
})


router.put('/changeStatus', hasToken, async (req, res, next) =>{
    try{

        await Washer.update({
            status : req.body.status,
            occupant: req.decode.id
        },{
            where:{
                id : req.body.washerId
            }
        })
        return res.status(200).json({
            message: `정상적으로 처리되었습니다..`
        });
    }catch(error){
        console.error(error);
        return next(error);
    }
})


module.exports = router;