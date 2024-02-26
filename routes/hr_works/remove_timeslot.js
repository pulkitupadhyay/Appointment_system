const time_slot = require('./../../models/time_slots')

const remove_ts = async (req, res, next) => {
    await time_slot.findOneAndDelete({ _id: req.body.app_id });
  req.flash('message', 'The time slot has been removed!!!!!')
    res.redirect("/employee_Dashbord");
  }

  module.exports = remove_ts