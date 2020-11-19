const express = require('express');
const router = express.Router();
const auth = require('./auth');
const parcel = require('./parcel');

router.use('/auth', auth)
router.use('/parcel', parcel)

module.exports = router;