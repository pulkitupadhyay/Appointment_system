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
    // console.log('month set',i.setMonth(new Date().getMonth()+e))
    // console.log('this is month'+ i.setMonth(new Date().getMonth()+e))
    // 0 !== e && i.setMonth(new Date().getMonth()+e);



    let o = i.getMonth();
     let d = i.getFullYear();
      // console.log(d);
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
      // console.log('this a l:'+a,l)
    // console.log(s + "a;sldkfja;sldkfj"),
     
    
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
          (document.querySelector(".last_for_display_time").innerHTML = ""),
          p.addEventListener("click", () => {
            
              (document.querySelector(".last_for_display_time").innerHTML = `
      
      <form action="/fake_login" method="post" >
        <h6>Select Time </h6>
        <input type="string" name="date_of_ap" value="${y}" style="display:none;" >
        <input type="string" name="employee_id" value="${employee._id}" style="display:none;"  >
  
          <div id="time-picker">
              <input type="number" name="hour" id="hour" min="1" max="12" placeholder="HH" required>
              <span>:</span>
              <input type="number" id="minute" name="minute" min="0" max="59" placeholder="MM" required>
              <select id="ampm" name="ampm" >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
              </select>
              
          </div>
          <button class="fbtn"  type="submit">Submit</button>
      </form>
      
      `);
          });
      } else p.classList.add("padding");
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


    
//   let o = document.querySelector(".mainDiv")
//   console.log(o)
    
//   let d = Array.from(o.children);
//   function a(e) {
//     let [t, n, i] = e.split("/").map(Number);
//     return new Date(i + 2e3, n - 1, t);
//   }
  // d.sort((e, t) => {
  //   let n = a(e.querySelector("h1").textContent),
  //     i = a(t.querySelector("h1").textContent);
  //   return n - i;
  // }),
  //   d.forEach((e) => o.appendChild(e));
}
function capitalizeFirstLetter(e) {
  return e.replace(/^\w/, (e) => e.toUpperCase());
}
const ul_elem = document.querySelector("#employee-list"),
  li_elem = ul_elem.querySelectorAll("li"),
  numberOfLiElements = li_elem.length;
var employee,
  the_meet_div = document.querySelector("#meeting-section");
console.log(numberOfLiElements);
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
          justify-content: space-between;
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
color: #d36c6c;
font-size: 26px;
font-family: sans-serif;
display: flex;
justify-content: space-between;
}
#header button {
background-color:#92a1d1;
}
#container {
width: 964px;
}
#weekdays {
width: 100%;
display: flex;
color: #247BA0;
margin-left:5%;
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
cursor: pointer;
box-sizing: border-box;
background-color: white;
margin: 5px;
box-shadow: 0px 0px 3px #CBD4C2;
display: flex;
flex-direction: column;
justify-content: space-between;
}
.day:hover {
background-color: #e8faed;
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


</style>
<div class="main">
<a href="/hr_dashbord" style="text-align:left;" ><svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c.2 35.5-28.5 64.3-64 64.3H128.1c-35.3 0-64-28.7-64-64V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24zM352 224a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zm-96 96c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80H256z"/></svg>GO Back TO Meetings</a>







<h1 class="my-5" style="font-family: sans-serif; font-weight: bold;" >Create 30 Min meeting with  ${capitalizeFirstLetter(
            employee.name
          )} </h1> 









<div class="mainddddd" style="width: 90%; display: flex; flex-direction: row;box-shadow: 0rem 0.5rem 1.5rem 0.5rem rgba(167, 164, 164, 0.7) !important;  padding: 1.5%;">
<div id="container">
<div id="header">
<div id="monthDisplay"></div>
<div>
<button id="backButton">Back</button>
<button id="nextButton">Next</button>
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
  console.log(t.children.length);
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
