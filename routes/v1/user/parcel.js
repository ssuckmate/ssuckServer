const express = require('express');
const { Parcel, User } = require('../../../models');
const {hasToken} = require('../middlewares');


const router = express.Router()

router.get('/myParcels', hasToken, async (req, res, next) =>{
    try{
        const parcels = await Parcel.findAll({
            where: {
                recipient: req.decode.id,
            }
        })
        console.log(parcels);
        return res.status(200).json({
            code:200,
            message:"성공",
            parcels: parcels,
        })
    }catch(error){
        console.error(error);
    }
})

router.post('/addParcel', hasToken, async (req, res, next) =>{
    try{
        const parcel = await Parcel.create({
            sender: req.body.sender,
            recipient: req.body.recipient,
        })

        return res.status(200).json("택배 추가");
    }catch(error){
        console.error(error);
    }
})

module.exports = router;