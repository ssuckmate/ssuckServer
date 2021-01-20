const express = require('express');
const { Sagam, Notice, Dormitory } = require('../../../models');
const {hasToken} = require('../middlewares');

const router = express.Router()

router.post('/add', hasToken, async (req, res, next) =>{
    try{
        const sagam = await Sagam.findOne({where:{id: req.decode.id}})
        await Notice.create({
            sagam: sagam.id,
            contents: req.body.contents,
            dormitory: sagam.dormitory,
        })
        return res.status(201).json({
            message: `공지 추가 완료.`
        });
    }catch(error){
        console.error(error);
        return next(error);
    }
})

router.delete('/delete', hasToken, async (req, res, next) =>{
    try{
        await Notice.destroy({where:{id: req.body.notice}});
        return res.status(200).json({
            message: `공지가 삭제되었습니다.`
        });
    }catch(error){
        console.error(error);
        return next(error);
    }
})

module.exports = router;