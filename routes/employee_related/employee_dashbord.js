
const time_slot = require('./../../models/time_slots')
const  appointment_requests = require('./../../models/appointment_requests')
const  employee_scheema = require('./../../models/employee_module')
const user_scheema = require('./../../models/user_module')

const employee_Dashbord = async (req, res, next) => {
    var new_employee = await employee_scheema.findOne({ _id: req.params.id });
  
    var time_slots = await time_slot.find({
      employeeID: new_employee._id,
      occupied: false,
    });
  
    var time_slots1 = time_slots;
    time_slots1.sort((a, b) => {
      const dateA = new Date(a.from_date);
      const dateB = new Date(b.from_date);
      return dateA - dateB;
    });
  
    var appointment_requests1 = await appointment_requests.find({
      employeeID: new_employee._id,
      accepted: false,
    });
    var accepted_appintments = await appointment_requests.find({
      employeeID: new_employee._id,
      accepted: true,
    });
  
    var appointment_users = [];
    var accepted_users = [];
  
    for (var i = 0; i < appointment_requests1.length; i++) {
      var user = await user_scheema.findOne({
        _id: appointment_requests1[i].userID,
      });
  
      appointment_users.push(user);
    }
  
    for (var i = 0; i < accepted_appintments.length; i++) {
      var user = await user_scheema.findOne({
        _id: accepted_appintments[i].userID,
      });
  
      accepted_users.push(user);
    }
  
    var appointment_timeslot = [];
    var appointment_timeslot_for_accepted_reqests = [];
  
    for (var i = 0; i < appointment_requests1.length; i++) {
      var app_time_slot = await time_slot.findOne({
        _id: appointment_requests1[i].time_slotId.trim(),
      });
      appointment_timeslot.push(app_time_slot);
    }
    for (var i = 0; i < accepted_appintments.length; i++) {
      var app_time_slot = await time_slot.findOne({
        _id: accepted_appintments[i].time_slotId.trim(),
      });
  
      if (app_time_slot === null) {
      } else {
        appointment_timeslot_for_accepted_reqests.push(app_time_slot);
      }
    }
  
    res.render("employee_home", {
      new_employee,
      time_slots,
      appointment_requests1,
      accepted_users,
      appointment_users,
      appointment_timeslot,
      accepted_appintments,
      appointment_timeslot_for_accepted_reqests,
      message: req.flash('message'),
      bad_alert: req.flash('error'),
    });
  }

  module.exports = employee_Dashbord