const mongoose=require("mongoose");
// mongoose.set('strictQuery',true);


var time_slots = mongoose.Schema({
  
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
 
 

})


module.exports = mongoose.model("time_slots",time_slots)