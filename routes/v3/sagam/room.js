const express = require('express');
const {User,Sagam, Dormitory, Room} = require('../../../models');
const {hasToken} = require('../middlewares');

const router = express.Router()


router.get('/', hasToken,async(req, res, next) =>{
    try{

        const dormitory = await Dormitory.findOne({where:{
            id:sagam.dormitory
        }})
        const rooms = await Room.findAll({
            where:{
                dormitory: dormitory.id
            } 
        });
        return res.status(200).json(rooms);
    }catch(error){
        console.error(error);
        return next(error);
    }
})

router.post('/add', hasToken,async(req, res, next) =>{
    try{
        const sagam = await Sagam.findOne({where:{
            id:req.decode.id
        }})
        const dormitory = await Dormitory.findOne({where:{
            id:sagam.dormitory
        }})
        const room = await Room.create({
            roomNum: req.body.roomNum,
            floor: req.body.floor,
        })
        return res.status(201).json(room);
    }catch(error){
        console.error(error);
        return next(error);
    }
})


router.delete('/delete', hasToken, async (req, res, next) =>{
    try{
        await Room.destroy({where:{id: req.body.roomId}});
        return res.status(200).json({
            message: `방이 삭제되었습니다..`
        });
    }catch(error){
        console.error(error);
        return next(error);
    }
})
module.exports = router;