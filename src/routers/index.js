module.exports = (app)=>{
    let employeesRouter = require('./employeesRouter');
    let authRoute = require('./authRouter');
    employeesRouter(app);
    authRoute(app);
}