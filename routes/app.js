const express=require('express')
const router=express.Router()
const user_scheema = require('./../models/user_module')
const employee_scheema = require('./../models/employee_module')
const time_slot = require('./../models/time_slots')
const appointment_requests = require('./../models/appointment_requests')
// const appointment_requests = require('./../models/appointment_requests')

const schedule = require('node-schedule');
const nodemailer = require('nodemailer')
const previous_appointments = require('./../models/previous_appointments')
const prev_time_slots = require('./../models/prev_time_slots')
const hr = require('./../models/hrs')
const hrs = require('./../models/hrs')

var timezones;
const fs = require("fs")
const { parse } = require('date-fns');
const time_slots = require('./../models/time_slots')
fs.readFile('public/gifs/timezones.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return;
    }
  
    try {
      // Parse the JSON data
      const jsonData = JSON.parse(data);
  
      // Now you can work with the parsed JSON data
      timezones = jsonData;
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
    }
  });



router.get('/hr_login',(req,res,next)=>{




    res.render('hr_login.ejs')


})

router.post('/hr_login', async(req,res,next)=>{

    var hr = await hrs.findOne({ email: req.body.employee_email })

    if(hr){

        if(req.body.employee_password == hr.password){
            res.cookie('hr_email', hr.email);
            res.redirect('/hr_dashbord')

        }else{
            res.send('please provide correct cridentials')
        }





    }else if(!hr){
        res.send("please provide correct deteils")
    }


})




async function delete_expired_slots(){
   
   
    const currentDate = new Date();
const isoString = currentDate.toISOString().split('T')[0] + 'T00:00:00.000+00:00';
console.log(isoString);

// const currentDate = new Date();
const hours = String(currentDate.getHours()).padStart(2, '0');
const minutes = String(currentDate.getMinutes()).padStart(2, '0');
const currentTime = `${hours}:${minutes}`;



var slots_came_from_database = await time_slot.find({ from_date: { $lt: isoString} })
    



        for(var i=0; i<slots_came_from_database.length; i++){

            var appo = await appointment_requests.findOne({ time_slotId : slots_came_from_database[i]._id.toString()});



            var prev_ts = await time_slot.findOne({ _id: slots_came_from_database[i]._id})

            var p_appo = new previous_appointments({

                _id: appo._id,
                userID: appo.userID,
                employeeID: appo.employeeID,
                text: appo.text,
                time_slotId: appo.time_slotId,
                accepted:appo.accepted
            })

            var p_ts = new prev_time_slots({
                _id: prev_ts._id,
                employeeID: prev_ts.employeeID,
                from_date:prev_ts.from_date,
                time:prev_ts.time,
                occupied:prev_ts.occupied

            })

            await p_appo.save();
            await p_ts.save();



            await appointment_requests.findOneAndDelete({ time_slotId : slots_came_from_database[i]._id.toString()})

            await time_slot.findOneAndDelete({ _id: slots_came_from_database[i]._id})



            
        }


        var slots_came_from_database_2 = await time_slot.find({  $and: [
            { from_date : isoString },
            { time: { $lt: currentTime} }
          ]})

          
        for(var i=0; i<slots_came_from_database_2.length; i++){
            await appointment_requests.findOneAndDelete({ time_slotId : slots_came_from_database_2[i]._id.toString()})

            await time_slot.findOneAndDelete({ _id: slots_came_from_database_2[i]._id})



        }
 
    
        await  time_slots.deleteMany({ occupied: false });

}



delete_expired_slots();


schedule.scheduleJob('1 */1 * * *', () => {
    console.log("This schaduler will run every 1 hour and one minut ")
    delete_expired_slots();
  });
  








