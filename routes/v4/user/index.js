const express = require('express');
const router = express.Router();

const auth = require('./auth');
const parcel = require('./parcel');
const washer = require('./washer');
router.use('/auth', auth);
router.use('/parcel', parcel);
router.use('/washer', washer);

module.exports = router;