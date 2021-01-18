const express = require('express');
const {User,Sagam, Dormitory, Room} = require('../../../models');
const {hasToken} = require('../middlewares');

const router = express.Router()


router.get('/', hasToken,async(req, res, next) =>{
    try{
        const sagam = await Sagam.findOne({where:{
            id:req.query.id
        }})
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
            dormitory: dormitory.id
        })
        return res.status(201).json(room);
    }catch(error){
        console.error(error);
        return next(error);
    }
})

router.put('/updateUser', hasToken,async(req, res, next) =>{
    try{

        const room = await Room.findOne({where:{
            id: req.body.roomId,
        }})
        const user =await User.findOne({where:{
            id: req.body.userId,
        }})
        
        user.room = room.id;
        user.save()
        return res.status(200).json({
            message: "방 설정 성공!"
        });
    }catch(error){
        console.error(error);
        return next(error);
    }
})

router.get('/users', hasToken,async(req, res, next) =>{
    try{
        const users = await User.findAll({
            where:{
                room: req.query.roomId
            } 
        });
        return res.status(200).json(users);
    }catch(error){
        console.error(error);
        return next(error);
    }
})

router.get('/getRoomsByFloor', hasToken,async(req, res, next) =>{
    try{

        const sagam = await Sagam.findOne({where:{
            id:req.decode.id
        }})
        const rooms = await Room.findAll({
            where:{
                dormitory: sagam.dormitory,
                floor: req.query.floor
            } 
        });
        return res.status(200).json(rooms);
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