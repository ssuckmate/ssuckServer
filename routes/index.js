const express = require('express');
const router = express.Router();

const sagamV2 = require('./v2/sagam/index');
const userV2 = require('./v2/user/index')
router.use('/v2/sagam', sagamV2);
router.use('/v2/user', userV2);

const sagamV3 = require('./v3/sagam/index');
const userV3 = require('./v3/user/index')
router.use('/v3/sagam', sagamV3);
router.use('/v3/user', userV3);

module.exports = router;
