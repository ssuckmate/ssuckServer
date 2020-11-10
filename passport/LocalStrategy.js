const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
const { User } = require('../models');

module.exports = () => {

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },async (email, password, done) => {
        log("tlqkf")
        try{
            const user = await User.findOne({
                where: {
                    email: email,
                    password: password
                }
            });
            console.log(user);
            if (!user) done(null, false, {message:'이메일이나 비밀번호가 일치하지 않습니다.'});
            else {
                done(null, user);  
            }  
        }catch(error){
            done(error);
        }
        
    }));

    return passport;
}