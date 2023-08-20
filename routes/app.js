const express=require('express')
const router=express.Router()
const user_scheema = require('./../models/user_module')
const employee_scheema = require('./../models/employee_module')
const time_slot = require('./../models/time_slots')
const appointment_requests = require('./../models/appointment_requests')
// const appointment_requests = require('./../models/appointment_requests')




// get user login and register page

router.get('/user_login',(req,res,next)=>{
    res.render('user_login')
})

// get employee login and register page

router.get('/employee_login', (req,res,next)=>{
    res.render('employee_login')
})

// post route for user`s signup 

router.post('/user_signUp', async (req,res,next)=>{

    console.log(req.body)
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

    new_user.save().then(function(dets){
        res.cookie('user_email', new_user.email);

     
      res.redirect('/user_login')
    })

})

// post route for user`s login
router.post('/user_login', async (req,res,next) => {
    
    
    
    var user_email = req.body.user_email
    var user_pass = req.body.user_password

    if( !user_email || !user_pass){
        res.send('please provide email and password , seems like you diddent enterd one of em ')
    }
var new_user = await user_scheema.findOne({email: user_email})


if(!new_user){
        res.send('please enter a valid email addres or sign up if you diddent ')

    }
    else if(user_pass !== new_user.password){
        res.send('please provide correct  email or  password , seems like you enterd wrong cridentials  ')

    } else if(user_pass === new_user.password){
        res.cookie('user_email', new_user.email);

var accepted_appintments = await appointment_requests.find({ userID : new_user._id , accepted: true})
var appointment_requests1 = await appointment_requests.find({ userID : new_user._id , accepted: false})
       
        // var time_slots = await time_slot.find({ _id: accepted_appintments.time_slotId})



        var appointment_timeslot = []
        var appointment_timeslot_for_accepted_reqests = []
        
        for(var i=0 ; i< appointment_requests1.length; i++){
        
        var app_time_slot = await time_slot.findOne({ _id : (appointment_requests1[i].time_slotId).trim() })
        appointment_timeslot.push(app_time_slot)
        
        
        }
        for(var i=0 ; i< accepted_appintments.length; i++){
        
            var app_time_slot = await time_slot.findOne({ _id : (accepted_appintments[i].time_slotId).trim() })
            appointment_timeslot_for_accepted_reqests.push(app_time_slot)
            
            
            }


          
                      


var appointment_employee = [];
var accepted_employee = [];



for(var i=0; i< appointment_requests1.length; i++){

    var employee = await employee_scheema.findOne({ _id: appointment_requests1[i].employeeID})

    appointment_employee.push(employee)
}

for(var i=0; i< accepted_appintments.length; i++){

    var employee = await employee_scheema.findOne({ _id: accepted_appintments[i].employeeID})

    accepted_employee.push(employee)
}




var appointment_timeslot = []
var appointment_timeslot_for_accepted_reqests = []

for(var i=0 ; i< appointment_requests1.length; i++){

var app_time_slot = await time_slot.findOne({ _id : (appointment_requests1[i].time_slotId).trim() })
appointment_timeslot.push(app_time_slot)


}
for(var i=0 ; i< accepted_appintments.length; i++){

    var app_time_slot = await time_slot.findOne({ _id : (accepted_appintments[i].time_slotId).trim() })
    appointment_timeslot_for_accepted_reqests.push(app_time_slot)
    
    
    }




var accepted_timeslots = [];
var requested_timeslots = [];

for(var i=0; i< accepted_appintments.length; i++){

var slot = await time_slot.findOne({ _id : (accepted_appintments[i].time_slotId).trim() })

accepted_timeslots.push(slot)


}


for(var i=0; i< appointment_requests1.length; i++){

    var slot = await time_slot.findOne({ _id : (appointment_requests1[i].time_slotId).trim() })
    
    requested_timeslots.push(slot)
    
    
    }
    
    



        res.cookie('user_email', new_user.email);

        res.render('user_home',{ requested_timeslots, accepted_timeslots,  new_user,appointment_requests1, accepted_employee ,appointment_employee,accepted_employee,appointment_timeslot,accepted_appintments,appointment_timeslot_for_accepted_reqests})



    }




})

// post route for employee`s signUp

router.post('/employee_signUp', async (req,res,next)=>{

    console.log(req.body)
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

    } else if(employee_pass === new_employee.password){

        var time_slots = await time_slot.find({ employeeID: new_employee._id})
var time_slots1 = time_slots
        time_slots1.sort((a, b) => {
            const dateA = new Date(a.from_date);
            const dateB = new Date(b.from_date);
            return dateA - dateB;
          });
          
          console.log(time_slots1);
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
    appointment_timeslot_for_accepted_reqests.push(app_time_slot)
    
    
    }



        res.cookie('employee_email', new_employee.email);

        res.render('employee_home',{new_employee,time_slots,appointment_requests1, accepted_users ,appointment_users,appointment_timeslot,accepted_appintments,appointment_timeslot_for_accepted_reqests})
    }




})

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


router.get('/book_appointment', async(req,res,next)=>{
 
     var emploies = await employee_scheema.find();
res.render('book_appointment',{emploies})
})


router.get('/employee/:id', async (req,res,next)=>{

    var employee = await employee_scheema.findOne({ _id: req.params.id})
var user = await user_scheema.findOne({ email: req.cookies.user_email})

var time_slots = await time_slot.find({ employeeID: req.params.id})
var time_slots1 = time_slots
        time_slots1.sort((a, b) => {
            const dateA = new Date(a.from_date);
            const dateB = new Date(b.from_date);
            return dateA - dateB;
          });



    res.render('with_perticuler_employee',{ employee, user, time_slots})

})


router.post('/book_slot', async (req,res,next)=>{

    var new_appointment_request = new appointment_requests({
        userID: req.body.user_id,
        employeeID: req.body.employee_id,
        text: req.body.text_associated,
        time_slotId: req.body.slot_id

    })




    new_appointment_request.save().then(()=>{

 res.send('appointment requested please wait while the employee aproove the request  ')

    })

    })


    router.post('/accept_request', async (req,res,next)=>{
        await appointment_requests.findOneAndUpdate(
            { _id: req.body.slotId_to_update }, // Conditions to find the document
            { $set: { 
                accepted:true,
            
            }} // Update operation
             // Return the updated document
          );
      
          res.send('acceptedd......')
    })

router.post('/Reject_request', async (req,res,next)=>{
    await appointment_requests.findOneAndDelete({ _id : req.body.slotId_to_update})


    res.send('deleted')
})


router.get("/",(req,res)=>{
    res.render('home')
})






module.exports=router;