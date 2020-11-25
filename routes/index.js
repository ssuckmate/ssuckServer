const express = require('express');
const router = express.Router();

const sagamV1 = require('./v1/sagam/index');
const userV1 = require('./v1/user/index')

router.use('/v1/sagam', sagamV1);
router.use('/v1/user', userV1);

const sagamV2 = require('./v2/sagam/index');
const userV2 = require('./v2/user/index')

router.use('/v2/sagam', sagamV2);
router.use('/v2/user', userV2);

module.exports = router;
