const express = require('express');
const router = express.Router();
const auth = require('./auth');
const dormitory = require('./dormitory');

router.use('/auth', auth)
router.use('/dormitory', dormitory)

module.exports = router;