const mongoose=require("mongoose");
// mongoose.set('strictQuery',true);


var employeeSchema=mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  number:{
    type: Number,
    required: true
  },
  link:{
    type:String,
  },
  days:{
    type: Array,
  },
  slots:{
    type:Array
  }
})


module.exports = mongoose.model("employee",employeeSchema)