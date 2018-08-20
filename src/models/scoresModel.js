var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Employees = require('./employeesModel')
var ScoresSchema = new Schema({
    empid: {
        type: Schema.Types.ObjectId,
        required: 'Kindly enter the empid of scores',
        ref : 'employees'
    },
    on_time: {
        type: String,
        default : '5'
    },
    amount: {
        type: String,
        default: '5'
    }
});
module.exports = mongoose.model('scores',ScoresSchema)