function cal_func() {
  let e = 0,
    t = document.getElementById("calendar");
  document.getElementById("newEventModal"),
    document.getElementById("deleteEventModal"),
    document.getElementById("modalBackDrop"),
    document.getElementById("eventTitleInput");
  let n = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  function ii() {
    let i = new Date();
    i.setDate(1);
    i.setMonth(new Date().getMonth() + e);



    let o = i.getMonth();
    let d = i.getFullYear();
    // console.log('this is o',o);
    (i.getMonth() + 1).toString().padStart(2, "0");
    let a = new Date(d, o, 1),
      l = new Date(d, o + 1, 0).getDate(),

      r = a.toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }),
      s = n.indexOf(r.split(", ")[0]);



    (document.getElementById(
      "monthDisplay"
    ).innerText = `${i.toLocaleDateString("en-us", { month: "long" })} ${d}`),
      (t.innerHTML = "");
    for (let c = 1; c <= s + l; c++) {
      let p = document.createElement("div");

      if ((p.classList.add("day"), c > s)) {
        p.innerText = c - s;
        let u = `${c - s}/${o + 1}/${d}`,
          m = u.split("/"),
          y = `${m[0].padStart(2, "0")}/${o + 1}/${m[2]}`;
        // console.log("this is daystring" + y)

        p.classList.add(`day_${c - s}`);
        let f = new Date();
        f.getDate() == c - s &&
          ((p.style.backgroundColor = "#89abc9")),
          (document.querySelector(".last_for_display_time").innerHTML = "")



        var dddd = new Date();
        dddd.setHours(0, 0, 0, 0);
        var date_to_compare = new Date(m[2], o, m[0].padStart(2, "0"));
        // console.log(dddd, date_to_compare);

        date_to_compare.setHours(0, 0, 0, 0);
        date_to_compare = date_to_compare.getTime();
        dddd = dddd.getTime();
        function parseFormattedDateTime(formattedDate, formattedTime) {
          const [day, month, year] = formattedDate.split("/");
          const [hours, minutes] = formattedTime.split(":");
          return new Date(year, month - 1, day, hours, minutes);
        }

        function parseISODate(isoDateString) {
          return new Date(isoDateString);
        }
        function isDateTimeInArray(formattedDate, formattedTime) {
          // console.log("🚀 ~ isDateTimeInArray ~ formattedTime:", formattedTime)
          // console.log("🚀 ~ isDateTimeInArray ~ formattedDate:", formattedDate)
          function formatTimeFromJSDate(date) {
            // Get hours and minutes from the Date object
            const hours = date.getHours();
            const minutes = date.getMinutes();

            // Add leading zeros if needed
            const formattedHours = hours < 10 ? `0${hours}` : hours;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

            // Combine hours and minutes in "hh:mm" format
            const formattedTime = `${formattedHours}:${formattedMinutes}`;

            return formattedTime;
          }
          function formatDateFromString(dateString) {
            // console.log("🚀 ~ formatDateFromString ~ dateString:", dateString)
            // Create a Date object from the input string
            const date = new Date(dateString);
            // console.log("🚀 ~ formatDateFromString ~ date:", date)

            // Options for formatting the date
            const options = {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            };

            // Format the date using local time zone
            const formattedDateString = date.toLocaleDateString(
              undefined,
              options
            );
            // console.log("🚀 ~ formatDateFromString ~ formattedDateString:", formattedDateString)

            return formattedDateString;
          }

          const array = array1;


          const providedDate = formattedDate;

          // Convert the provided date to a JavaScript Date object using Moment.js
          // const providedDateObj = moment(providedDate, 'DD/MM/YYYY').toDate();

          // // Count the number of objects with the provided date
          // const count = array.filter(obj => moment(obj.from_date).isSame(providedDateObj, 'day')).length;

          // console.log(count); 






          // console.log("🚀 ~ isDateTimeInArray ~ array:", array)
          const dateTimeToCheck = parseFormattedDateTime(
            formattedDate,
            formattedTime
          );

          // console.log(array);

          // console.log("🚀 ~ isDateTimeInArray ~ dateTimeToCheck:", dateTimeToCheck)
          const isMatchingDateTime = array.some((obj) => {
            // var fromDate = formatDateFromString(obj.from_date);
            // console.log("🚀 ~ isMatchingDateTime ~ obj.from_date:", obj.from_date)
            var fromDate = moment(obj.from_date).format("DD/MM/YYYY");
            // console.log("🚀 ~ isMatchingDateTime ~ fromDate:", fromDate)
            var timeDate = obj.time;


            var timec = formatTimeFromJSDate(dateTimeToCheck);

            var inputDate = moment(`${moment(obj.from_date).format("MM/DD/YYYY")} ${timeDate}`);
            // console.log("🚀 ~ inputDate:", inputDate)

            return moment(dateTimeToCheck).isBetween(moment(inputDate).startOf("hour"), moment(inputDate).endOf("hour"), null, []);


          });

          // console.log(isMatchingDateTime);

          return isMatchingDateTime;
        }

        if (date_to_compare >= dddd) {

          // var array1 = JSON.parse(`<%- JSON.stringify(todaysTimeSlots) %>`);

          array1 = array1.filter(obj => obj.employeeID === employee._id.toString());
          const providedDate = y;

          const providedDateObj = moment(providedDate, 'DD/MM/YYYY').toDate();

          // Count the number of objects with the provided date
          const count = array1.filter(obj => moment(obj.from_date).isSame(providedDateObj, 'day')).length;




          p.addEventListener("click", () => {

            // console.log(y)
            console.log(count)
            console.log(providedDate)
            console.log(array1)
            const formattedDate = y

            var html_to_appent = ``;
            hideInitialMessage(); 
            if (count >= 2) {
              html_to_appent = `No empty slots on ${formattedDate} please try another date.`

            }
            else {


              // const dataString = JSON.stringify(formattedData);

              // console.log(employee)

              for (var k = 0; k <= 11; k++) {


                if (k == 0) {
                  if (!isDateTimeInArray(formattedDate, "12:00")) {


                    var date = moment(formattedDate, 'DD/MM/YYYY');

                    var dayName = date.format('dddd');
                    var indexOfTheObjectWhichContainsDayname = employee.days.findIndex(d => d.day === dayName);

                    if (employee.days.some(d => d.day === dayName)) {



                      //have to put the days loop in here 


                      if (employee.days[indexOfTheObjectWhichContainsDayname].slots.indexOf(`12-1`) !== -1) {
                        var new_string = `${formattedDate} <form action="/fake_login" method="post" >
    
                          <input type="string" name="date_of_ap" value="${formattedDate}" style="display:none;" >
                                 <input type="string" name="employee_id" value="${employee._id}" style="display:none;"  >

   
      
                               <input type="time" name="from_time" value="12:00" style="display:none;" >
              <button class="fbtn" type="submit" onclick="changeColor(this)">12:00 PM</button>
        
                              </form>`;

                        html_to_appent = `${html_to_appent} ${new_string}`;
                      } else {
                        html_to_appent = `${html_to_appent} `;

                      }
                    }
                    else {
                      html_to_appent = `${html_to_appent} ${employee.name} is not free on ${formattedDate}`;
                      break;
                    }
                  } else {
                    var new_string = ` <form>
    
   
                      <button style="display:flex; flex-direction: column;justify-content:center;align-items:center; color:red" class="fbtn" type="btn" onclick="changeColor(this)">12:00 PM <font> Already Occupied</font></button>


        </form>`;

                    html_to_appent = `${html_to_appent} ${new_string}`;
                  }
                } else {
                  if (!isDateTimeInArray(formattedDate, `${12 + k}:00`)) {

                    var date = moment(formattedDate, 'DD/MM/YYYY');

                    var dayName = date.format('dddd');
                    //console.log(dayName);

                    if (employee.days.some(d => d.day === dayName)) {
                      var indexOfTheObjectWhichContainsDayname = employee.days.findIndex(d => d.day === dayName);

                      console.log("==", indexOfTheObjectWhichContainsDayname)


                      if (employee.days[indexOfTheObjectWhichContainsDayname].slots.indexOf(`${k}-${k + 1}`) !== -1) {

                        var new_string = `<form action="/fake_login" method="post" >
    
    <input type="string" name="date_of_ap" value="${formattedDate}" style="display:none;" >
    <input type="string" name="employee_id" value="${employee._id}" style="display:none;"  >

   
      
         <input type="time" name="from_time" value="${12 + k
                          }:00" style="display:none;" >
        <button class="fbtn" type="submit" onclick="changeColor(this)">0${k}:00 PM</button>
        
  </form>`;

                        html_to_appent = `${html_to_appent} ${new_string}`;
                      } else {

                        html_to_appent = `${html_to_appent} `;
                      }

                    } else {
                      html_to_appent = `${html_to_appent} ${employee.name} is not free on ${formattedDate}`;
                      html_to_appent = `${html_to_appent} `;
                      break;


                    }

                  }
                  else {

                    var new_string = ` <div>
    
   
    <button type="button" style="display:flex; flex-direction: column;justify-content:center;align-items:center;color:red" class="fbtn" type="btn" onclick="changeColor(this)">0${k}:00 PM <font> Already Occupied</font></button>
    
              </div>`;

                    html_to_appent = `${html_to_appent} ${new_string}`;
                  }
                }
              }



            }  //count's else is ending here 



            html_to_appent = ` <div id="time-picker">${html_to_appent} </div>`;

            document.querySelector(".last_for_display_time").innerHTML =
              html_to_appent;
          });

        }




      }
      else p.classList.add("padding");
      t.appendChild(p);
    }
  }
  document.getElementById("nextButton").addEventListener("click", () => {
    e++, ii();
  }),
    document.getElementById("backButton").addEventListener("click", () => {
      e--, ii();
    }),
    ii();


}
function capitalizeFirstLetter(e) {
  return e.replace(/^\w/, (e) => e.toUpperCase());
}
const ul_elem = document.querySelector("#employee-list"),
  li_elem = ul_elem.querySelectorAll("li"),
  numberOfLiElements = li_elem.length;
