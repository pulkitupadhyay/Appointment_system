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






app.use("/",Route)


app.use(express.static(path.join(__dirname, 'public')));




mongoose.connect("mongodb+srv://pulkit_ji:shraddhap@cluster0.xbds8cy.mongodb.net/appointment_systems_database?retryWrites=true&w=majority") 
.then(function(){

  console.log("connected to db");
  app.listen(process.env.port || 3000, ()=>{
    console.log('Listening on port')
  });

})
