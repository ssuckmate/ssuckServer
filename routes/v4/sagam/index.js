const express = require('express');
const router = express.Router();

const auth = require('./auth');
const dormitory = require('./dormitory');
const parcel = require('./parcel');
const user = require('./user');
const washer = require('./washer')
const dryer = require('./dryer')
const room = require('./room');
const { hasToken } = require('../middlewares');
const { Sagam } = require('../../../models');


router.use('/auth', auth)
router.use('/dormitory', dormitory)
router.use('/parcel', parcel)
router.use('/user', user);
router.use('/washer', washer);
router.use('/dryer', dryer);
router.use('/room',room)

router.get('/',hasToken ,async (req, res, next) => {
   
    try{
        const sagam = await Sagam.findOne({where:{
            id: req.decode.id
        }})
       
        return res.status(201).json(sagam )
    }catch(error){
        console.error(error);
        return next(error);
    }
} )
module.exports = router;