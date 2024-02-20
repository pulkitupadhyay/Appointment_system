const employee_scheema = require('./../../models/employee_module')
const time_slot = require('./../../models/time_slots')



const add_time_slots= async (req, res, next) => {
    let employee = await employee_scheema.findOne({
      email: req.cookies.employee_email,
    });
  
    for (i = 1; i <= req.body.days; i++) {
      // Input date in the format "YYYY-MM-DD"
      const inputDate = req.body.from_date;
  
      // Convert the input date to a Date object
      const dateObject = new Date(inputDate);
  
      // Add two days to the date
      dateObject.setDate(dateObject.getDate() + i - 1);
  
      // Format the result back to "YYYY-MM-DD" format
      const formattedDate = dateObject.toISOString().split("T")[0];
  
      for (k = 1; k <= req.body.hours; k++) {
        // Input time in the format "23:59"
        const inputTime = req.body.from_time;
  
        // Split the input time into hours and minutes
        const [hours, minutes] = inputTime.split(":");
  
        // Convert hours and minutes to numbers
        const hoursNumber = parseInt(hours, 10);
        const minutesNumber = parseInt(minutes, 10);
  
        // Calculate the new time after adding an hour
        const newHours = (hoursNumber + (k - 1)) % 24; // Ensure it wraps around to the next day if needed
        const newMinutes = minutesNumber;
  
        // Format the result to "HH:mm" format
        const formattedTime = `${newHours
          .toString()
          .padStart(2, "0")}:${newMinutes.toString().padStart(2, "0")}`;
  
        var current_time = formattedTime;
  
        var slot = new time_slot({
          employeeID: employee._id,
          from_date: formattedDate,
          time: formattedTime,
        });
  
        slot.save().then(() => {
          console.log("time slot saved");
        });
      }
    }
    res.redirect("/employee_Dashbord");
  }

  module.exports = add_time_slots;