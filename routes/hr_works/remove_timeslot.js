const time_slot = require('./../../models/time_slots')

const remove_ts = async (req, res, next) => {
    await time_slot.findOneAndDelete({ _id: req.body.app_id });
  
    res.redirect("/employee_Dashbord");
  }

  module.exports = remove_ts