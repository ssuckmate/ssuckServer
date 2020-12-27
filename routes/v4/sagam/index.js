const express = require('express');
const router = express.Router();

const auth = require('./auth');
const dormitory = require('./dormitory');
const parcel = require('./parcel');
const user = require('./user');
const washer = require('./washer')
const room = require('./room')

router.use('/auth', auth)
router.use('/dormitory', dormitory)
router.use('/parcel', parcel)
router.use('/user', user);
router.use('/washer', washer);
router.use('/room',room)

module.exports = router;