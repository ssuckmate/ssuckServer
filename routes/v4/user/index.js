const express = require('express');
const { User } = require('../../../models');
const { hasToken } = require('../middlewares');
const router = express.Router();

const auth = require('./auth');
const parcel = require('./parcel');
const washer = require('./washer');
router.use('/auth', auth);
router.use('/parcel', parcel);
router.use('/washer', washer);

router.get('/',hasToken ,async (req, res, next) => {
   
    try{
        const user = await User.findOne({where:{
            id: req.decode.id
        }})
       
        return res.status(201).json(user)
    }catch(error){
        console.error(error);
        return next(error);
    }
} )

module.exports = router;