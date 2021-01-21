const express = require('express');
const { Point, User, Sagam } = require('../../../models');
const {hasToken} = require('../middlewares');

const router = express.Router()




router.get('/', hasToken,async(req, res, next) =>{
    try{

        const points = await Point.findAll({
            where:{
                user: req.decode.id
            } 
        });
        return res.status(200).json(points);
    }catch(error){
        console.error(error);
        return next(error);
    }
})


module.exports = router;