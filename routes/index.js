const express = require('express');
const router = express.Router();

const sagam = require('./v1/sagam/index');
const user = require('./v1/user/index')

router.use('/v1/sagam', sagam);
router.use('/v1/user', user);

module.exports = router;
