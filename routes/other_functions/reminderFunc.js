const time_slot = require('./../../models/time_slots')
const appointment_requests = require('./../../models/appointment_requests')
const user_scheema = require('./../../models/user_module')
const employee_scheema = require('./../../models/employee_module')
const moment = require('moment')
const sendMailcc = require('./send_mail_cc')

const reminderFunc = async function () {
   
  try {
    var today = new Date();
    // var date = today
    var options = {
      timeZone: "Asia/Kolkata", // Indian Standard Time (IST)
      hour12: false, // Use 24-hour format
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    var locals = today.toLocaleString("en-US", options);
    var date = new Date(locals);
    var DStirng = new Date(locals).toISOString();
    const formattedDateString = DStirng.slice(0, 10) + "T00:00:00.000+00:00";
    console.log(formattedDateString);
    // console.log(formattedDateString)
    const todaySTasks = await time_slot.find({
      from_date: formattedDateString,
    });
    const hours = String(date.getHours()).padStart(2, "0"); // Ensure two digits, padding with '0' if necessary
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Ensure two digits, padding with '0' if necessary
    const timeString = `${hours}:${minutes}`;

    const filteredTasks = todaySTasks.filter((task) => {
      const taskHour = parseInt(task.time.split(":")[0]); // Extract hour part from task's time
      const comparetimeHour = parseInt(timeString.split(":")[0]); // Extract hour part from comparetime
      return taskHour == comparetimeHour + 1;
    });
    const timeSlotIds = filteredTasks.map((task) => task._id);

    // Find all appointment requests where timeSlotId matches any of the _id values in the filteredTasks array
    const appointmentRequests = await appointment_requests.find({
      time_slotId: { $in: timeSlotIds },
    });
    const userIds = appointmentRequests.map(
      (appointment) => appointment.userID
    );
    const employeeIds = appointmentRequests.map(
      (appointment) => appointment.employeeID
    );

    // Fetch user documents
    const user1 = await user_scheema.find({ _id: { $in: userIds } });
    // console.log(user1)
    // Fetch employee documents
    const employee1 = await employee_scheema.find({
      _id: { $in: employeeIds },
    });
    // console.log(employee1)
    // Populate appointment objects with user and employee details
    const populatedAppointments = appointmentRequests.map((appointment) => {
      const user = user1.find((user) => user._id == appointment.userID);
      const employee = employee1.find(
        (employee) => employee._id == appointment.employeeID
      );
      const timeslot = filteredTasks.find(
        (slot) => slot._id == appointment.time_slotId
      );
      return {
        ...appointment,
        user,
        employee,
        timeslot,
      };
    });

    console.log(populatedAppointments);
    if (populatedAppointments.length == 0) {
      console.log("no appointments");
    } else {
      for (const appointment of populatedAppointments) {
        const date = new Date();
        const timeString = appointment.timeslot.time;

        const employee_email = appointment.employee.email;
        const user_email = appointment.user.email;
        const subject = "Meeting Reminder !!";
        const text = `
        Dear ${appointment.user.name},
        
        Just a quick reminder about your meeting today with ${
          appointment.employee.name
        }:
        
        - Date: ${moment(appointment.timeslot.from_date).format("DD/MM/YYYY")}
        - Time: ${appointment.timeslot.time} (Indian Standard Time)
        - Meeting Link: ${appointment.employee.link}
        - Download Resume : https://swaayatt.com/res-dow/${appointment.user._id}
        
        Please ensure being on time.
        
        Best Regards,
        Swaayatt Robots Pvt Ltd
    `;

        await sendMailcc(user_email, subject, text, employee_email);
      }
    }
    console.log("Reminder Mail Sent");
  } catch (error) {
    console.log(error)
    console.log('some error in sending the email')
  }
  
  }


  module.exports = reminderFunc;