var employee_scheema = require("./../../models/employee_module");

const employee_login = async (req, res, next) => {

// if(req.cookies.employee_email){
//   var new_employee = await employee_scheema.findOne({ email: req.cookies.employee_email });
//   if(new_employee){

//     res.cookie("employee_email", new_employee.email);

//     res.redirect(`/employee_Dashbord/${new_employee._id}`);
//   }

// }




  var employee_email = req.body.employee_email;
  // var employee_pass = req.body.employee_password;

  if (!employee_email) {
    req.flash('error', 'Please provide email')
    res.redirect('/employee_login');
  }else{
    var new_employee = await employee_scheema.findOne({ email: employee_email });
    if(new_employee){

      res.cookie("employee_email", new_employee.email);

      res.redirect(`/employee_Dashbord/${new_employee._id}`);
    }else{
      req.flash('error', 'Employee Not Found!!')
    res.redirect('/employee_login');
    }
 
  }

  
};
module.exports = employee_login
