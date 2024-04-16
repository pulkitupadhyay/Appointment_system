
const time_slot = require('./../../models/time_slots')
const  appointment_requests = require('./../../models/appointment_requests')
const  employee_scheema = require('./../../models/employee_module')
const user_scheema = require('./../../models/user_module')

const employee_Dashbord = async (req, res, next) => {
  var new_employee =    await employee_scheema.findOne({ _id: req.params.id.trim() })
     
  

    const promiseResult = await Promise.allSettled([
        appointment_requests.find({employeeID:new_employee._id}),
        user_scheema.find(),
        time_slot.find({employeeID:new_employee._id})
      ]);



    let [appointments,users,time_slots] = promiseResult
      .filter((data) => data.status === "fulfilled")
      .map((data) => data.value);

      let formattedAppointments = [];

      // Iterate over appointments array
      appointments.forEach((appointment) => {
        // Find the corresponding user for the appointment
        const user = users.find((user) => user._id.toString() === appointment.userID.toString());
        // Find the corresponding time slot for the appointment
        const time_slot = time_slots.find((slot) => slot._id.toString() === appointment.time_slotId.toString());
  
        // Add the formatted appointment details to the array
        formattedAppointments.push({
          appointment,
          user,
          time_slot
        });
      });
  // console.log(formattedAppointments)

  const compareAppointmentsByDateAndTime = (a, b) => {
    // Get the from_date and time of the time slots of appointments a and b
    const dateA = new Date(a.time_slot.from_date);
    const dateB = new Date(b.time_slot.from_date);
    const timeA = a.time_slot.time;
    const timeB = b.time_slot.time;
  
    // Compare dates
    if (dateA.getTime() !== dateB.getTime()) {
      return dateA - dateB; // Sort by date in ascending order (newest first)
    }
  
    // If dates are the same, compare times
    return timeA.localeCompare(timeB); // Sort by time in ascending order (newest first)
};

formattedAppointments.sort(compareAppointmentsByDateAndTime);

    
    res.render("employee_home", {
      new_employee,
      
      formattedAppointments,
      
     
      message: req.flash('message'),
      bad_alert: req.flash('error'),
    });
  }

  module.exports = employee_Dashbord