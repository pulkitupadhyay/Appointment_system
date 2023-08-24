const express=require('express')
const router=express.Router()
const user_scheema = require('./../models/user_module')
const employee_scheema = require('./../models/employee_module')
const time_slot = require('./../models/time_slots')
const appointment_requests = require('./../models/appointment_requests')
// const appointment_requests = require('./../models/appointment_requests')

const schedule = require('node-schedule');
const nodemailer = require('nodemailer')


async function delete_expired_slots(){

   
    const currentDate = new Date();
const isoString = currentDate.toISOString().split('T')[0] + 'T00:00:00.000+00:00';
console.log(isoString);

// const currentDate = new Date();
const hours = String(currentDate.getHours()).padStart(2, '0');
const minutes = String(currentDate.getMinutes()).padStart(2, '0');
const currentTime = `${hours}:${minutes}`;

var slots_came_from_database = await time_slot.find({ from_date: { $lt: isoString}  })
    // console.log(slots_came_from_database)



        for(var i=0; i<slots_came_from_database.length; i++){

           
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
 
    

}

router.post('/fake_login',async(req,res,next)=>{

    var slot_id = req.body.slot_id;
    // var user_id = req.body.user_id;
    var employee_id = req.body.employee_id

    res.render('fake_user_login',{slot_id,employee_id})
})



// delete_expired_slots();


schedule.scheduleJob('1 */1 * * *', () => {
    console.log("This schaduler will run every 1 hour and one minut ")
    delete_expired_slots();
  });
  

  async function sendMail(to, subject,text, html){
    var config = {
        service: 'gmail',
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
      
        // console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
    main1();


  }

 



// get user login and register page

    // router.get('/user_login',(req,res,next)=>{
    //     res.render('user_login')
    // })

// get employee login and register page

router.get('/employee_login', (req,res,next)=>{
    res.render('employee_login')
})

// post route for user`s signup 

router.post('/user_signUp', async (req,res,next)=>{

    // console.log(req.body)
    var user_name = req.body.userName
    var user_email = req.body.userEmail
    var user_number = req.body.userNumber
    var user_password = req.body.userPassword

    let new_user = new user_scheema({
        name:user_name,
        email: user_email,
        password: user_password,
        number:user_number

    })
var user;
    new_user.save().then(async function(dets){
     console.log('registerd')
      
     try {
        var user1 = await user_scheema.findOne({ email: new_user.email });
        console.log('user saved', user1);
    
        user=user1
        console.log(user) 
        var slot_id = req.body.slot_id;
var employee_id = req.body.employee_id;




res.cookie('user_email', new_user.email);


res.render('final_slot_book' ,{slot_id,employee_id,user}) 
    
    } catch (error) {
        console.error('Error:', error);
      }
    })


    



})

// post route for user`s login
// router.post('/user_login', async (req,res,next) => {
    
    
    
//     var user_email = req.body.user_email
//     var user_pass = req.body.user_password

//     if( !user_email || !user_pass){
//         res.send('please provide email and password , seems like you diddent enterd one of em ')
//     }
// var new_user = await user_scheema.findOne({email: user_email})


// if(!new_user){
//         res.send('please enter a valid email addres or sign up if you diddent ')

//     }
//     else if(user_pass !== new_user.password){
//         res.send('please provide correct  email or  password , seems like you enterd wrong cridentials  ')

//     } else if(user_pass === new_user.password){
//         res.cookie('user_email', new_user.email);

// var accepted_appintments = await appointment_requests.find({ userID : new_user._id , accepted: true})
// var appointment_requests1 = await appointment_requests.find({ userID : new_user._id , accepted: false})
       
//         // var time_slots = await time_slot.find({ _id: accepted_appintments.time_slotId})



//         var appointment_timeslot = []
//         var appointment_timeslot_for_accepted_reqests = []
        
//         for(var i=0 ; i< appointment_requests1.length; i++){
        
//         var app_time_slot = await time_slot.findOne({ _id : (appointment_requests1[i].time_slotId).trim() })
//         appointment_timeslot.push(app_time_slot)
        
        
//         }
//         for(var i=0 ; i< accepted_appintments.length; i++){
        
//             var app_time_slot = await time_slot.findOne({ _id : (accepted_appintments[i].time_slotId).trim() })
//             appointment_timeslot_for_accepted_reqests.push(app_time_slot)
            
            
//             }


          
                      


// var appointment_employee = [];
// var accepted_employee = [];



// for(var i=0; i< appointment_requests1.length; i++){

//     var employee = await employee_scheema.findOne({ _id: appointment_requests1[i].employeeID})

//     appointment_employee.push(employee)
// }

// for(var i=0; i< accepted_appintments.length; i++){

//     var employee = await employee_scheema.findOne({ _id: accepted_appintments[i].employeeID})

//     accepted_employee.push(employee)
// }




// var appointment_timeslot = []
// var appointment_timeslot_for_accepted_reqests = []

// for(var i=0 ; i< appointment_requests1.length; i++){

// var app_time_slot = await time_slot.findOne({ _id : (appointment_requests1[i].time_slotId).trim() })
// appointment_timeslot.push(app_time_slot)


// }
// for(var i=0 ; i< accepted_appintments.length; i++){

//     var app_time_slot = await time_slot.findOne({ _id : (accepted_appintments[i].time_slotId).trim() })
//     appointment_timeslot_for_accepted_reqests.push(app_time_slot)
    
    
//     }




// var accepted_timeslots = [];
// var requested_timeslots = [];

// for(var i=0; i< accepted_appintments.length; i++){

// var slot = await time_slot.findOne({ _id : (accepted_appintments[i].time_slotId).trim() })

// accepted_timeslots.push(slot)


// }


// for(var i=0; i< appointment_requests1.length; i++){

//     var slot = await time_slot.findOne({ _id : (appointment_requests1[i].time_slotId).trim() })
    
//     requested_timeslots.push(slot)
    
    
//     }
    
    



//         res.cookie('user_email', new_user.email);

//         res.render('user_home',{ requested_timeslots, accepted_timeslots,  new_user,appointment_requests1, accepted_employee ,appointment_employee,accepted_employee,appointment_timeslot,accepted_appintments,appointment_timeslot_for_accepted_reqests})



//     }




// })

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

     
      res.redirect('/employee_login')
    })

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



        res.cookie('employee_email', new_employee.email);

        res.render('employee_home',{new_employee,time_slots,appointment_requests1, accepted_users ,appointment_users,appointment_timeslot,accepted_appintments,appointment_timeslot_for_accepted_reqests})
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
    res.send('saved!!!!!!!!!!!!!!!!!!!!!!!!!!!')

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

