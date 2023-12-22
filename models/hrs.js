const mongoose=require("mongoose");
// mongoose.set('strictQuery',true);


var hrSchema=mongoose.Schema({
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
  }
})


module.exports = mongoose.model("hr",hrSchema)