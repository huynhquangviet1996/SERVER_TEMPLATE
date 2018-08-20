var ctrl = require('../controllers/authenticationController')
var passport = require('passport');
require('../config/passport')(passport);
module.exports = (app)=>{
    app.route('/user')
        .get(passport.authenticate('jwt',{session : false},ctrl.get_user_present));
    app.route('/login')
        .post(ctrl.login);
    app.route('/register')
        .post(ctrl.register_a_user);
    app.route('/users')
        .get(passport.authenticate('jwt',{session : false}),ctrl.get_all_user)
};