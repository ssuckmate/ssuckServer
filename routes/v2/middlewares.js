const passport = require('passport')
const jwt = require('jsonwebtoken')

exports.hasToken = (req,res,next) => {
    try{
        req.decode = jwt.verify(req.body.token, process.env.JWT || '13@@4d%sf!a');
        return next();
    }catch(error){
        if(error.name == "TokenExpiredError"){
            return res.status(419).json({
                code: 419,
                message: "토큰이 만료되었습니다."
            })
        }

        return res.status(401).json({
            code:401,
            message:"유효하지 않은 토큰입니다."
        })
    }
}