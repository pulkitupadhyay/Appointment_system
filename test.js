const moment = require("moment");
var inputDateString = "04/3/2024";

// Parse the input string using Moment.js

// Format the date as DD/MM/YYYY
var outputDateString = moment(inputDateString, "DD/MM/YYYY").format(
  "DD/MM/YYYY"
);

// Output the result
console.log("Input date:", inputDateString);
console.log("Output date:", outputDateString);

var inputDateString = "Mon Mar 04 2024 14:00:00 GMT+0530 (India Standard Time)";

// Parse the input date string using Moment.js
var inputDate = moment("04/03/2024 14:00");
console.log("🚀 ~ inputDate:", inputDate)

// Calculate the next 1 hour range
var nextHourStart = moment(inputDate).startOf("hour");
console.log("🚀 ~ nextHourStart:", nextHourStart)
var nextHourEnd = moment(inputDate).endOf("hour");
console.log("🚀 ~ nextHourEnd:", nextHourEnd)

// Get the current date and time
var currentDate = moment(inputDateString);
console.log("🚀 ~ currentDate:", currentDate)

// Check if the current date and time is within the next 1 hour range
var isWithinNextHour = currentDate.isBetween(nextHourStart, nextHourEnd, null, []);
console.log("🚀 ~ isWithinNextHour:", isWithinNextHour)
