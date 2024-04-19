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
    i.setMonth(new Date().getMonth()+e);



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
            var date_to_compare = new Date(m[2], o ,m[0].padStart(2, "0"));
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

                  array1 =  array1.filter(obj => obj.employeeID === employee._id.toString());
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

if(count>=2){
  html_to_appent=`No empty slots on ${formattedDate} please try another date.1`

}else{

                // const dataString = JSON.stringify(formattedData);

                // console.log(isDateTimeInArray(formattedDate, "13:00"));

                for (var k = 0; k <= 8; k++) {
                  if (k == 0) {
                    if (!isDateTimeInArray(formattedDate, "12:00")) {
                      

                      var date = moment(formattedDate, 'DD/MM/YYYY');

                        var dayName = date.format('dddd');

                    if(employee.days.indexOf(dayName) !==  -1){

                    if(employee.slots.indexOf(`12-1`) !== -1){    
                      var new_string = `${formattedDate} <form action="/fake_login" method="post" >
      
                            <input type="string" name="date_of_ap" value="${formattedDate}" style="display:none;" >
                                   <input type="string" name="employee_id" value="<%=employee._id%>" style="display:none;"  >

     
        
                                 <input type="time" name="from_time" value="12:00" style="display:none;" >
                <button class="fbtn" type="submit" onclick="changeColor(this)">12:00 PM</button>
          
                                </form>`;
                      
                      html_to_appent = `${html_to_appent} ${new_string}`;
                              }else{
                                html_to_appent = `${html_to_appent} ${employee.name} is not free on ${formattedDate}2`;
                              }
                            }else{
                                html_to_appent = `${html_to_appent} ${employee.name} is not free on ${formattedDate}3`;
                                break;
                              }
                    } else {
                      var new_string = ` <form   style="background-color:red;" >
      
     
                        <button style="display:flex; flex-direction: column;justify-content:center;align-items:center;" class="fbtn" type="btn" onclick="changeColor(this)">12:00 PM <font> Already Occupied</font></button>


          </form>`;
                      
                      html_to_appent = `${html_to_appent} ${new_string}`;
                    }
                  } else {
                    if (!isDateTimeInArray(formattedDate, `${12 + k}:00`)) {

                      var date = moment(formattedDate, 'DD/MM/YYYY');

                      var dayName = date.format('dddd');

                      if(employee.days.indexOf(dayName) !==  -1){
                      
                      if(employee.slots.indexOf(`${k}-${k+1}`) !== -1){ 

                      var new_string = `<form action="/fake_login" method="post" >
      
      <input type="string" name="date_of_ap" value="${formattedDate}" style="display:none;" >
      <input type="string" name="employee_id" value="<%=employee._id%>" style="display:none;"  >

     
        
           <input type="time" name="from_time" value="${
             12 + k 
           }:00" style="display:none;" >
          <button class="fbtn" type="submit" onclick="changeColor(this)">0${k}:001 PM</button>
          
    </form>`;

                      html_to_appent = `${html_to_appent} ${new_string}`;
                    }
                    
                    else{
                               
                                html_to_appent = `${html_to_appent} `;
                              }
                            
                            }else{
                                html_to_appent = `${html_to_appent} ${employee.name} is not free on ${formattedDate}5`;
                                html_to_appent = `${html_to_appent} `;
                              }

                    } else {
                      var new_string = ` <div style="background-color:red !important;" >
      
     
      <button style="display:flex; flex-direction: column;justify-content:center;align-items:center;background-color:red !important;" class="fbtn" type="btn" onclick="changeColor(this)">0${k}:00 PM <font> Already Occupied</font></button>
      
                </div>`;
                      
                      html_to_appent = `${html_to_appent} ${new_string}`;

                    }
                  }
                }
            
              }
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
body {
          font-family: 'Arial', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
          background-color: #f5f5f5;
      }

      form {
          display: flex;
          flex-direction: column;
          background-color: #fff;
          padding: 20px;
          border-radius: 15px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
      }

      input {
          padding: 10px;
          margin: 8px 0;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
          outline: none;
      }

      #time-picker {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction:column;
      }

      #hour, #minute {
          width: 40px;
      }

      span {
          font-size: 18px;
      }

      #ampm {
          width: 60px;
      }

      .fbtn {
          width: 100%;
          padding: 15px;
          background-color: #3498db;
          color: #fff;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
      }

      .fbtn:hover {
          background-color: #2980b9;
      }
