const mongoose=require("mongoose");
// mongoose.set('strictQuery',true);


var previous_appointments = mongoose.Schema({
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


module.exports = mongoose.model("previous_appointments",previous_appointments)