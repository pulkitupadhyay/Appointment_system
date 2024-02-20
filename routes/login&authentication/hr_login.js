const hrs = require('./../../models/hrs')

var hr_login=async (req, res, next) => {
    var hr = await hrs.findOne({ email: req.body.employee_email });
  
    if (hr) {
      if (req.body.employee_password == hr.password) {
        res.cookie("hr_email", hr.email);
        res.redirect("/hr_dashbord");
      } else {
        res.send("please provide correct cridentials");
      }
    } else if (!hr) {
      res.send("please provide correct deteils");
    }
  }

  module.exports = hr_login;