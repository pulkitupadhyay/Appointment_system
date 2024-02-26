const appointment_requests = require('./../../models/appointment_requests')


const employee_scheema = require('./../../models/employee_module')
const user_scheema = require('./../../models/user_module')
const time_slot = require('./../../models/user_module')
const sendMail = require('./../other_functions/sendMail')


const delete_apppointment = async (req, res, next) => {

  try {
    
    var appRpf = await appointment_requests.findOne({ _id: req.body.app_id });
    var employee = await employee_scheema.findOne({ _id: appRpf.employeeID });
    var user = await user_scheema.findOne({ _id: appRpf.userID });
    var TS = await time_slot.findOneAndUpdate(
      { _id: appRpf.time_slotId },
      {
        $set: {
          occupied: false,
        },
      }
    );
  
    const inputDate = new Date(TS.from_date);
  
    const day = inputDate.getDate().toString().padStart(2, "0");
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
    const year = inputDate.getFullYear().toString().slice(-2);
  
    const formattedDate = `${day}/${month}/20${year}`;
    // *************************for sending mail of cencelation ****************
  
    var to1 = employee.email;
    var subject1 = "Appointment Canceled !! ";
    var text1 = `Hey ${employee.name} This mail is to inform you that your appointment  with ${user.name}
   on ${formattedDate} AT ${TS.time} is canceled. Please contact the hr in case of any queries.`;
    var html1 = `<p style="font-size:1rem;   ">Hey ${employee.name} <br> This mail is to inform you that  your 
  appointment  with ${user.name} <br> Please contact the HR in case of any queries.
  `;
  
    var to2 = user.email;
    var subject2 = "Appointment Canceled !!";
    var text2 = `Hey ${user.name} This mail is to inform you that your appointment with
   ${employee.name} on ${formattedDate} AT ${TS.time} is canceled. Please contact the HR
    in case of any queries.`;
    var html2 = `<p style="font-size:1rem;   ">Hey ${user.name} <br> This mail is to inform you that  your appointment with ${employee.name} is canceled. <br> 
   <br> Please contact the Hr in case of any queries. <br> Best Of Luck <br> Swaayatt Robots Pvt.Ltd. </p>`;
    sendMail(to2, subject2, text2, html2);
  
    sendMail(to1, subject1, text1, html1);
    sendMail(to2, subject2, text2, html2);
  
    await appointment_requests.findOneAndDelete({ _id: req.body.app_id });

    req.flash('message','Deleted!!')
    res.redirect("/hr_dashbord");
  } catch (error) {
    req.flash('error','Something Went Wrong!!!!')
    res.redirect('/hr_dashbord')
  }

  }

  module.exports = delete_apppointment