
var user_scheema= require('./../../models/user_module')


var user_signup = async (req, res, next) => {
    var user_name = req.body.userName;
    var user_email = req.body.userEmail;
    var user_timezone = req.body.Timezone;
    var user_password = req.body.userPassword;
  
    var userexist = await user_scheema.findOne({ email: user_email });
  
    if (userexist) {
      try {
        // var user1 = await user_scheema.findOne({ email: new_user.email });
  
        user = userexist;
  
        var slot_id = req.body.slot_id;
        var employee_id = req.body.employee_id;
  
        // res.cookie('user_email', new_user.email);
  
        res.render("final_slot_book", { slot_id, employee_id, user });
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      let new_user = new user_scheema({
        name: user_name,
        email: user_email,
        password: user_password,
        timezone: user_timezone,
      });
  
      var user;
      new_user.save().then(async function (dets) {
        try {
          var user1 = await user_scheema.findOne({ email: new_user.email });
  
          user = user1;
  
          var slot_id = req.body.slot_id;
          var employee_id = req.body.employee_id;
  
          res.cookie("user_email", new_user.email);
  
          res.render("final_slot_book", { slot_id, employee_id, user });
        } catch (error) {
          console.error("Error:", error);
        }
      });
    }
  }

  module.exports=user_signup;