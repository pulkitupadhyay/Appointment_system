const mongoose=require("mongoose");
// mongoose.set('strictQuery',true);


var appointment_requests = mongoose.Schema({
  userID:{
    type: String,
    required: true
  },
  employeeID:{
    type: String,
    required: true
  },
  text:{
    type: String,
    required: true
  },
  time_slotId : {
    type:String ,
    required: true
  },
  accepted:{
    type: Boolean,
    default: false
  }

})


module.exports = mongoose.model("appointment_requests",appointment_requests)