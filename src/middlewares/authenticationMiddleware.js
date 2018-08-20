var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

const TOKEN_TIME = 60*60*24*30;
const SECRET = 'hello guy';

var authenticate = expressJwt({secret : SECRET});

var generateAccessToken = (req,res,next)=>{
    console.log(req.body)
    req.token = req.token || {};
    req.token = jwt.sign({
        id : req.user.id
    }, SECRET ,{
        expiresIn: TOKENTIME
    });
    next();

}
var respond = (req, res) => {
    res.status(200).json({
        user: req.user.username,
        token: req.token
    });
}
module.exports = {
    authenticate,
    generateAccessToken,
    respond
};
