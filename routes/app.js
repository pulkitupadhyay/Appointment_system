const express = require("express");
const router = express.Router();
const user_scheema = require("./../models/user_module");
const employee_scheema = require("./../models/employee_module");
const time_slot = require("./../models/time_slots");
const appointment_requests = require("./../models/appointment_requests");
const del = require("./other_functions/del_ex_func");
const schedule = require("node-schedule");
const nodemailer = require("nodemailer");
const previous_appointments = require("./../models/previous_appointments");
const prev_time_slots = require("./../models/prev_time_slots");
const hr = require("./../models/hrs");
const hrs = require("./../models/hrs");
const sendMail = require("./other_functions/sendMail");
const fs = require("fs");
const { parse } = require("date-fns");
const sendMailcc =require('./other_functions/send_mail_cc')
const moment = require('moment-timezone')

const hr_login = require("./login&authentication/hr_login");
const fake_login = require("./during_booking/fake_login");
const with_perticuler_employee = require("./employee_related/perticuler_employee_page");
const book_slot = require("./during_booking/book_slot");
const user_signup = require("./during_booking/user_signup");
const hr_signUp = require("./login&authentication/hr_signup");
const employee_signUp = require("./hr_works/employee_signup");
const employee_Dashbord = require("./employee_related/employee_dashbord");
const employee_login = require("./employee_related/employee_login");
const add_time_slots = require("./hr_works/add_time_slots");
const delete_apppointment = require("./hr_works/delete_appointment");
const reschedule = require("./hr_works/reschedule");
const hr_dashbord = require("./hr_works/hr_dashbord");
const remove_ts = require("./hr_works/remove_timeslot");
const employee_module = require("./../models/employee_module");
var timezones;

fs.readFile("public/gifs/timezones.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading JSON file:", err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);

    timezones = jsonData;
  } catch (parseError) {
    console.error("Error parsing JSON:", parseError);
  }
});

router.post("/add-day", async (req, res, next) => {
  const { daytoadd, emp_id } = req.body;
  try {
    const that_employee = await employee_scheema.findOne({
      _id: emp_id.trim(),
    });

    if (that_employee) {
      if (!that_employee.days.includes(daytoadd)) {
        that_employee.days.push(daytoadd);
        await that_employee.save();
        req.flash("message", "Day added successfully.");
        res.redirect(req.header("referer") || "/");
      } else {
        req.flash("error", "Day already exists for this employee.");
        res.redirect(req.header("referer") || "/");
      }
    } else {
      req.flash("error", "Employee not found.");
      res.redirect(req.header("referer") || "/");
    }
  } catch (error) {
    console.error("Error adding day:", error);
    req.flash("error", "Internal Server Error");
    res.redirect(req.header("referer") || "/");
  }
  
});

router.post("/removeday", async (req, res, next) => {
  const { emp_id, daytoremove } = req.body;
  try {
    const that_employee = await employee_module.findOne({ _id: emp_id.trim() });

    if (that_employee) {
      const indexToRemove = that_employee.days.indexOf(daytoremove);

      if (indexToRemove !== -1) {
        that_employee.days.splice(indexToRemove, 1);
        await that_employee.save();
        req.flash("message", "Day removed successfully.");
      } else {
        req.flash("error", "Day not found for this employee.");
      }
    } else {
      req.flash("error", "Employee not found.");
    }
  } catch (error) {
    console.error("Error removing day:", error);
    req.flash("error", "Internal Server Error");
  }
  res.redirect(req.header("referer") || "/");
});

router.get("/hr_login", (req, res, next) => {
  if (req.cookies.hr_email) {
    res.redirect("hr_dashbord");
  } else {
    res.render("hr_login.ejs", {
      message: req.flash("message"),
      bad_alert: req.flash("error"),
    });
  }
});
router.get("/", (req, res) => {
res.render('initial')

  // res.redirect("/hr_login");
});

schedule.scheduleJob("1 */1 * * *", () => {
  console.log("This schaduler will run every 1 hour and one minut ");
  del();
});

const cronExpression = '0 * * * *'; // This cron expression runs every hour at minute 0

