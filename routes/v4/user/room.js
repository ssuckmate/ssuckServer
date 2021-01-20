const express = require('express');
const { User, Room} = require('../../../models');
const {hasToken} = require('../middlewares');

const router = express.Router()

router.get('/floor', hasToken, async (req, res, next) =>{
    try{
        const user = await User.findOne({
            where:{
                id:req.decode.id
            }
        })
        const room = await Room.findOne({
            where: {
                id: user.room
            }
        })
        floor = await room.floor
        return res.status(200).json(room.floor);
    }catch(error){
        console.error(error);
        return next(error);
    }
})


module.exports = router;