const appointment_requests = require("./../../models/appointment_requests");

const employee_scheema = require("./../../models/employee_module");
const user_scheema = require("./../../models/user_module");
const time_slot = require("./../../models/time_slots");

const previous_appointments = require("./../../models/previous_appointments");

const prev_time_slots = require("./../../models/prev_time_slots");

const hr_dashbord = async (req, res, next) => {
  try {
    if (!req.cookies.hr_email) {
      req.flash("error", "You Are Not LoggedIn!!");
      res.redirect("/hr_login");
    } else if (req.cookies.hr_email) {


      
      var emploies = await employee_scheema.find();

      const prvs_time_slots = await prev_time_slots.find();
      var todaysTimeSlots = await time_slot.find({ occupied: true });
      // todaysTimeSlots.sort((a, b) => new Date(b.from_date) - new Date(a.from_date));

      todaysTimeSlots.sort((a, b) => {
        const dateComparison = new Date(b.from_date) - new Date(a.from_date);

        if (dateComparison !== 0) {
          return dateComparison; // If dates are different, return based on dates
        } else {
          // If dates are the same, compare based on time
          const timeA = a.time.split(":").map(Number);
          const timeB = b.time.split(":").map(Number);

          if (timeA[0] !== timeB[0]) {
            return timeB[0] - timeA[0]; // Compare hours
          } else {
            return timeB[1] - timeA[1]; // If hours are the same, compare minutes
          }
        }
      });

      // console.log(todaysTimeSlots)

      const prevAppointmentsPromises = prvs_time_slots.map(async (slot) => {
        try {
          const appointment = await previous_appointments.findOne({
            time_slotId: slot._id,
          });
          return appointment;
        } catch (error) {
          res.render("error", {
            message: req.flash("message"),
            bad_alert: req.flash("error"),
          });
        }
      });

      const all_prev_appointmentsF = await Promise.all(
        prevAppointmentsPromises
      );

      // Fetch appointments for each today's time slot
      const appointmentsPromises = todaysTimeSlots.map(async (slot) => {
        try {
          const appointment = await appointment_requests.findOne({
            time_slotId: slot._id,
          });
          return appointment;
        } catch (error) {
          res.render("error", {
            message: req.flash("message"),
            bad_alert: req.flash("error"),
          });
        }
      });

      var all_appointmentsF = await Promise.all(appointmentsPromises);

      // Fetch users for each appointment
      const usersPromises = all_appointmentsF.map(async (appointment) => {
        try {
          const user = await user_scheema.findOne({ _id: appointment.userID });
          return user;
        } catch (error) {
          res.render("error", {
            message: req.flash("message"),
            bad_alert: req.flash("error"),
          });
        }
      });

      var all_usersF = await Promise.all(usersPromises);

      // Fetch previous users for each previous appointment
      const prevUsersPromises = all_prev_appointmentsF.map(
        async (appointment) => {
          try {
            const user = await user_scheema.findOne({
              _id: appointment.userID,
            });
            return user;
          } catch (error) {
            res.render("error", {
              message: req.flash("message"),
              bad_alert: req.flash("error"),
            });
          }
        }
      );

      const all_prev_usersF = await Promise.all(prevUsersPromises);

      // Fetch employees for each appointment
      const employeesPromises = all_appointmentsF.map(async (appointment) => {
        try {
          const employee = await employee_scheema.findOne({
            _id: appointment.employeeID,
          });
          return employee;
        } catch (error) {
          res.render("error", {
            message: req.flash("message"),
            bad_alert: req.flash("error"),
          });
        }
      });

      var all_employeesF = await Promise.all(employeesPromises);

      // Fetch previous employees for each previous appointment
      const prevEmployeeIDs = all_prev_appointmentsF.map(
        (appointment) => appointment.employeeID
      );
      const all_prev_employeesF = await Promise.all(
        prevEmployeeIDs.map(async (employeeID) => {
          try {
            const employee = await employee_scheema.findOne({
              _id: employeeID,
            });
            return employee;
          } catch (error) {
            res.render("error", {
              message: req.flash("message"),
              bad_alert: req.flash("error"),
            });
          }
        })
      );

      var hostname;
      var hr_em = req.cookies.hr_email;
      if (hr_em == "amrita@swaayatt.com") {
        hostname = "Amrita Pachori";
      } else {
        hostname = "Soumya Kathal";
      }

      todaysTimeSlots = todaysTimeSlots.reverse();
      all_appointmentsF = all_appointmentsF.reverse();
      all_usersF = all_usersF.reverse();
      all_employeesF = all_employeesF.reverse();

      res.render("hr_dashbord.ejs", {
        emploies,
        todaysTimeSlots,
        all_appointmentsF,
        all_usersF,
        all_employeesF,
        all_prev_appointmentsF,
        prvs_time_slots,
        all_prev_employeesF,
        all_prev_usersF,
        hostname,
        message: req.flash("message"),
        bad_alert: req.flash("error"),
      });
    }
  } catch (error) {
    console.log(error);

    res.render("error", {
      message: req.flash("message"),
      bad_alert: req.flash("error"),
    });
  }
};

module.exports = hr_dashbord;
