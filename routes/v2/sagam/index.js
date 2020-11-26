const express = require('express');
const router = express.Router();
const auth = require('./auth');
const dormitory = require('./dormitory');
const parcel = require('./parcel');
const user = require('./user');

router.use('/auth', auth)
router.use('/dormitory', dormitory)
router.use('/parcel', parcel)
router.use('/user', user);

module.exports = router;