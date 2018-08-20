var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Scores = require('./scoresModel')
var EmployeesSchema = new Schema({
    first_name: {
        type: String,
        required: 'Kindly enter the first name of the employee'
    },
    last_name: {
        type: String,
        required: 'Kindly enter the last name of the employee'
    },
    age: {
        type: String,
        required: 'Kindly enter the age of the employee'
    },
    date_add : {
        type : Date,
        default: Date.now()
    },
    scores : {
        type : Schema.Types.ObjectId,
        ref: 'scores'
    }
});
module.exports = mongoose.model('employees',EmployeesSchema)