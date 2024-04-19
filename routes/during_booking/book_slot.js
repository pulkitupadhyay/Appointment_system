var user_scheema = require("./../../models/user_module");
var employee_scheema = require("./../../models/employee_module");
var appointment_requests = require("./../../models/appointment_requests");
var time_slot = require("./../../models/time_slots");

var sendMail = require("./../other_functions/sendMail");

const book_slot = async (req, res, next) => {
  // var user = await user_scheema.findOne({ _id: req.body.user_id });
  // var employee = await employee_scheema.findOne({ _id: req.body.employee_id });
  // var TS = await time_slot.findOne({ _id: req.body.slot_id.trim() });

  const promiseResult = await Promise.allSettled([
    user_scheema.findOne({ _id: req.body.user_id }),
    employee_scheema.findOne({ _id: req.body.employee_id }),
    time_slot.findOne({ _id: req.body.slot_id.trim() }),
  ]);

  
  let [user, employee, TS] = promiseResult
    .filter((data) => data.status === "fulfilled")
    .map((data) => data.value);

  var new_appointment_request = new appointment_requests({
    userID: req.body.user_id,
    employeeID: req.body.employee_id,
    text: req.body.text_associated,
    time_slotId: req.body.slot_id.trim(),
    accepted: true,
  });

  if (TS.occupied == true) {
    res.render("error", {
      message: req.flash("message"),
      bad_alert: req.flash("error"),
    });
  } else {
    await time_slot.findOneAndUpdate(
      { _id: req.body.slot_id.trim() }, // Conditions to find the document
      {
        $set: {
          occupied: true,
        },
      }
    );

    new_appointment_request.save().then(() => {
      const inputDate = new Date(TS.from_date);

      const day = inputDate.getDate().toString().padStart(2, "0");
      const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
      const year = inputDate.getFullYear().toString().slice(-2);

      const formattedDate = `${day}/${month}/20${year}`;

      // to, subject,text, html
      // sendign mail of apointment
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
                  <li style="margin-bottom: 10px;"><strong>Link:</strong> ${employee.link}</li>
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
                  <li style="margin-bottom: 10px;"><strong>Link:</strong> ${employee.link}</li>
                </ul>
                <p style="font-size: 1rem;">In preparation for the appointment, kindly take a moment to review any relevant information or requirements. If there are specific topics you would like to discuss during the meeting, feel free to inform us.</p>
                <p style="font-size: 1rem;">We appreciate your time and cooperation in making this appointment a success.</p>
                <p style="font-size: 1rem;">Best regards,<br>Swaayatt Robots PVT LTD<br></p>
              `;

      sendMail(to2, subject2, text2, html2);

      if (req.cookies.hr_email) {
        req.flash("message", "The Meeting Has Been Scheduled!!!");
        res.redirect("/hr_dashbord");
      } else {
        req.flash("message", "The Meeting Has Been Scheduled!!!");

        res.render("after_slot_booked", {
          message: req.flash("message"),
          bad_alert: req.flash("error"),
        });
      }
    });
  }
};

module.exports = book_slot;
