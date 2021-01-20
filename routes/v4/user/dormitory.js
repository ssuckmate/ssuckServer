const express = require('express');

const { User, Dormitory } = require('../../../models');
const {hasToken} = require('../middlewares')


const router = express.Router()

router.get('/', hasToken, async (req, res, next) =>{
    try{
        const user = await User.findOne({
            where:{
                id:req.decode.id
            }
        })
        const dormitory = await Dormitory.findOne({
            where: {
                id: user.dormitory,
            }
        })
        return res.status(200).json(dormitory);
    }catch(error){
        console.error(error);
        return next(error);
    }
})



module.exports = router;
