const express = require('express');
const {User, Sagam, Dormitory} = require('../../../models');
const {hasToken} = require('../middlewares');

const router = express.Router()


router.get('/', hasToken,async(req, res, next) =>{
    try{

        const sagam = await Sagam.findOne({where:{
            id:req.decode.id
        }})
        const dormitory = await Dormitory.findOne({where:{
            id:sagam.dormitory
        }})
        const users = await User.findAll({
            where:{
                dormitory: dormitory.id
            } 
        });
        return res.status(200).json(users);
    }catch(error){
        console.error(error);
        return next(error);
    }
})

router.get('/notAuthed', hasToken,async(req, res, next) =>{
    try{
        const sagam = await Sagam.findOne({where:{
            id:req.decode.id
        }})
        const dormitory = await Dormitory.findOne({where:{
            id:sagam.dormitory
        }})
        const users = await User.findAll({
            where:{
                dormitory: dormitory.id,
                isAuthed: false
            } 
        });
        return res.status(200).json(users);
    }catch(error){
        console.error(error);
        return next(error);
    }
})

router.put('/authenticate', hasToken, async(req,res,next) =>{
    try{
        const user = await User.findOne({
            where:{
                id: req.body.userId
            } 
        });
        user.isAuthed = true;
        user.save();
        return res.status(200).json({
            message:"가입 승인을 완료했습니다."
        });
    }catch(error){
        console.error(error);    
    }
})
module.exports = router;