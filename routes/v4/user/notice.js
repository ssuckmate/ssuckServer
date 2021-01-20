const express = require('express');
const { User, Notice} = require('../../../models');
const {hasToken} = require('../middlewares');

const router = express.Router()

router.get('/', hasToken, async (req, res, next) =>{
    try{
        const user = await User.findOne({
            where:{
                id:req.decode.id
            }
        })
        const notices = await Notice.findAll({
            where: {
                dormitory: user.dormitory,
            }
        })
        return res.status(200).json(notices);
    }catch(error){
        console.error(error);
        return next(error);
    }
})


module.exports = router;