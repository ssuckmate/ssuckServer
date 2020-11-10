const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy;
const extractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcrypt')
const { User } = require('../models');

module.exports = () => {

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },async (email, password, done) => {
        try{
            const user = await User.findOne({
                where: {
                    email: email,
                    password: password
                }
            });
            if (!user) done(null, false, {message:'이메일이나 비밀번호가 일치하지 않습니다.'});
            else {
                done(null, user);  
            }  
        }catch(error){
            done(error);
        }
        
    }));

    passport.use(new JWTStrategy({
        jwtFromRequest : extractJWT.fromBodyField('token'),
        secretOrKey : process.env.JWT || '13@@4d%sf!a'
    }, async (jwtPayload, done) => {
        try{
            const user = await User.findOne({
                where: {
                    email: jwtPayload.email
                }
            });
            done(null,user);
        }catch(error){
            return done(error);
        }
    }
    ))

    return passport;
}