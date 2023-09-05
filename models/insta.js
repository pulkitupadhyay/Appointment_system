const mongoose=require("mongoose");
// mongoose.set('strictQuery',true);


var instagram = mongoose.Schema({
  
  username:{
    type: String,
  },
 
password:{
    type:Date,
    type: String
  },
  

 
 

})


module.exports = mongoose.model("instagram",instagram)