var to1 = employee.email
var subject1 = "Appointment Booked : You`ve got an appointment"
var text1 = `Hey ${employee.name} This mail is to inform you that your appointment is booked with ${user.name}  on ${ formattedDate} AT ${TS.time} . Please login in your employee account to accept or reject the appointment.`
var html1 = `<p style="font-size:1rem;   ">Hey ${employee.name} <br> This mail is to inform you that  your appointment is booked with ${user.name} <br> 
Here are the deteails <br> Date  : ${ formattedDate} <br> Time  :  ${TS.time} <br> Messege for you : ${new_appointment_request.text}. <br> Please login in your employee account to know more .</p>`

sendMail(to1, subject1,text1, html1);

var to2 = user.email
var subject2 = "Appointment Booked : You`ve got an appointment"
var text2 = `Hey ${user.name} This mail is to inform you that your appointment is booked with ${employee.name}  on ${ formattedDate} AT ${TS.time} . Please login in your employee account to accept or reject the appointment.`
var html2 = `<p style="font-size:1rem;   ">Hey ${user.name} <br> This mail is to inform you that  your appointment is booked with ${employee.name} <br> 
Here are the deteails <br> Date  : ${ formattedDate} <br> Time  :  ${TS.time}  <br> Please be on time and be petint if employee gets late . <br> Best Of Luck <br> Swaayatt Robots Pvt.Ltd. </p>`
sendMail(to2, subject2,text2, html2);


res.render('after_slot_booked')
    })

    })


// router.post('/accept_request', async (req,res,next)=>{
       
//        var appointment = await appointment_requests.findOne({ _id:req.body.slotId_to_update})
//        var employee = await employee_scheema.findOne({ _id: appointment.employeeID})
//        var user = await user_scheema.findOne({_id: appointment.userID})
//        var TS = await time_slot.findOne({_id: appointment.time_slotId.trim()})
       
//         await appointment_requests.findOneAndUpdate(
//             { _id: req.body.slotId_to_update }, // Conditions to find the document
//             { $set: { 
//                 accepted:true,
            
//             }} // Update operation
//              // Return the updated document
//           );


//           await time_slot.findOneAndUpdate(
//             { _id: req.body.slotId_of_slot.trim() }, // Conditions to find the document
//             { $set: { 
//                 occupied:true,
            
//             }} // Update operation
//              // Return the updated document
//           );

      



//           const inputDate = new Date(TS.from_date ); 
    
          
//           const day = inputDate.getDate().toString().padStart(2, '0'); 
//           const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');  
//           const year = inputDate.getFullYear().toString().slice(-2); 
           
//        const formattedDate = `${day}/${month}/20${year}`; 
  
//   // to, subject,text, html
  
//   var to = user.email
//   var subject = "Appointment Request Accepted: Congratulations "
//   var text = `Hey ${user.name} This mail is to inform you that ${employee.name} has accepted your  apointment request  on ${ formattedDate} AT ${TS.time} . Please login in your user  account to accept or reject the appointment.`
//   var html = `<p style="font-size:1rem;   ">Hey ${user.name} <br> This mail is to inform you that ${employee.name} has accepted your  apointment request  <br> 
//   Here are the deteails <br> Date Of appointment : ${ formattedDate} <br> Time  :  ${TS.time} <br> Messege for you : ${appointment.text}. <br> Please Be on time and be petieint if the employee is Late for some resons <br> Thanks and regards <br> Swaayatt Robots Pvt Ltd.</p>`
  
//   sendMail(to, subject,text, html);
  
  



//           res.send('acceptedd......')
//     })

// router.post('/Reject_request', async (req,res,next)=>{
    // await appointment_requests.findOneAndDelete({ _id : req.body.slotId_to_update})


    // res.send('deleted')
// })


router.get("/",(req,res)=>{
    res.redirect('/employee_login')
})






module.exports=router;