var employee,
  the_meet_div = document.querySelector("#meeting-section");
// console.log(numberOfLiElements);
for (var k = 0; k < numberOfLiElements; k++) {
  var e = JSON.parse(emploiesData);
  document.querySelector(`.E_${k}`).addEventListener(
    "click",
    (function (t) {
      return function () {
        console.log("clicked", t), (employee = e[t]);
        let n = `
cal_func();
`,
          i = document.createElement("script");
        (i.textContent = n),
          (the_meet_div.innerHTML = ""),
          (the_meet_div.innerHTML = `

<style>
 #initialMessage{
  margin-top: 25px;
  text-align: center;
  h1{
    text-wrap: nowrap;
        font-size: 24px;
        font-weight: 700;
        /* text-align: center; */
        margin-left: 40px;
  }
  p{
    margin-left: 42px;
  }
}
body, h1, p, div, input, button {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f9;
  color: #333;
}

/* Main container styling */
.cap {
  background-color: #2c3e50;
  height: 15px;
  margin-top: -20px;
  margin-right: auto;
  margin-left: -20px;
  width: 897px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.main {
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
      border: 2px solid #e0e0e0;
}

/* Header and meeting info styling */
.header_top {
  font-size: 25px;
    font-weight: 700;
    line-height: 24px;
    color: rgba(26, 26, 26, 0.61);
    margin-bottom: 5px;
    margin-top: 15px;
    text-align: center;
}

.meeting-type {
  font-size: 30px;
    font-weight: 700;
    line-height: 32px;
    color: rgb(26, 26, 26);
    margin-bottom: 10px;
    text-align: center;
}

.duration {
  font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    color: rgba(26, 26, 26, 0.61);
    margin-bottom: 20px;
    text-align: center;
}

/* Note section styling */
.note {
  margin: 20px 0;
  padding: 10px;
  background-color: #ffcccc;
  border-left: 4px solid #ff0000;
  font-size: 0.9rem;
}
.mainddddd{
  display: flex ;
   border: 1px solid #e0e0e0;
}
/* Calendar container styling */
#container {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: #f9f9f9; */
  padding: 20px;
  /* border-radius: 10px; */
  border-right: 1px solid #e0e0e0;
    margin-left: 35px;
  /* box-shadow: 0 0 15px rgba(0, 0, 0, 0.1); */
}

#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.icons {
  cursor: pointer;
  font-size: 1.5rem;
}

#monthDisplay {
  font-weight: 400;
    font-size: 1.5rem;
}

#weekdays {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
  /* border-bottom: 2px solid #ddd; */
}

#weekdays div {
  width: 14.28%;
    text-align: center;
    padding: 10px 0;
    /* font-weight: bold; */
    color: rgba(26, 26, 26, 0.61);
    font-weight: 400;
    font-size: 14px;
    line-height: 1;
    text-transform: uppercase;
}

#calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  width: 100%;
  margin-top: 10px;
}

.day {
  width: 100%;
    padding: 20px;
    text-align: center;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
    background-color: var(--primary-color-level4, rgba(0, 105, 255, 0.065));
    color: #0069FF;
    font-weight: 700;
}

.day:hover {
  background-color: #e6f7ff;
}

.day.padding {
  background-color: white;
}

.clicked {
  background-color: #89abc9;
  color: #fff;
}

/* Modal styling */
#newEventModal, #deleteEventModal {
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  z-index: 1000;
}

#newEventModal h2, #deleteEventModal h2 {
  margin-bottom: 10px;
}

#newEventModal input, #deleteEventModal p {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
}

#newEventModal button, #deleteEventModal button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

#newEventModal button:hover, #deleteEventModal button:hover {
  background-color: #0056b3;
}

#modalBackDrop {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 500;
}

/* Time picker styling */
.last_for_display_time {
  margin-top: 20px;
  text-align: center;
  scrollbar-width: thin;
    scrollbar-color: #888 #f1f1f1;
}
     /*  scrollbar styles */
         .last_for_display_time::-webkit-scrollbar {
            width: 5px;
        }
        .last_for_display_time::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        .last_for_display_time::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 5px;
        }
        .last_for_display_time::-webkit-scrollbar-thumb:hover {
            background: #555;
        }

.fbtn {
  all: unset;
  padding: 10px;
  cursor: pointer;
  width: 70%;
  height: 30px;
  border: 2px solid var(--primary-color-level2, rgba(0, 105, 255, 0.5));
  color: #0069FF;
  margin-top: 10px;
  font: inherit;
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  font-weight: 700;
  border-radius: 5px;
}

.fbtn:hover {
  border: 2px solid #0069FF;

}

.clicked {
  background-color: #0056b3;
}
#nextButton,#backButton{
  background-color: var(--primary-color-level4, rgba(0, 105, 255, 0.065));
    position: relative;
    z-index: 1;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    color: var(--primary-color, rgb(0, 105, 255));
}
#backButton:hover{
background-color: #e6f7ff;
}
#nextButton:hover{
  background-color: #e6f7ff;
  }
@media (max-width: 768px) {
  #container {
    padding: 10px;
  }

  .header_top {
    font-size: 1.2rem;
  }

  .meeting-type {
    font-size: 1rem;
  }

  .duration {
    font-size: 0.9rem;
  }

  #weekdays div {
    padding: 5px 0;
  }

  .day {
    padding: 15px;
  }
}

</style>

<div class="main">
<div data-id="card-cap" class="cap"></div>

<a href="/hr_dashbord" style="display: flex; align-items: center; text-decoration: none; color: #007bff;">
    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 18l-6-6 6-6"/>
    </svg>
    <span style="margin-left: 8px; font-size: 16px; font-weight: 600;">Go Back to Meetings</span>
</a>






 <div class="header_top">Book meeting with</div>
<div class="meeting-type"> ${capitalizeFirstLetter(
  employee.name
)} </div>
<div class="duration">🕒 30 Minute</div>












<div class="mainddddd" >
<div id="container">
<div id="header">
<div class="icons">
<span id="backButton" class="material-symbols-rounded">chevron_left</span></div>
<div id="monthDisplay"></div>
<div class="icons">
<span id="nextButton" class="material-symbols-rounded">chevron_right</span>
</div>

</div>

<div id="weekdays">
<div>Sun</div>
<div>Mon</div>
<div>Tue</div>
<div>Wed</div>
<div>Thu</div>
<div>Fri</div>
<div>Sat</div>
</div>

<div id="calendar"></div>
</div>

<div id="newEventModal">
<h2>New Event</h2>

<input id="eventTitleInput" placeholder="Event Title" />

<button id="saveButton">Save</button>
<button id="cancelButton">Cancel</button>
</div>

<div id="deleteEventModal">
<h2>Event</h2>

<p id="eventText"></p>

<button id="deleteButton">Delete</button>
<button id="closeButton">Close</button>
</div>

<div id="modalBackDrop"></div>


 <div id="modalBackDrop"></div>
        <div id="initialMessage">
          <h1>Date-specific hours</h1>
          <p>Please select a appoinment according to ${capitalizeFirstLetter(
            employee.name
          )}'s available time.</p>
      </div>

<div class="last_for_display_time" style="width:295px; padding-top: 6%;"></div>

</div>
</div>





`),
          the_meet_div.appendChild(i);
      };
    })(k)
  );
}
function hideInitialMessage() {
  document.getElementById('initialMessage').style.display = 'none';
}

function showMeetingSection(e) {
  document.querySelectorAll(".meeting-section").forEach(function (e) {
    e.classList.remove("active");
  }),
    document.getElementById(e + "-meetings").classList.add("active");
}
function showMeetingDetails(e) {
  let t = e.parentElement.parentElement;
  // console.log(t.children.length);
  let n = t.firstElementChild;
  function i(e) { }
  console.log(n);
}
function showInfo(e, t) {
  console.log("clicked");
  var n = document.querySelectorAll(`.${t}`);
  console.log(n);
  for (var i = 0; i < n.length; i++)
    "none" == n[i].style.display
      ? (console.log("makeing flex"), (n[i].style.display = "flex"))
      : "flex" == n[i].style.display &&
      (console.log("makeing none"), (n[i].style.display = "none"));
}
function showLoader() {
  document.getElementById("loaderContainer").style.display = "flex";
}
function hideLoader() {
  document.getElementById("loaderContainer").style.display = "none";
}
window.addEventListener("beforeunload", showLoader),
  window.addEventListener("load", hideLoader);




function changeColor(button) {
  var buttons = document.querySelectorAll('.navbar a');
  buttons.forEach(function (btn) {
    btn.classList.remove('clicked');
  });
  button.classList.add('clicked');
}
