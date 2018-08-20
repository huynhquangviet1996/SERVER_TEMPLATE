var employees = require('../models/employeesModel');
var scores = require('../models/scoresModel')
exports.list_all_employees = (req,res)=>{
    employees.find().populate('scores').exec((err,emps)=>{
        if (err) res.send(err);
        res.json(emps);
    })
};
exports.create_a_employee = (req,res)=>{
    let newEmployee = new employees();
    newEmployee.first_name  = req.body.first_name;
    newEmployee.last_name  = req.body.last_name;
    newEmployee.age  = req.body.age;
    let newScore = new scores();
    if(req.body.scores){
        newScore.on_time = req.body.score.on_time;
        newScore.amount = req.body.score.amount;
    }
    newScore.empid = newEmployee._id;
    newEmployee.scores = newScore._id;
    employees.findOne(
        {
            first_name : req.body.first_name,
            last_name : req.body.last_name
        },(err,emp)=>{
            if(err) res.send(err);
            if (emp){
                res.send("employees was exist!!")
            }
            newEmployee.save((errsave,emp)=>{
                if (errsave) res.send(errsave)
                newScore.save((errscore,score)=>{
                    if(errscore) res.send(errscore)
                    else res.json('add employee success!!');
                })

            })
        })
};
exports.update_a_employee = (req,res)=>{
    employees.findById(req.params.id).exec((err,emp)=>{
        if(err) res.send(err);
        if (emp){
            emp.first_name  = req.body.first_name;
            emp.last_name  = req.body.last_name;
            emp.age  = req.body.age;
            let newScore = new scores();
            if(typeof req.body.scores == typeof {}){
                scores.findById(emp.scores).exec((err,scores)=>{
                    if (err) res.send(err);
                    scores.on_time = req.body.scores.on_time;
                    scores.amount = req.body.scores.amount;
                    scores.save((err,scores)=>{
                        if (err) res.send(err);
                    })
                })
            }
            employees.findOne(
                {
                    first_name : req.body.first_name,
                    last_name : req.body.last_name
                },(err,empse)=>{
                    if(err) res.send(err);
                    if (empse){
                        res.send("employees was exist!!")
                    }
                    emp.save((errsave,emp)=>{
                        if (errsave) res.send(errsave)
                        res.send("update employees success!")

                    })
                }
            )
        }
        }
)
};
exports.delete_a_employee = (req,res)=>{
    employees.findById(req.params.id).exec((err,emp)=>{
        if (err) res.send(err);
        if(emp.scores){
            scores.deleteOne({_id: emp.scores}).exec((err,scores)=>{
                if(err){
                    res.send(err)

                }
                employees.deleteOne({_id : req.params.id}).exec((err,emp)=>{
                    if(err) res.send(err);
                    res.send("delete success!")
                })
            })
        }
        else{
            employees.deleteOne({_id : req.params.id}).exec((err,emp)=>{
                if(err) res.send(err);
                res.send("delete success!")
            })
        }


    })

}