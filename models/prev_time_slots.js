const mongoose=require("mongoose");
// mongoose.set('strictQuery',true);


var prev_time_slots = mongoose.Schema({
  
  employeeID:{
    type: String,
    required: true
  },
 
  from_date:{
    type:Date
  },
  time:{
    type: String
  },
  occupied:{
    type: Boolean,
    default: false
  },

 
 

})


module.exports = mongoose.model("prev_time_slots",prev_time_slots)