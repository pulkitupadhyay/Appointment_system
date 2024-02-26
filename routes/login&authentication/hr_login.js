const hrs = require('./../../models/hrs')

var hr_login=async (req, res, next) => {
    var hr = await hrs.findOne({ email: req.body.employee_email });
  
    if (hr) {
      if (req.body.employee_password == hr.password) {
        res.cookie("hr_email", hr.email);

        req.flash('message','Welcome Onbord HR you are now logged in!!')
        res.redirect("/hr_dashbord");
      } else {


req.flash('error','Please Provide Correct Cridentials!!')
        res.redirect('/hr_login')
     
     
      }
    } else if (!hr) {
      req.flash('error','Please Provide Correct Cridentials!!')
      res.redirect('/hr_login')
    }
  }

  module.exports = hr_login;