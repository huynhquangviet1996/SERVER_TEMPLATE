module.exports = (app)=>{
    var ctrl = require('../controllers/employeesController');
    app.route('/employees')
        .get(ctrl.list_all_employees)
        .post(ctrl.create_a_employee)

    app.route('/employees/:id')
        .put(ctrl.update_a_employee)
        .delete(ctrl.delete_a_employee)
}