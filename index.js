// const express = require('express'
require('dotenv').config();
const express = require("express");
const app = express();
const Route = require("./routes/app");
const path = require("path");
const appointment_requests = require('./models/appointment_requests')
const users = require('./models/user_module')
const employees = require('./models/employee_module')
const schedule = require("node-schedule");
const time_slot= require('./models/time_slots')
// var logger = require('morgan');
const session = require('express-session')
const flush = require('connect-flash')

var cookieParser = require("cookie-parser");
const del = require("./routes/other_functions/del_ex_func");

app.set("view engine", "ejs");

var bodyParser = require("body-parser");

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());



app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  maxAge: 3000,

 
}));
app.use(flush())

// app.get("/", (req, res) => {
//     res.send("I will be shown on the Browser");
//     console.log("I will be shown on the Terminal");

// });


app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error.ejs',  {message: req.flash('message'),
    bad_alert: req.flash('error')});
  });
  


const mongoose = require("mongoose");
const sendMailcc = require("./routes/other_functions/send_mail_cc");
// mongoose.set('strictQuery',true);

app.use("/", Route);

app.use("/gifs", express.static(__dirname + "public/gifs"));
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(function () {
    console.log("connected to db");
    del();
    app.listen(process.env.port || 4000, "0.0.0.0", () => {
      console.log("Listening on port");

     
      


    });
  });
