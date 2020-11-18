const express = require('express');
const { Parcel, User } = require('../../../models');
const {hasToken} = require('../middlewares');


const router = express.Router()

router.post('/myParcels', hasToken, async (req, res, next) =>{
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

router.post('/take', hasToken, async(req, res, next) =>{
    try{
        const user = await User.findOne({where:{id: req.decode.id}})
        console.log(req.body.id)
        let status;
        if (req.body.status === "get") status = "찾아감"
        else if (req.body.status === "cancel") status = "보관중"
        else if (req.body.status === "remove") {
            Parcel.destory({
                where: { id: req.body.id }
            })
        }

        Parcel.update({
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

module.exports = router;