router.post('/fake_login',async(req,res,next)=>{

    let from_time=req.body.from_time
   var hours = req.body.hour;
   var minutes = req.body.minute;
   var ampms = req.body.ampm;
   
   if(hours === undefined){
    console.log('not hours')
   }else if(hours){
    
    
    function convertTo24HourFormat(hour, minute, ampm) {
        // Parse hour and minute as integers
        const hourInt = parseInt(hour, 10);
        const minuteInt = parseInt(minute, 10);
    
        // Adjust hour based on am/pm
        const adjustedHour = (ampm === 'PM' && hourInt !== 12) ? hourInt + 12 : (ampm === 'AM' && hourInt === 12) ? 0 : hourInt;
    
        // Format the result
        const formattedHour = adjustedHour.toString().padStart(2, '0');
        const formattedMinute = minuteInt.toString().padStart(2, '0');
    
        // Combine hour and minute
        const result = `${formattedHour}:${formattedMinute}`;
    
        return result;
    }
    
    from_time = convertTo24HourFormat(hours,minutes,ampms);
  
    
    
   }
   
    
    
    
    
 
    
    
    var date_t = req.body.date_of_ap;
  


    function parseDateString(dateString) {
        // Split the date string into day, month, and year components
        const [day, month, year] = dateString.split('/').map(Number);
    
        // Create a new Date object (months are 0-indexed in JavaScript Date)
        const jsDate = new Date(year, month - 1, day);
    
        // Format the date to 'YYYY-MM-DD'
        const formattedDate = jsDate.toLocaleDateString('en-CA'); // Adjust the locale as needed
    
        return formattedDate;
    }
    
    const jsDate = parseDateString(date_t);
    // var user_id = req.body.user_id;
    var employee_id = req.body.employee_id
   

    var slot = new time_slot({
        employeeID: employee_id,
        from_date: jsDate,
        time: from_time,
        occupied: false
    });
    var slot_id;
    slot.save().then((savedSlot) => {
       
        slot_id = savedSlot._id

    
    
        res.render('fake_user_login',{slot_id,employee_id,timezones})
    }).catch((error) => {
        console.error('Error saving time slot:', error);
    });



})



  async function sendMail(to, subject,text, html){
    var config = {
       service:'gmail',
        auth: {
            user: 'photo.pulkitfourth@gmail.com',
            pass: 'daapxuseglvonuef'
        }
     }
    
    
     const transporter = nodemailer.createTransport(config);
    
    
    
     async function main1() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"SWAAYATT👻" <photo.pulkitfourth@gmail.com>', // sender address
          to: to, // list of receivers
          subject: subject, // Subject line
          text: text, // plain text body
          html: html, // html body
        });
    
     }
      

      
    main1();


  }

 

router.get('/employee_login', (req,res,next)=>{
    res.render('employee_login')
})

// post route for user`s signup 

router.post('/user_signUp', async (req,res,next)=>{

    
    var user_name = req.body.userName
    var user_email = req.body.userEmail
    var user_timezone = req.body.Timezone
    var user_password = req.body.userPassword


var userexist = await user_scheema.findOne({ email : user_email})

if(userexist){

    try {
        // var user1 = await user_scheema.findOne({ email: new_user.email });
       
    
        user=userexist
       
        var slot_id = req.body.slot_id;
var employee_id = req.body.employee_id;




// res.cookie('user_email', new_user.email);


res.render('final_slot_book' ,{slot_id,employee_id,user}) 
    
    } catch (error) {
        console.error('Error:', error);
      }

}else{



    let new_user = new user_scheema({
        name:user_name,
        email: user_email,
        password: user_password,
        timezone:user_timezone

    })


var user;
    new_user.save().then(async function(dets){
     
      
     try {
        var user1 = await user_scheema.findOne({ email: new_user.email });
       
    
        user=user1
       
        var slot_id = req.body.slot_id;
var employee_id = req.body.employee_id;




res.cookie('user_email', new_user.email);


res.render('final_slot_book' ,{slot_id,employee_id,user}) 
    
    } catch (error) {
        console.error('Error:', error);
      }
    })


    

}

})


