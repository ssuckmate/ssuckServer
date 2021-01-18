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
                floor: req.query.floor
            }
        })
        return res.status(200).json(washers);
    }catch(error){
        console.error(error);
        return next(error);
    }
})

router.get('/', hasToken, async (req, res, next) =>{
    try{
        const user = await User.findOne({
            where:{
                id:req.decode.id
            }
        })
        const washers = await Washer.findAll({
            where: {
                dormitory: user.dormitory,
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
        const washer = await Washer.findOne({
            where:{
                id:req.body.washerId
            }
        });
        washer.endTime = req.body.endtime
        washer.occupant = req.decode.id
        washer.status = req.body.status
        if(washer.status === '비었음')
            washer.occupant = null
        await washer.save()
        return res.status(200).json(washer);
    }catch(error){
        console.error(error);
        return next(error);
    }
})


module.exports = router;