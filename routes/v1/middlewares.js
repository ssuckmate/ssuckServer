const passport = require('passport')

exports.hasToken = passport.authenticate('jwt', {session: false});