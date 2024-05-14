const mongoose=require("mongoose");
// mongoose.set('strictQuery',true);


var userSchema=mongoose.Schema({
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
  }
})


module.exports = mongoose.model("user",userSchema)