const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { User } = require('../models');

const router = express.Router();

router.post('/join', async(req, res) => {
    const {email, password, name} = req.body;
    try{
        const exUser = await User.findOne({where: {email}});
    }catch(err){
        console.error(err);
        next(err);
    }
    const hash = await bcrypt.hash(password,12);
    await User.create({
        email,
        password: hash,
        name,
    });
    return res.status(201).json({
        message:'가입이 완료되었습니다. 로그인하세요.'
    })
    
})

module.exports = router;
