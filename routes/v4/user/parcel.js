const express = require('express');
const { Parcel, User } = require('../../../models');
const {hasToken} = require('../middlewares');


const router = express.Router()

router.get('/myParcels', hasToken, async (req, res, next) =>{
    try{
        const parcels = await Parcel.findAll({
            where: {
                recipient: req.decode.id
            }
        })
        return res.status(200).json({
            parcels: parcels,
        })
    }catch(error){
        console.error(error);
        return next(error);
    }
})

router.put('/changeStatus', hasToken, async(req, res, next) =>{
    try{
        const user = await User.findOne({where:{id: req.decode.id}})
        const status = req.body.status;
        await Parcel.update({
            status: status,
            taker: user.name
        },{
            where: { id: req.body.id }
        })

        return res.status(200).json({
            message: "정상적으로 처리되었습니다."
        })
    }catch(error){
        console.error(error);
        return next(error);
    }
})

router.delete('/delete', hasToken, async(req, res, next) =>{
    try{
        const user = await User.findOne({where:{id: req.decode.id}})
        await Parcel.destroy({
            where: { id: req.body.id }
        })
        return res.status(200).json({
            message: "정상적으로 처리되었습니다."
        })
    }catch(error){
        console.error(error);
        return next(error);
    }
})

module.exports = router;