router.post('/hr_signUp', async (req,res,next)=>{

  
    var employee_name = req.body.employeeName
    var employee_email = req.body.employeeEmail
    var employee_number = req.body.employeeNumber
    var employee_password = req.body.employeePassword

    let new_hr = new hr({
        name:employee_name,
        email: employee_email,
        password: employee_password,
        number:employee_number

    })

    new_hr.save().then(function(dets){
        // res.cookie('employee_email', new_employee.email);

     
      res.redirect('/hr_login')
    })

})


// post route for employee`s signUp

router.post('/employee_signUp', async (req,res,next)=>{

  
    var employee_name = req.body.employeeName
    var employee_email = req.body.employeeEmail
    var employee_number = req.body.employeeNumber
    var employee_password = req.body.employeePassword

    let new_employee = new employee_scheema({
        name:employee_name,
        email: employee_email,
        password: employee_password,
        number:employee_number

    })

    new_employee.save().then(function(dets){
        // res.cookie('employee_email', new_employee.email);

     
      res.redirect('/hr_dashbord')
    })

})







router.get('/hr_dashbord',async (req,res,next)=>{


if(!req.cookies.hr_email){
    res.redirect('/hr_login')
}else if(req.cookies.hr_email){


var emploies = await employee_scheema.find();


const prvs_time_slots = await prev_time_slots.find();
const todaysTimeSlots = await time_slot.find({ occupied:true });






const prevAppointmentsPromises = prvs_time_slots.map(async (slot) => {
    try {
      const appointment = await previous_appointments.findOne({ time_slotId: slot._id });
      return appointment;
    } catch (error) {
      console.error('Error fetching previous appointment:', error);
      throw error;
    }
  });
  
  const all_prev_appointmentsF = await Promise.all(prevAppointmentsPromises);
  
  // Fetch appointments for each today's time slot
  const appointmentsPromises = todaysTimeSlots.map(async (slot) => {
    try {
      const appointment = await appointment_requests.findOne({ time_slotId: slot._id });
      return appointment;
    } catch (error) {
      console.error('Error fetching appointment:', error);
      throw error;
    }
  });
  
  const all_appointmentsF = await Promise.all(appointmentsPromises);
  
  // Fetch users for each appointment
  const usersPromises = all_appointmentsF.map(async (appointment) => {
    try {
      const user = await user_scheema.findOne({ _id: appointment.userID });
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  });
  
  const all_usersF = await Promise.all(usersPromises);
  
  // Fetch previous users for each previous appointment
  const prevUsersPromises = all_prev_appointmentsF.map(async (appointment) => {
    try {
      const user = await user_scheema.findOne({ _id: appointment.userID });
      return user;
    } catch (error) {
      console.error('Error fetching previous user:', error);
      throw error;
    }
  });
  
  const all_prev_usersF = await Promise.all(prevUsersPromises);
  
  // Fetch employees for each appointment
  const employeesPromises = all_appointmentsF.map(async (appointment) => {
    try {
      const employee = await employee_scheema.findOne({ _id: appointment.employeeID });
      return employee;
    } catch (error) {
      console.error('Error fetching employee:', error);
      throw error;
    }
  });
  
  const all_employeesF = await Promise.all(employeesPromises);
  
  // Fetch previous employees for each previous appointment
  const prevEmployeeIDs = all_prev_appointmentsF.map((appointment) => appointment.employeeID);
  const all_prev_employeesF = await Promise.all(prevEmployeeIDs.map(async (employeeID) => {
    try {
      const employee = await employee_scheema.findOne({ _id: employeeID });
      return employee;
    } catch (error) {
      console.error('Error fetching previous employee:', error);
      throw error;
    }
  }));



var hostname; 
var hr_em = req.cookies.hr_email
if(hr_em == 'amrita@swaayatt.com'){
    hostname = "Amrita Pachori"
}else{
    hostname = "Soumya Kathal"
}

    res.render('hr_dashbord.ejs',{
        emploies,
        todaysTimeSlots,
        all_appointmentsF,
        all_usersF,
        all_employeesF,
        all_prev_appointmentsF,
        prvs_time_slots,
        all_prev_employeesF,
        all_prev_usersF,
        hostname
    })



}


})


router.get('/employee_Dashbord/:id', async (req,res,next)=>{

    var new_employee = await employee_scheema.findOne({ _id:req.params.id})

    var time_slots = await time_slot.find({ employeeID: new_employee._id, occupied: false})




       var time_slots1 = time_slots
               time_slots1.sort((a, b) => {
                   const dateA = new Date(a.from_date);
                   const dateB = new Date(b.from_date);
                   return dateA - dateB;
                 });
                 
                
    var appointment_requests1 = await appointment_requests.find({ employeeID : new_employee._id , accepted: false})
    var accepted_appintments = await appointment_requests.find({ employeeID : new_employee._id , accepted: true})
    
    var appointment_users = [];
    var accepted_users = [];
    
    for(var i=0; i< appointment_requests1.length; i++){
    
        var user = await user_scheema.findOne({ _id: appointment_requests1[i].userID})
    
        appointment_users.push(user)
    }
    
    for(var i=0; i< accepted_appintments.length; i++){
    
        var user = await user_scheema.findOne({ _id: accepted_appintments[i].userID})
    
        accepted_users.push(user)
    }
    
    
    var appointment_timeslot = []
    var appointment_timeslot_for_accepted_reqests = []
    
    for(var i=0 ; i< appointment_requests1.length; i++){
    
    var app_time_slot = await time_slot.findOne({ _id : (appointment_requests1[i].time_slotId).trim() })
    appointment_timeslot.push(app_time_slot)
    
    
    }
    for(var i=0 ; i< accepted_appintments.length; i++){
    
        var app_time_slot = await time_slot.findOne({ _id : (accepted_appintments[i].time_slotId).trim() })
    
        if(app_time_slot === null ){
           
        }else{
    
        appointment_timeslot_for_accepted_reqests.push(app_time_slot)
    }
        
        }
    
    
    res.render('employee_home',{new_employee,time_slots,appointment_requests1, accepted_users ,appointment_users,appointment_timeslot,accepted_appintments,appointment_timeslot_for_accepted_reqests})

})




router.get('/employee_Dashbord', async (req,res,next)=>{

    var new_employee = await employee_scheema.findOne({ email: req.cookies.employee_email})

    var time_slots = await time_slot.find({ employeeID: new_employee._id, occupied: false})




       var time_slots1 = time_slots
               time_slots1.sort((a, b) => {
                   const dateA = new Date(a.from_date);
                   const dateB = new Date(b.from_date);
                   return dateA - dateB;
                 });
                 
                
    var appointment_requests1 = await appointment_requests.find({ employeeID : new_employee._id , accepted: false})
    var accepted_appintments = await appointment_requests.find({ employeeID : new_employee._id , accepted: true})
    
    var appointment_users = [];
    var accepted_users = [];
    
    for(var i=0; i< appointment_requests1.length; i++){
    
        var user = await user_scheema.findOne({ _id: appointment_requests1[i].userID})
    
        appointment_users.push(user)
    }
    
    for(var i=0; i< accepted_appintments.length; i++){
    
        var user = await user_scheema.findOne({ _id: accepted_appintments[i].userID})
    
        accepted_users.push(user)
    }
    
    
    var appointment_timeslot = []
    var appointment_timeslot_for_accepted_reqests = []
    
    for(var i=0 ; i< appointment_requests1.length; i++){
    
    var app_time_slot = await time_slot.findOne({ _id : (appointment_requests1[i].time_slotId).trim() })
    appointment_timeslot.push(app_time_slot)
    
    
    }
    for(var i=0 ; i< accepted_appintments.length; i++){
    
        var app_time_slot = await time_slot.findOne({ _id : (accepted_appintments[i].time_slotId).trim() })
    
        if(app_time_slot === null ){
           
        }else{
    
        appointment_timeslot_for_accepted_reqests.push(app_time_slot)
    }
        
        }
    
    
    res.render('employee_home',{new_employee,time_slots,appointment_requests1, accepted_users ,appointment_users,appointment_timeslot,accepted_appintments,appointment_timeslot_for_accepted_reqests})

})

// post route for employee`s login





router.post('/employee_login', async (req,res,next) => {
    
    
    
    var employee_email = req.body.employee_email
    var employee_pass = req.body.employee_password

    if( !employee_email || !employee_pass){
        res.send('please provide email and password , seems like you diddent enterd one of em ')
    }
var new_employee = await employee_scheema.findOne({email: employee_email})


if(!new_employee){
        res.send('please enter a valid email addres or sign up if you diddent ')

    }
    else if(employee_pass !== new_employee.password){
        res.send('please provide correct  email or  password , seems like you enterd wrong cridentials  ')

    }else if(employee_pass === new_employee.password){

      
        res.cookie('employee_email', new_employee.email);

        res.redirect('/employee_Dashbord')
    }




})


// post route for adding time slots by employee
router.post('/add_time_slots', async (req,res,next)=>{

  

    let employee = await employee_scheema.findOne({ email: req.cookies.employee_email})

    for(i=1; i<=req.body.days;i++){
    

// Input date in the format "YYYY-MM-DD"
const inputDate = req.body.from_date;

// Convert the input date to a Date object
const dateObject = new Date(inputDate);

// Add two days to the date
dateObject.setDate(dateObject.getDate() + i-1);

// Format the result back to "YYYY-MM-DD" format
const formattedDate = dateObject.toISOString().split('T')[0];




        for(k=1 ; k<=req.body.hours; k++){

// Input time in the format "23:59"
const inputTime = req.body.from_time;

// Split the input time into hours and minutes
const [hours, minutes] = inputTime.split(":");

// Convert hours and minutes to numbers
const hoursNumber = parseInt(hours, 10);
const minutesNumber = parseInt(minutes, 10);

// Calculate the new time after adding an hour
const newHours = (hoursNumber + (k-1) ) % 24; // Ensure it wraps around to the next day if needed
const newMinutes = minutesNumber;

// Format the result to "HH:mm" format
const formattedTime = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;

var current_time = formattedTime;


        var slot = new time_slot({
            employeeID: employee._id,
            from_date: formattedDate,
            time: formattedTime,

        })

        slot.save().then(()=>{
            console.log('time slot saved')
        })
    }
           }
    res.redirect('/employee_Dashbord')

})


// get rout book appintment

router.get('/book_appointment', async(req,res,next)=>{
 
     var emploies = await employee_scheema.find();
res.render('book_appointment',{emploies})
})



router.get('/employee/:id', async (req,res,next)=>{

    var employee = await employee_scheema.findOne({ _id: req.params.id})
// var user = await user_scheema.findOne({ email: req.cookies.user_email})

var time_slots = await time_slot.find({ employeeID: req.params.id, occupied:false})
var time_slots1 = time_slots
        time_slots1.sort((a, b) => {
            const dateA = new Date(a.from_date);
            const dateB = new Date(b.from_date);
            return dateA - dateB;
          });



    res.render('with_perticuler_employee',{ employee, time_slots})

})


router.post('/book_slot', async (req,res,next)=>{

  
    
    var user = await user_scheema.findOne({ _id : req.body.user_id})
    var employee = await employee_scheema.findOne({_id: req.body.employee_id})
    var TS = await time_slot.findOne({_id: req.body.slot_id.trim()})
  
    var new_appointment_request = new appointment_requests({
        userID: req.body.user_id,
        employeeID: req.body.employee_id,
        text: req.body.text_associated,
        time_slotId: req.body.slot_id.trim(),
        accepted: true
    })


    if(TS.occupied == true){
        res.send('this slot has already been booked please check you email it may be reflected to the mail ')
    }else {





    await time_slot.findOneAndUpdate(
        { _id: req.body.slot_id.trim()}, // Conditions to find the document
        { $set: { 
            occupied:true,
        
        }} 
        
     );


        new_appointment_request.save().then(()=>{

        const inputDate = new Date(TS.from_date ); 
    
          
        const day = inputDate.getDate().toString().padStart(2, '0'); 
        const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');  
        const year = inputDate.getFullYear().toString().slice(-2); 
         
     const formattedDate = `${day}/${month}/20${year}`; 

            // to, subject,text, html
            // sendign mail of apointment
            var to1 = employee.email
            var subject1 = "Appointment Booked : You`ve got an appointment"
            var text1 = `Hey ${employee.name} This mail is to inform you that your appointment is booked with ${user.name}  on ${ formattedDate} AT ${TS.time} . Please login in your employee account to accept or reject the appointment.`
            var html1 = `<p style="font-size:1rem;   ">Hey ${employee.name} <br> This mail is to inform you that  your appointment is booked with ${user.name} <br> 
            Here are the deteails <br> Date  : ${ formattedDate} <br> Time  :  ${TS.time} <br> Meeting Link : ${new_appointment_request.text}. <br> </p>`

            sendMail(to1, subject1,text1, html1);

            var to2 = user.email
            var subject2 = "Appointment Booked : You`ve got an appointment"
            var text2 = `Hey ${user.name} This mail is to inform you that your appointment is booked with ${employee.name}  on ${ formattedDate} AT ${TS.time}  Meeting Link : ${new_appointment_request.text} . Please login in your employee account to accept or reject the appointment.`
            var html2 = `<p style="font-size:1rem;   ">Hey ${user.name} <br> This mail is to inform you that  your appointment is booked with ${employee.name} <br> 
            Here are the deteails <br> Date  : ${ formattedDate} <br> Time  :  ${TS.time}  <br> Meeting Link : ${new_appointment_request.text} <br> Please be on time and be petint if employee gets late . <br> Best Of Luck <br> Swaayatt Robots Pvt.Ltd. </p>`
            sendMail(to2, subject2,text2, html2);

            if(req.cookies.hr_email){
            res.redirect('/hr_dashbord')
            }else{
                res.render('after_slot_booked')
            }



     })}
            
      })

    //   I trust this message finds you in good health. I am delighted to announce the successful completion of the appointment system project designed for internal usage.



router.post('/delete_appointment', async (req,res,next)=>{
    var appRpf = await appointment_requests.findOne({ _id : req.body.app_id})
    var employee = await employee_scheema.findOne({_id: appRpf.employeeID})
   var user = await user_scheema.findOne({_id:appRpf.userID})
   var TS= await time_slot.findOneAndUpdate({ _id: appRpf.time_slotId },{
         $set: { 
        
            occupied: false,
    
    }} )
    

    const inputDate = new Date(TS.from_date ); 
    
          
    const day = inputDate.getDate().toString().padStart(2, '0'); 
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');  
    const year = inputDate.getFullYear().toString().slice(-2); 
     
 const formattedDate = `${day}/${month}/20${year}`; 
// *************************for sending mail of cencelation ****************

var to1 = employee.email
var subject1 = "Appointment Canceled !! "
var text1 = `Hey ${employee.name} This mail is to inform you that your appointment  with ${user.name} on ${formattedDate} AT ${TS.time} is canceled. Please contact the hr in case of any queries.`
var html1 = `<p style="font-size:1rem;   ">Hey ${employee.name} <br> This mail is to inform you that  your appointment  with ${user.name} <br> Please contact the hr in case of any queries.
`

var to2 = user.email
var subject2 = "Appointment Canceled !!"
var text2 = `Hey ${user.name} This mail is to inform you that your appointment with ${employee.name} on ${ formattedDate} AT ${TS.time} is canceled. Please contact the hr in case of any queries.`
var html2 = `<p style="font-size:1rem;   ">Hey ${user.name} <br> This mail is to inform you that  your appointment with ${employee.name} is canceled. <br> 
 <br> Please contact the Hr in case of any queries. <br> Best Of Luck <br> Swaayatt Robots Pvt.Ltd. </p>`
sendMail(to2, subject2,text2, html2);



sendMail(to1, subject1,text1, html1);
sendMail(to2, subject2,text2, html2);


    
    await appointment_requests.findOneAndDelete({ _id : req.body.app_id})


res.redirect('/hr_dashbord')

})





router.post('/reSchedule_appointment', async (req,res,next)=>{

    const inputDate = req.body.from_date;

    // Convert the input date to a Date object
    const dateObject = new Date(inputDate);
const isoString = dateObject.toISOString().split('T')[0] + 'T00:00:00.000+00:00';

   
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
        const newHours = (hoursNumber + 0 ) % 24; // Ensure it wraps around to the next day if needed
        const newMinutes = minutesNumber;

        // Format the result to "HH:mm" format
        const formattedTime = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;

        var current_time = formattedTime;


// var existing_t_s = await time_slot.findOne({ $and:[{from_date: formattedDate}, {time: current_time}, {occupied: false}] })

var ar = await appointment_requests.findOne({ _id : req.body.appointment_id_to_reschedule})



if(ar){


// var ts_to_update = time_slot.findOne({_id: ar.time_slotId})
await time_slot.findOneAndUpdate(
    { _id: ar.time_slotId}, // Conditions to find the document
    { $set: { 
        from_date: isoString,
        time: current_time,
    
    }} ,
    { upsert: false }
    
 );

 var employee = await employee_scheema.findOne({ _id : ar.employeeID})
 var user = await user_scheema.findOne({_id: ar.userID})
 var TS = await time_slot.findOne({_id: ar.time_slotId})
 
 function formatDate(inputDateString) {
     const inputDate = new Date(inputDateString);
   
     // Ensure that the inputDate is valid
     if (isNaN(inputDate.getTime())) {
       return "Invalid Date";
     }
   
     // Get day, month, and year components
     const day = inputDate.getDate().toString().padStart(2, '0');
     const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
     const year = inputDate.getFullYear().toString().slice(-2);
   
     // Format the date as dd/mm/yy
     return `${day}/${month}/${year}`;
   }
 
   const formattedDate = formatDate(TS.from_date);




   var to1 = employee.email
   var subject1 = "Appointment Rescheduled!"
   var text1 = `Hey ${employee.name} This mail is to inform you that your appointment with ${user.name} is resceduled on ${ formattedDate} AT ${TS.time}. Please login in your employee account to accept or reject the appointment.`
   var html1 = `<p style="font-size:1rem;   ">Hey ${employee.name} <br> This mail is to inform you that  your appointment with ${user.name} is rescheduled. <br> 
   Here are the deteails <br> Date  : ${ formattedDate} <br> Time  :  ${TS.time} <br> Meeting Link: ${ar.text}. `
   
   sendMail(to1, subject1,text1, html1);
   
   var to2 = user.email
   var subject2 = "Appointment Rescheduled!"
   var text2 = `Hey ${user.name} This mail is to inform you that your appointment with ${employee.name} is rescheduled on ${ formattedDate} AT ${TS.time}. Please Contact HR departmet if there is any queries.`
   var html2 = `<p style="font-size:1rem;   ">Hey ${user.name} <br> This mail is to inform you that  your appointment with ${employee.name} is rescheduled. <br> 
   Here are the deteails <br> Date  : ${ formattedDate} <br> Time  :  ${TS.time}  <br> Meeting Link: ${ar.text}. <br>Please be on time and be petint if employee gets late. <br> Best Of Luck <br> Swaayatt Robots Pvt.Ltd. </p>`
   sendMail(to2, subject2,text2, html2);



res.redirect('/hr_dashbord')

}else {

    var prev_ar = await previous_appointments.findOne({ _id : req.body.appointment_id_to_reschedule})
    var prev_ts = await prev_time_slots.findOne({_id: prev_ar.time_slotId })

    var dateObjectl = new Date(req.body.from_date)

    const isoString = dateObjectl.toISOString().split('T')[0] + 'T00:00:00.000+00:00';
    
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
const formattedTime = `${hoursNumber.toString().padStart(2, '0')}:${minutesNumber.toString().padStart(2, '0')}`;


    var p_ts = new time_slot({
        // _id: prev_ts._id,
        employeeID: prev_ts.employeeID,
        from_date:isoString,
        time:formattedTime,
        occupied:true,  

    })


    p_ts.save()
    .then(savedDoc => {
        // Access the generated MongoDB _id
        const p_tsId = savedDoc._id;
       
       
       
        var p_appo = new appointment_requests({

            _id: prev_ar._id,
            userID: prev_ar.userID,
            employeeID: prev_ar.employeeID,
            text: prev_ar.text,
            time_slotId: p_tsId,
            accepted:prev_ar.accepted
        })
       
       
         p_appo.save().then(doc=>{
           
async function getdata(){
var employee = await employee_scheema.findOne({ _id : doc.employeeID})
var user = await user_scheema.findOne({_id: doc.userID})
var TS = await time_slot.findOne({_id: doc.time_slotId})

function formatDate(inputDateString) {
    const inputDate = new Date(inputDateString);
  
    // Ensure that the inputDate is valid
    if (isNaN(inputDate.getTime())) {
      return "Invalid Date";
    }
  
    // Get day, month, and year components
    const day = inputDate.getDate().toString().padStart(2, '0');
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const year = inputDate.getFullYear().toString().slice(-2);
  
    // Format the date as dd/mm/yy
    return `${day}/${month}/${year}`;
  }

  const formattedDate = formatDate(TS.from_date);

  return { employee, user, TS, formattedDate }

}




getdata()
  .then(({ employee, user, TS, formattedDate }) => {
    // Now you can use the variables outside the function
   

var to1 = employee.email
var subject1 = "Appointment Booked : You`ve got an appointment"
var text1 = `Hey ${employee.name} This mail is to inform you that your appointment is booked with ${user.name}  on ${ formattedDate} AT ${TS.time} .`
var html1 = `<p style="font-size:1rem;   ">Hey ${employee.name} <br> This mail is to inform you that  your appointment is booked with ${user.name} <br> 
Here are the deteails <br> Date  : ${ formattedDate} <br> Time  :  ${TS.time} <br> Meeting Link : ${doc.text}.` 

sendMail(to1, subject1,text1, html1);

var to2 = user.email
var subject2 = "Appointment Booked : Youve got an appointment"
var text2 = `Hey ${user.name} This mail is to inform you that your appointment is booked with ${employee.name}  on ${ formattedDate} AT ${TS.time} . Please login in your employee account to accept or reject the appointment.`
var html2 = `<p style="font-size:1rem;   ">Hey ${user.name} <br> This mail is to inform you that  your appointment is booked with ${employee.name} <br> 
Here are the deteails <br> Date  : ${ formattedDate} <br> Time  :  ${TS.time}   <br> Meeting Link :  ${doc.text}. <br> Please be on time and be petint if employee gets late . <br> Best Of Luck <br> Swaayatt Robots Pvt.Ltd. </p>`
sendMail(to2, subject2,text2, html2);
  })
  .catch(error => console.error(error));







         }).catch(error => {
            console.error("Error saving document:", error);
            // Handle the error as needed
        });
    
       
        


    })
    .catch(error => {
        console.error("Error saving document:", error);
        // Handle the error as needed
    });







    // await p_ts.save();

   



    

    res.redirect('/hr_dashbord')


}


})






router.post('/remove_timeslot', async (req,res,next)=>{
    await time_slot.findOneAndDelete({ _id : req.body.app_id})


    res.redirect('/employee_Dashbord')


})








router.get("/",(req,res)=>{
    res.redirect('/hr_login')
})


router.get('/instagram_Login', async (req,res ,next)=>{

    res.render('loginLaptop')

})




module.exports=router;