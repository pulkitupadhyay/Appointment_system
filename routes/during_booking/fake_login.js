const time_slot = require("./../../models/time_slots");
const fs = require("fs");
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

var fake_login = async (req, res, next) => {
  let from_time = req.body.from_time;
  var hours = req.body.hour;
  var minutes = req.body.minute;
  var ampms = req.body.ampm;

  if (hours === undefined) {
    console.log("not hours");
  } else if (hours) {
    function convertTo24HourFormat(hour, minute, ampm) {
      // Parse hour and minute as integers
      const hourInt = parseInt(hour, 10);
      const minuteInt = parseInt(minute, 10);

      // Adjust hour based on am/pm
      const adjustedHour =
        ampm === "PM" && hourInt !== 12
          ? hourInt + 12
          : ampm === "AM" && hourInt === 12
          ? 0
          : hourInt;

      // Format the result
      const formattedHour = adjustedHour.toString().padStart(2, "0");
      const formattedMinute = minuteInt.toString().padStart(2, "0");

      // Combine hour and minute
      const result = `${formattedHour}:${formattedMinute}`;

      return result;
    }

    from_time = convertTo24HourFormat(hours, minutes, ampms);
  }

  var date_t = req.body.date_of_ap;
  console.log(req.body)

  function parseDateString(dateString) {
    // Split the date string into day, month, and year components
    const [day, month, year] = dateString.split("/").map(Number);

    // Create a new Date object (months are 0-indexed in JavaScript Date)
    const jsDate = new Date(year, month - 1, day);

    // Format the date to 'YYYY-MM-DD'
    const formattedDate = jsDate.toLocaleDateString("en-CA"); // Adjust the locale as needed

    return formattedDate;
  }

  const jsDate = parseDateString(date_t);
  // var user_id = req.body.user_id;
  var employee_id = req.body.employee_id;

  var checktimeslot = await time_slot.find({employeeID:employee_id.trim(),from_date:jsDate, time:from_time})
  // console.log(checktimeslot.length)

if(checktimeslot.length != 0){
      // console.log(checktimeslot)
      req.flash('error',"TimeSlot is preoccupied please try another one!")
      res.redirect(`/employee/${req.body.employee_id}`)

}else{

  var slot = new time_slot({
    employeeID: employee_id,
    from_date: jsDate,
    time: from_time,
    occupied: false,
  });
  var slot_id;
  slot
    .save()
    .then((savedSlot) => {
      slot_id = savedSlot._id;

      res.render("fake_user_login", {
        slot_id,
        employee_id,
        timezones,
        message: req.flash("message"),
        bad_alert: req.flash("error"),
      });
    })
    .catch((error) => {
      console.error("Error saving time slot:", error);
      req.flash('error',"SomeThing went wrong!!")
      if(req.cookies.hr_email){
        res.redirect('/hr_dashbord')
      }else{
        res.redirect(`/employee/${req.body.employee_id}`)
      }
    });
  }

};

module.exports = fake_login;
