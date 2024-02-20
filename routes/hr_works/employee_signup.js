



const employee_scheema = require('./../../models/employee_module')


const employee_signUp=async (req, res, next) => {
    var employee_name = req.body.employeeName;
    var employee_email = req.body.employeeEmail;
    var employee_number = req.body.employeeNumber;
    var employee_password = req.body.employeePassword;
  
    let new_employee = new employee_scheema({
      name: employee_name,
      email: employee_email,
      password: employee_password,
      number: employee_number,
    });
  
    new_employee.save().then(function (dets) {
      // res.cookie('employee_email', new_employee.email);
  
      res.redirect("/hr_dashbord");
    });
  }



module.exports = employee_signUp;
  