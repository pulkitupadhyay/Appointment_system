var employee_scheema = require("./../../models/employee_module");

const employee_login = async (req, res, next) => {
  var employee_email = req.body.employee_email;
  var employee_pass = req.body.employee_password;

  if (!employee_email || !employee_pass) {
    res.send(
      "please provide email and password , seems like you diddent enterd one of em "
    );
  }
  var new_employee = await employee_scheema.findOne({ email: employee_email });

  if (!new_employee) {
    res.send("please enter a valid email addres or sign up if you diddent ");
  } else if (employee_pass !== new_employee.password) {
    res.send(
      "please provide correct  email or  password , seems like you enterd wrong cridentials  "
    );
  } else if (employee_pass === new_employee.password) {
    res.cookie("employee_email", new_employee.email);

    res.redirect("/employee_Dashbord");
  }
};
module.exports = employee_login