// Create a job using the cron expression
const job = schedule.scheduleJob(cronExpression, async function() {

  var today = new Date();
  var date = today
  var DStirng = today.toISOString();
  const formattedDateString = DStirng.slice(0, 10) + 'T00:00:00.000+00:00';
    
// console.log(formattedDateString)
const todaySTasks = await time_slot.find({ from_date : formattedDateString})
const hours = String(date.getHours()).padStart(2, '0'); // Ensure two digits, padding with '0' if necessary
const minutes = String(date.getMinutes()).padStart(2, '0'); // Ensure two digits, padding with '0' if necessary
const timeString = `${hours}:${minutes}`;
 
const filteredTasks = todaySTasks.filter(task => {
const taskHour = parseInt(task.time.split(':')[0]); // Extract hour part from task's time
const comparetimeHour = parseInt(timeString.split(':')[0]); // Extract hour part from comparetime
return taskHour == comparetimeHour + 1;
});
const timeSlotIds = filteredTasks.map(task => task._id);

// Find all appointment requests where timeSlotId matches any of the _id values in the filteredTasks array
const appointmentRequests = await appointment_requests.find({ time_slotId: { $in: timeSlotIds } });
const userIds = appointmentRequests.map(appointment => appointment.userID);
const employeeIds = appointmentRequests.map(appointment => appointment.employeeID);

// Fetch user documents
const user1 = await user_scheema.find({ _id: { $in: userIds } });
// console.log(user1)
// Fetch employee documents
const employee1 = await employee_scheema.find({ _id: { $in: employeeIds } });
// console.log(employee1)
// Populate appointment objects with user and employee details
const populatedAppointments = appointmentRequests.map(appointment => {
const user = user1.find(user => user._id == appointment.userID);
const employee = employee1.find(employee => employee._id == appointment.employeeID);
const timeslot = filteredTasks.find(slot=>slot._id == appointment.time_slotId)
return {
  ...appointment,
  user,
  employee,
  timeslot
};
});

// console.log(populatedAppointments);

populatedAppointments.forEach(appointment => {



// Assuming you have a JavaScript Date object and a time string
const date = new Date(); // Your JavaScript Date object
const timeString = appointment.timeslot.time; // Your time string in 24-hour format

// Combine the date and time
const combinedDateTime = moment(date).format('YYYY-MM-DD') + ' ' + timeString;

// Convert to Indian Standard Time
const indianStandardTime = moment.tz(combinedDateTime, 'Asia/Kolkata').format();

// console.log(indianStandardTime);


 let employee_email = appointment.employee.email;
 let user_email = appointment.user.email;
 let subject = 'Meeting Reminder !!'
 let text = `
 Dear ${appointment.user.name},
 
 Just a quick reminder about your meeting today with ${appointment.employee.name}:
 
 - Date: ${moment(appointment.timeslot.from_date).format('DD/MM/YYYY')}
 - Time: ${appointment.timeslot.time} (Indian Standard Time)
 - Meeting Link: ${appointment.employee.link}
 
 Please ensure being on time.
 
 Best Regards,
 Swaayatt Robots Pvt Ltd
 `

 
 sendMailcc(user_email, subject, text, employee_email)
// console.log(text)
  
});

console.log('Reminder Mail Sent');
});

// const schedule = require('node-schedule');

// Define the cron expression for running every one hour



router.get("/book_appointment", async (req, res, next) => {
  var emploies = await employee_scheema.find();
  res.render("book_appointment", {
    emploies,
    message: req.flash("message"),
    bad_alert: req.flash("error"),
  });
});

router.get("/employee_login", (req, res, next) => {
  res.render("employee_login", {
    message: req.flash("message"),
    bad_alert: req.flash("error"),
  });
});

router.post("/add-slot", async (req, res, next) => {
  const { emp_id, slottoadd } = req.body;
  try {
    const that_employee = await employee_scheema.findOne({
      _id: emp_id.trim(),
    });

    if (that_employee) {
      // Check if the slottoadd is not already in the array
      if (!that_employee.slots.includes(slottoadd)) {
        // Add slottoadd to the array
        that_employee.slots.push(slottoadd);
        // Save the updated document
        await that_employee.save();
        // Set flash message for success
        req.flash("message", "Slot added successfully.");
      } else {
        // Set flash message for slot already existing
        req.flash("error", "Slot already exists for this employee.");
      }
    } else {
      // Set flash message for employee not found
      req.flash("error", "Employee not found.");
    }
  } catch (error) {
    console.error("Error adding slot:", error);
    // Set flash message for internal server error
    req.flash("error", "Internal Server Error");
  }
  // Redirect back to the previous URL
  res.redirect(req.header("referer") || "/");
});

router.post("/removeslot", async (req, res, next) => {
  const { slottoremove, emp_id } = req.body;
  try {
    const that_employee = await employee_module.findOne({ _id: emp_id.trim() });

    if (that_employee) {
      const indexToRemove = that_employee.slots.indexOf(slottoremove);

      if (indexToRemove !== -1) {
        that_employee.slots.splice(indexToRemove, 1);
        await that_employee.save();
        req.flash("message", "Slot removed successfully.");
      } else {
        req.flash("error", "Slot not found for this employee.");
      }
    } else {
      req.flash("error", "Employee not found.");
    }
  } catch (error) {
    console.error("Error removing slot:", error);
    req.flash("error", "Internal Server Error");
  }
  res.redirect(req.header("referer") || "/");
});

// done

router.post("/fake_login", fake_login);
// done
router.post("/hr_login", hr_login);
// done
router.post("/user_signUp", user_signup);
// done
router.post("/hr_signUp", hr_signUp);
// done
router.post("/employee_signUp", employee_signUp);
// done
router.get("/hr_dashbord", hr_dashbord);

router.get("/employee_Dashbord/:id", employee_Dashbord);

router.post("/employee_login", employee_login);

router.post("/add_time_slots", add_time_slots);
//done
router.get("/employee/:id", with_perticuler_employee);
//done
router.post("/book_slot", book_slot);
//done
router.post("/delete_appointment", delete_apppointment);
//done
router.post("/reSchedule_appointment", reschedule);
//done
router.post("/remove_timeslot", remove_ts);

module.exports = router;
