var mongooes = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongooes.Schema;
var UserSchema = new Schema({
    username :{
        type : String,
        required : 'Kindly enter the username of user',
        index : {unique : true}
    },
    password : {
        type: String
    },
    role : String
})
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
module.exports = mongooes.model('users',UserSchema);