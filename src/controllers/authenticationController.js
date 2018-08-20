var users = require('../models/usersModel');
var jwt = require('jsonwebtoken');
var config = require('../config/database')
var passport = require('passport')
require('../config/passport')(passport);

exports.get_user_present = (req,res)=>{
    console.log(req.headers)
    var token = this.getToken(req.headers);
    var user = jwt.verify(token,config.secret);

    console.log(user);
    if(token){
        users.find(user,(err,users)=>{
            if (err){
                res.send(err);
            } else{
                res.json(user)
            }
        })
    }else{
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
};
exports.get_all_user = (req,res)=>{
    console.log(req.headers)
    var token = this.getToken(req.headers);
    var user = jwt.verify(token,config.secret);

    console.log(user);
    if(token){
        users.find({},(err,users)=>{
            if (err){
                res.send(err);
            } else{
                res.json(users)
            }
        })
    }else{
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }

}
exports.register_a_user = (req,res)=>{
    console.log(req.body)
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please pass username and password.'});
    } else {
        var newUser = new users({
            username: req.body.username,
            password: req.body.password
        });
        // save the user
        newUser.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
}
exports.login = (req,res)=>{
        users.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.sign(user.toJSON(), config.secret);
                    // return the information including token as JSON
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
}
exports.logout = (req,res)=>{
    req.logout();
    res.status(200).send('Successfully logged out');
}
exports.getToken =  (headers)=> {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};