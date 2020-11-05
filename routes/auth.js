const express = require('express');
var app = express();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const secret = process.env.JWT || '13@@4d%sf!a'

module.exports = () => {

app.post('/login', passport.authenticate('local', {
    session: false
    }), (req, res) => {
        const token = jwt.sign({
            email: req.user.email,
            password: req.user.password
        }, secret);
        console.log(token)
        res.send(token);
    }
);

app.post('/join', async (req, res) => {
    const {email, password, name} = req.body;
    User.create({
        email: email,
        password: password,
        name: name,
    });
    return res.status(201).json({
        message: '가입이 완료되었습니다. 로그인하세요.'
    })
})

return app;

}
