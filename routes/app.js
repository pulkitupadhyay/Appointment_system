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
const downloadResume = require("./other_functions/download_resume");

const fs = require("fs");
const { parse } = require("date-fns");
const sendMailcc = require("./other_functions/send_mail_cc");
const moment = require("moment-timezone");
var cron = require("node-cron");
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
const { el } = require("date-fns/locale");
const multer = require("multer");
const dayChange = require("./other_functions/dayChange");
const removeSlot = require("./other_functions/removeSlot");
const addSlot = require("./other_functions/addSlot");
const reminderFunc = require("./other_functions/reminderFunc");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post("/add-slot", addSlot);

router.post("/removeslot", removeSlot);

router.post("/fake_login", fake_login);

router.post("/hr_login", hr_login);

router.post("/user_signUp", user_signup);

router.post("/hr_signUp", hr_signUp);

router.post("/employee_signUp", employee_signUp);

router.get("/hr_dashbord", hr_dashbord);

router.get("/employee_Dashbord/:id", employee_Dashbord);

router.post("/employee_login", employee_login);

router.post("/add_time_slots", add_time_slots);

router.get("/employee/:id", with_perticuler_employee);

router.post("/book_slot", upload.single("resume"), book_slot);

router.post("/delete_appointment", delete_apppointment);

router.post("/reSchedule_appointment", reschedule);

router.post("/remove_timeslot", remove_ts);

router.post("/dayChange", dayChange);

router.get("/res-dow/:id", downloadResume);


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
  res.render("initial");

  // res.redirect("/hr_login");
});

schedule.scheduleJob("1 */1 * * *", () => {
  console.log("This schaduler will run every 1 hour and one minut ");
  del();
});

const cronExpression = "0 * * * *"; // This cron expression runs every hour at minute 0

// Create a job using the cron expression
var cron1 = cron.schedule(cronExpression, reminderFunc, {
  scheduled: true,
  timezone: "Asia/Calcutta",
});

cron1.start();

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

// const reminderFunc=require('./../routes/other_functions/reminderFunc')
// reminderFunc();
// router.get('/api-dow', async (req, res, next) => {
//   try {
//     const url =
//     const response = await axios.get(url, { responseType: 'stream' });
//     res.setHeader('Content-Disposition', 'attachment; filename="image.jpg"');
//     response.data.pipe(res);
//   } catch (error) {
//     console.error("Error downloading file:", error);
//     res.status(500).send("Error downloading file.");
//   }
// });

module.exports = router;
