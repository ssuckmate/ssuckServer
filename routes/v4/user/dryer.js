const express = require('express');
const { Dryer, Dormitory, User} = require('../../../models');
const {hasToken} = require('../middlewares');

const router = express.Router()

router.get('/floor', hasToken, async (req, res, next) =>{
    try{
        const user = await User.findOne({
            where:{
                id:req.decode.id
            }
        })
        const dryers = await Dryer.findAll({
            where: {
                dormitory: user.dormitory,
                floor: req.query.floor
            }
        })
        return res.status(200).json(dryers);
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
        const dryers = await Dryer.findAll({
            where: {
                dormitory: user.dormitory,
            }
        })
        return res.status(200).json(dryers);
    }catch(error){
        console.error(error);
        return next(error);
    }
})


router.put('/changeStatus', hasToken, async (req, res, next) =>{
    try{
        const dryer = await dryer.findOne({
            where:{
                id:req.body.dryerId
            }
        });
        dryer.endTime = req.body.endtime
        dryer.occupant = req.decode.id
        dryer.status = req.body.status
        if(dryer.status === '비었음')
            dryer.occupant = null
        await dryer.save()
        return res.status(200).json(dryer);
    }catch(error){
        console.error(error);
        return next(error);
    }
})


module.exports = router;