</style>
<style>
h1{
  text-align: center;
}
h2{
  margin-top: 1%;
}
.mainDiv h2{
  font-size: 1rem !important  ;
}
form input{
  font-size: 1rem !important  ;

}
.main{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#header {
  padding: 10px;
  background-color: #d36c6c;
  color: white;
  font-size: 18px;
  font-family: sans-serif;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
#header button {
background-color:#92a1d1;
}
#header .icons {
  display: flex;
}

#header .icons span {
  height: 38px;
  width: 38px;
  margin: 0 1px;
  cursor: pointer;
  color: #000;
  text-align: center;
  line-height: 38px;
  font-size: 1.9rem;
  user-select: none;
  border-radius: 50%;
}

#header .icons span:last-child {
  margin-right: -10px;
  
}


#header .icons span:hover {
  background:  rgb(202, 201, 201);
  /* color: rgba(247, 241, 241, 0.938);  */
  color:  #d36c6c;
}


#container {
width: 964px;
}
#weekdays {
  width: 100%;
  display: flex;
  color: #247BA0;
  margin-left: 5%;
  font-weight: bold;
}
#weekdays div {
width: 100px;
padding-top: 5%;
padding-left:1%;
padding-bottom: 0px !important;
}
#calendar {
width: 90%;
margin: auto;
display: flex;
flex-wrap: wrap;
}
.day {
width: 100px;
padding: 10px;
height: 100px;
margin: 5px;
display: flex;
flex-direction: column;
justify-content: space-between;
}
.day {
  cursor: pointer;
  box-sizing: border-box;
  background-color: white;
  box-shadow: 0 5px 25px rgb(1 1 1 / 15%);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-bottom: 6px solid #4285F4;
  border-radius: 8px;
  justify-content: center;
  text-align: center;
}
.day:hover {
  background-color: rgba(211, 108, 108, 0.6) !important;
}

.day + #currentDay {
background-color:#e8f4fa;
}
.event {
font-size: 10px;
padding: 3px;
background-color: #58bae4;
color: white;
border-radius: 5px;
max-height: 55px;
overflow: hidden;
}
.padding {
cursor: default !important;
background-color: #FFFCFF !important;
box-shadow: none !important;
}
#newEventModal, #deleteEventModal {
display: none;
z-index: 20;
padding: 25px;
background-color: #e8f4fa;
box-shadow: 0px 0px 3px black;
border-radius: 5px;
width: 350px;
top: 100px;
left: calc(50% - 175px);
position: absolute;
font-family: sans-serif;
}
#eventTitleInput {
padding: 10px;
width: 100%;
box-sizing: border-box;
margin-bottom: 25px;
border-radius: 3px;
outline: none;
border: none;
box-shadow: 0px 0px 3px gray;
}
#eventTitleInput.error {
border: 2px solid red;
}
#cancelButton, #deleteButton {
background-color: #d36c6c;
}
#saveButton, #closeButton {
background-color: #92a1d1;
}
#eventText {
font-size: 14px;
}
#modalBackDrop {
display: none;
top: 0px;
left: 0px;
z-index: 10;
width: 100vw;
height: 100vh;
position: absolute;
background-color: rgba(0,0,0,0.8);
}

@media only screen and (min-width: 1024px) {
  .mt-5, .my-5 {
    margin-top: 10.5rem!important;
}
  }
  @media only screen and (min-width: 1864px) {
  .mt-5, .my-5 {
    margin-top: 1.5rem!important;
}
  }
</style>
<div class="main">
<a href="/hr_dashbord" style="text-align:left;" ><svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c.2 35.5-28.5 64.3-64 64.3H128.1c-35.3 0-64-28.7-64-64V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24zM352 224a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zm-96 96c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80H256z"/></svg>GO Back TO Meetings</a>







<h1 class="my-5" style="font-family: sans-serif; font-weight: bold;" text-shadow: 0rem 0.5rem 1.5rem #92a1d1;>Create 30 Min meeting with  ${capitalizeFirstLetter(
            employee.name
          )} </h1> 









<div class="mainddddd" style="width: 90%; display: flex; flex-direction: row;box-shadow: 0rem 0.5rem 1.5rem 0.5rem rgba(167, 164, 164, 0.7) !important;  padding: 1.5%;">
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
<div>Sunday</div>
<div>Monday</div>
<div>Tuesday</div>
<div>Wednesday</div>
<div>Thursday</div>
<div>Friday</div>
<div>Saturday</div>
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




<div class="last_for_display_time" style="width:295px; padding-top: 6%;"></div>

</div>
</div>





`),
          the_meet_div.appendChild(i);
      };
    })(k)
  );
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
  function i(e) {}
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
      buttons.forEach(function(btn) {
          btn.classList.remove('clicked');
      });
      button.classList.add('clicked');
  }
