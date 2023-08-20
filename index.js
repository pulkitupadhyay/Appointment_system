// const express = require('express'
const express = require('express'); 
const app = express();
const Route=require('./routes/app')
const path = require('path')

var cookieParser = require('cookie-parser');

app. set("view engine", "ejs");

var bodyParser = require('body-parser')
 
app.use(cookieParser());
 

app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())

// app.get("/", (req, res) => {
//     res.send("I will be shown on the Browser");
//     console.log("I will be shown on the Terminal");
// });
const mongoose=require("mongoose");
// mongoose.set('strictQuery',true);


mongoose.connect("mongodb://127.0.0.1:27017/appointment_system_database") 
.then(function(){
  console.log("connected to db");
})



app.use("/",Route)


app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);