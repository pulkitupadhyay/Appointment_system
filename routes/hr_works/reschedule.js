const appointment_requests = require("./../../models/appointment_requests");

const employee_scheema = require("./../../models/employee_module");
const user_scheema = require("./../../models/user_module");
const time_slot = require("./../../models/time_slots");
const sendMail = require("./../other_functions/sendMail");
const previous_appointments = require("./../../models/previous_appointments");

const prev_time_slots = require("./../../models/prev_time_slots");

const reschedule = async (req, res, next) => {
 
try {
  const inputDate = req.body.from_date;
  const reschedule_text = req.body.from_text;

  console.log("hey lucky", reschedule_text);

  // Convert the input date to a Date object
  const dateObject = new Date(inputDate);
  const isoString =
    dateObject.toISOString().split("T")[0] + "T00:00:00.000+00:00";

  // Add two days to the date
  // dateObject.setDate(dateObject.getDate() + i-1);

  // Format the result back to "YYYY-MM-DD" format
  // const formattedDate = dateObject.toISOString().split('T')[0];

  // Input time in the format "23:59"
  const inputTime = req.body.from_time;

  // Split the input time into hours and minutes
  const [hours, minutes] = inputTime.split(":");

  // Convert hours and minutes to numbers
  const hoursNumber = parseInt(hours, 10);
  const minutesNumber = parseInt(minutes, 10);

  // Calculate the new time after adding an hour
  const newHours = (hoursNumber + 0) % 24; // Ensure it wraps around to the next day if needed
  const newMinutes = minutesNumber;

  // Format the result to "HH:mm" format
  const formattedTime = `${newHours.toString().padStart(2, "0")}:${newMinutes
    .toString()
    .padStart(2, "0")}`;

  var current_time = formattedTime;

  // var existing_t_s = await time_slot.findOne({ $and:[{from_date: formattedDate}, {time: current_time}, {occupied: false}] })

  var ar = await appointment_requests.findOne({
    _id: req.body.appointment_id_to_reschedule,
  });

  if (ar) {
    // var ts_to_update = time_slot.findOne({_id: ar.time_slotId})
    await time_slot.findOneAndUpdate(
      { _id: ar.time_slotId }, // Conditions to find the document
      {
        $set: {
          from_date: isoString,
          time: current_time,
        },
      },
      { upsert: false }
    );

    var employee = await employee_scheema.findOne({ _id: ar.employeeID });
    
    
    var user = await user_scheema.findOne({ _id: ar.userID });
if(!user){
  console.log('user not found')
  req.flash('error', 'User not found!!!')
  res.redirect('/hr_dashbord')
}


    var TS = await time_slot.findOne({ _id: ar.time_slotId });

    function formatDate(inputDateString) {
      const inputDate = new Date(inputDateString);

      // Ensure that the inputDate is valid
      if (isNaN(inputDate.getTime())) {
        return "Invalid Date";
      }

      // Get day, month, and year components
      const day = inputDate.getDate().toString().padStart(2, "0");
      const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
      const year = inputDate.getFullYear().toString().slice(-2);

      // Format the date as dd/mm/yy
      return `${day}/${month}/${year}`;
    }

    const formattedDate = formatDate(TS.from_date);

    var to1 = employee.email;
    var subject1 = "Appointment Rescheduled!";
   

    var text1 = ` Dear ${employee.name} <br> I hope this message finds you well. I am writing to inform you that there has been a change in your appointment with ${user.name} has been reschedule. The details are as follows:`


    var html1 = 
          `<ul>
            <li>New Date: ${formattedDate}</li>
            <li>New Time: ${TS.time}</li>
            <li>Meeting Link: ${employee.link}</li>
          </ul>
          <br>
          <p>Reason : ${reschedule_text}</p>
          <p>We apologize for any inconvenience caused due to this rescheduling. Should you have any questions or concerns, please feel free to reach out to us.
            Best regards,</p>
          <br>
          <p>Swaayatt Robots Pvt. Ltd. </p>  
          `


    sendMail(to1, subject1, text1, html1);

    var to2 = user.email;
    var subject2 = "Appointment Rescheduled!";
  

    var text2 = ` Dear ${user.name} <br> I hope this message finds you well. I am writing to inform you that there has been a change in your appointment with ${employee.name} has been reschedule. The details are as follows:`


    var html2 = 
          `<ul>
            <li>New Date: ${formattedDate}</li>
            <li>New Time: ${TS.time}</li>
            <li>Meeting Link: ${employee.link}</li>
          </ul>
          <br>
          <p>Reason : ${reschedule_text}</p>
          <p>We apologize for any inconvenience caused due to this rescheduling. Should you have any questions or concerns, please feel free to reach out to us.
            Best regards,</p>
          <br>
          <p>Swaayatt Robots Pvt. Ltd. </p>`

    sendMail(to2, subject2, text2, html2);





    req.flash('message', 'The appointment or meeting is rescheduled!!!')

    res.redirect("/hr_dashbord");
  } else {
    var prev_ar = await previous_appointments.findOne({
      _id: req.body.appointment_id_to_reschedule,
    });
    var prev_ts = await prev_time_slots.findOne({ _id: prev_ar.time_slotId });

    var dateObjectl = new Date(req.body.from_date);

    const isoString =
      dateObjectl.toISOString().split("T")[0] + "T00:00:00.000+00:00";

    const inputTime = req.body.from_time;

    // Split the input time into hours and minutes
    const [hours, minutes] = inputTime.split(":");

    // Convert hours and minutes to numbers
    const hoursNumber = parseInt(hours, 10);
    const minutesNumber = parseInt(minutes, 10);

    // Calculate the new time after adding an hour
    // const newHours = (hoursNumber + (k-1) ) % 24; // Ensure it wraps around to the next day if needed
    // const newMinutes = minutesNumber;

    // Format the result to "HH:mm" format
    const formattedTime = `${hoursNumber
      .toString()
      .padStart(2, "0")}:${minutesNumber.toString().padStart(2, "0")}`;

    var p_ts = new time_slot({
      // _id: prev_ts._id,
      employeeID: prev_ts.employeeID,
      from_date: isoString,
      time: formattedTime,
      occupied: true,
    });

    p_ts
      .save()
      .then((savedDoc) => {
        // Access the generated MongoDB _id
        const p_tsId = savedDoc._id;

        var p_appo = new appointment_requests({
          _id: prev_ar._id,
          userID: prev_ar.userID,
          employeeID: prev_ar.employeeID,
          text: prev_ar.text,
          time_slotId: p_tsId,
          accepted: prev_ar.accepted,
        });

        p_appo
          .save()
          .then((doc) => {
            async function getdata() {
              var employee = await employee_scheema.findOne({
                _id: doc.employeeID,
              });
              var user = await user_scheema.findOne({ _id: doc.userID });
              var TS = await time_slot.findOne({ _id: doc.time_slotId });

              function formatDate(inputDateString) {
                const inputDate = new Date(inputDateString);

                // Ensure that the inputDate is valid
                if (isNaN(inputDate.getTime())) {
                  return "Invalid Date";
                }

                // Get day, month, and year components
                const day = inputDate.getDate().toString().padStart(2, "0");
                const month = (inputDate.getMonth() + 1)
                  .toString()
                  .padStart(2, "0");
                const year = inputDate.getFullYear().toString().slice(-2);

                // Format the date as dd/mm/yy
                return `${day}/${month}/${year}`;
              }

              const formattedDate = formatDate(TS.from_date);

              return { employee, user, TS, formattedDate };
            }

            getdata()
              .then(({ employee, user, TS, formattedDate }) => {
                // Now you can use the variables outside the function

                var to1 = employee.email;
                var subject1 = "Appointment Booked : You`ve got an appointment";
                var text1 = `Dear ${employee.name},\n\nI trust this message finds you well.\n\nWe are pleased to inform you that your upcoming appointment has been scheduled with ${user.name}. Please find the details below:\n\nDate: ${formattedDate}\nTime: ${TS.time}\nLink: ${req.body.text_associated}\n\nIn preparation for the appointment, kindly take a moment to review any relevant information or requirements. If there are specific topics you would like to discuss during the meeting, feel free to inform us.\n\nWe appreciate your time and cooperation in making this appointment a success.\n\nBest regards,\nSwaayatt Robots PVT LTD\n`;
                var html1 = `
        <p style="font-size: 1rem;">Dear ${employee.name},</p>
        <p style="font-size: 1rem;">I trust this message finds you well.</p>
        <p style="font-size: 1rem;">We are pleased to inform you that your upcoming appointment has been scheduled with ${user.name}. Please find the details below:</p>
        <ul style="list-style-type: none; padding: 0;">
          <li style="margin-bottom: 10px;"><strong>Date:</strong>${formattedDate}</li>
          <li style="margin-bottom: 10px;"><strong>Time:</strong> ${TS.time}</li>
          <li style="margin-bottom: 10px;"><strong>Link:</strong> ${doc.text}</li>
        </ul>
        <p style="font-size: 1rem;">In preparation for the appointment, kindly take a moment to review any relevant information or requirements. If there are specific topics you would like to discuss during the meeting, feel free to inform us.</p>
        <p style="font-size: 1rem;">We appreciate your time and cooperation in making this appointment a success.</p>
        <p style="font-size: 1rem;">Best regards,<br>Swaayatt Robots PVT LTD<br></p>
      `;

                sendMail(to1, subject1, text1, html1);

                var to2 = user.email;
                var subject2 = "Appointment Booked : You`ve got an appointment";
                var text2 = `Dear ${user.name},\n\nI trust this message finds you well.\n\nWe are pleased to inform you that your upcoming appointment has been scheduled with ${user.name}. Please find the details below:\n\nDate: ${formattedDate}\nTime: ${TS.time}\nLink: ${req.body.text_associated}\n\nIn preparation for the appointment, kindly take a moment to review any relevant information or requirements. If there are specific topics you would like to discuss during the meeting, feel free to inform us.\n\nWe appreciate your time and cooperation in making this appointment a success.\n\nBest regards,\nSwaayatt Robots PVT LTD\n`;
                var html2 = `
        <p style="font-size: 1rem;">Dear ${user.name},</p>
        <p style="font-size: 1rem;">I trust this message finds you well.</p>
        <p style="font-size: 1rem;">We are pleased to inform you that your upcoming appointment has been scheduled with ${employee.name}. Please find the details below:</p>
        <ul style="list-style-type: none; padding: 0;">
          <li style="margin-bottom: 10px;"><strong>Date:</strong>${formattedDate}</li>
          <li style="margin-bottom: 10px;"><strong>Time:</strong> ${TS.time}</li>
          <li style="margin-bottom: 10px;"><strong>Link:</strong> ${doc.text}</li>
        </ul>
        <p style="font-size: 1rem;">In preparation for the appointment, kindly take a moment to review any relevant information or requirements. If there are specific topics you would like to discuss during the meeting, feel free to inform us.</p>
        <p style="font-size: 1rem;">We appreciate your time and cooperation in making this appointment a success.</p>
        <p style="font-size: 1rem;">Best regards,<br>Swaayatt Robots PVT LTD<br></p>
      `;

                sendMail(to2, subject2, text2, html2);
              })
              .catch((error) => console.error(error));
          })
          .catch((error) => {
            console.error("Error saving document:", error);
            // Handle the error as needed
          });
      })
      .catch((error) => {
        console.error("Error saving document:", error);
        // Handle the error as needed
      });

    // await p_ts.save();
    req.flash('message', 'The appointment or meeting is rescheduled!!!')

    res.redirect("/hr_dashbord");
  }
} catch (error) {
  req.flash('error', 'Sorry something went wrong !!!')
  res.redirect('/hr_dashbord')
}


};

module.exports = reschedule;
