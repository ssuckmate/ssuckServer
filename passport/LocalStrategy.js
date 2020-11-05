var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var bcrypt = require('bcrypt')
const { User } = require('../models');

module.exports = () => {

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },

    async (email, password, done) => {
        var user = await User.findOne({
            where: {
                email: email,
                password: password
            }
        });
        if (!user) done(null, false);
        else done(null, user);
    }));

    return passport;
}