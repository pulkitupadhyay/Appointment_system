const appointment_requests = require("./../../models/appointment_requests");

const employee_scheema = require("./../../models/employee_module");
const user_scheema = require("./../../models/user_module");
const time_slot = require("./../../models/time_slots");

const previous_appointments = require("./../../models/previous_appointments");

const prev_time_slots = require("./../../models/prev_time_slots");

const hr_dashbord = async (req, res, next) => {
  // const a_ap = await appointment_requests.find();
  // const p_ap = await previous_appointments.find();
  try {
    if (!req.cookies.hr_email) {
      req.flash("error", "You Are Not LoggedIn!!");
      res.redirect("/hr_login");
    } else if (req.cookies.hr_email) {
      console.time("hr_dashboard");
      // const emploies = await ;

      // const prvs_time_slots = await ;
      // let todaysTimeSlots = await ;
      const promiseResult = await Promise.allSettled([
        appointment_requests.find(),
        previous_appointments.find(),
        user_scheema.find(),
        employee_scheema.find(),
        prev_time_slots.find(),
        time_slot.find({ occupied: true }),
      ]);
      let [a_ap,p_ap,all_users,emploies, prvs_time_slots, todaysTimeSlots] = promiseResult
        .filter((data) => data.status === "fulfilled")
        .map((data) => data.value);
      // todaysTimeSlots.sort((a, b) => new Date(b.from_date) - new Date(a.from_date));

      // console.log("🚀 ~ consthr_dashbord= ~ prvs_time_slots:", prvs_time_slots)
      todaysTimeSlots.sort((a, b) => {
        const dateComparison = new Date(b.from_date) - new Date(a.from_date);

        if (dateComparison !== 0) {
          return dateComparison; // If dates are different, return based on dates
        } else {
          // If dates are the same, compare based on time
          const timeA = a.time.split(":").map(Number);
          const timeB = b.time.split(":").map(Number);

          if (timeA[0] !== timeB[0]) {
            return timeB[0] - timeA[0]; // Compare hours
          } else {
            return timeB[1] - timeA[1]; // If hours are the same, compare minutes
          }
        }
      });

      // console.log(todaysTimeSlots)
      // const timeSlotId = prvs_time_slots.map((data) => data._id);
      // const all_prev_appointmentsF = await previous_appointments.find({
      //   time_slotId: { $in: timeSlotId },
      // });


      const timeSlotIdPrev = prvs_time_slots.map((data) => data._id);

      let all_prev_appointmentsF = timeSlotIdPrev.map((id) =>
        p_ap.filter((appointment) => appointment.time_slotId === id.toString())
      );

      // console.log(all_appointmentsF.flat(Infinity))
      all_prev_appointmentsF = all_prev_appointmentsF.flat(Infinity);

      // console.log("🚀 ~ consthr_dashbord= ~ result:", all_prev_appointmentsF)

      // console.log("🚀 ~ consthr_dashbord= ~ timeSlotId:", timeSlotId)

      // const prevAppointmentsPromises =timeSlotId.map((id) => previous_appointments.find({
      //   time_slotId: timeSlotId,
      // }))
      // const prevAppointmentsPromisesResult = await Promise.allSettled(prevAppointmentsPromises);
      // // console.log("🚀 ~ consthr_dashbord= ~ prevAppointmentsPromisesResult:", prevAppointmentsPromisesResult)
      // const all_prev_appointmentsF = prevAppointmentsPromisesResult
      // .filter((data) => data.status === "fulfilled")
      // .map((data) => data.value);
      // console.log("🚀 ~ consthr_dashbord= ~ all_prev_appointmentsF:", all_prev_appointmentsF)
      // const prevAppointmentsPromises = prvs_time_slots.map(async (slot) => {
      //   try {
      //     console.log("🚀 ~ prevAppointmentsPromises ~ slot:", slot)
      //     const appointment = await previous_appointments.findOne({
      //       time_slotId: slot._id,
      //     });
      //     console.log("🚀 ~ prevAppointmentsPromises ~ appointment:", appointment)
      //     return appointment;
      //   } catch (error) {
      //     res.render("error", {
      //       message: req.flash("message"),
      //       bad_alert: req.flash("error"),
      //     });
      //   }
      // });

      // const all_prev_appointmentsF = await Promise.all(
      //   prevAppointmentsPromises
      // );
      // console.log("🚀 ~ consthr_dashbord= ~ all_prev_appointmentsF:", all_prev_appointmentsF)

      // Fetch appointments for each today's time slot

      // const timeSlotIdcur = to.map((data)=> data._id);
      // const all_appointmentsF = await appointment_requests.find({ time_slotId: { $in: timeSlotIdcur } });

      const timeSlotIdCur = todaysTimeSlots.map((data) => data._id);
      // console.log("🚀 ~ consthr_dashbord= ~ timeSlotId:", timeSlotIdCur);

      let all_appointmentsF = timeSlotIdCur.map((id) =>
        a_ap.filter((appointment) => appointment.time_slotId === id.toString())
      );

      // console.log(all_appointmentsF.flat(Infinity))
      all_appointmentsF = all_appointmentsF.flat(Infinity);

      // const AppointmentsPromisesResult = await Promise.allSettled(AppointmentsPromises);
      // // console.log("🚀 ~ consthr_dashbord= ~ prevAppointmentsPromisesResult:", prevAppointmentsPromisesResult)
      // let all_appointmentsF = AppointmentsPromisesResult
      // .filter((data) => data.status === "fulfilled")
      // .map((data) => data.value);

      // const appointmentsPromises = todaysTimeSlots.map(async (slot) => {
      //   try {
      //     const appointment = await appointment_requests.findOne({
      //       time_slotId: slot._id,
      //     });
      //     return appointment;
      //   } catch (error) {
      //     res.render("error", {
      //       message: req.flash("message"),
      //       bad_alert: req.flash("error"),
      //     });
      //   }
      // });

      // var all_appointmentsF = await Promise.all(appointmentsPromises);

      // Fetch users for each appointment

      const userIdCur = all_appointmentsF.map((data) => data.userID);
      // console.log("🚀 ~ consthr_dashbord= ~ timeSlotId:", timeSlotId)

      let all_usersF = userIdCur.map((id) =>
      all_users.filter((user) => user._id.toString() === id)
    );

    // console.log(all_appointmentsF.flat(Infinity))
    all_usersF = all_usersF.flat(Infinity);

// console.log(all_usersF)

      // const userPromises = userIdCur.map((id) =>
      //   user_scheema.findOne({
      //     _id: id,
      //   })
      // );
      // const userPromisesResult = await Promise.allSettled(userPromises);
      // // console.log("🚀 ~ consthr_dashbord= ~ prevAppointmentsPromisesResult:", prevAppointmentsPromisesResult)
      // let all_usersF = userPromisesResult
      //   .filter((data) => data.status === "fulfilled")
      //   .map((data) => data.value);

      // const usersPromises = all_appointmentsF.map(async (appointment) => {
      //   try {
      //     const user = await user_scheema.findOne({ _id: appointment.userID });
      //     return user;
      //   } catch (error) {
      //     res.render("error", {
      //       message: req.flash("message"),
      //       bad_alert: req.flash("error"),
      //     });
      //   }
      // });

      // var all_usersF = await Promise.all(usersPromises);

      // Fetch previous users for each previous appointment


      const userIdPrev = all_prev_appointmentsF.map((data) => data.userID);
      // console.log("🚀 ~ consthr_dashbord= ~ timeSlotId:", timeSlotId)

      let all_prev_usersF = userIdPrev.map((id) =>
      all_users.filter((user) => user._id.toString() === id)
    );

    // console.log(all_appointmentsF.flat(Infinity))
    all_prev_usersF = all_prev_usersF.flat(Infinity);






      // const userIdPrev = all_prev_appointmentsF.map((data) => data.userID);
      // // console.log("🚀 ~ consthr_dashbord= ~ timeSlotId:", timeSlotId)

      // const userPromisesPrev = userIdPrev.map((id) =>
      //   user_scheema.findOne({
      //     _id: id,
      //   })
      // );
      // const userPromisesPrevResult = await Promise.allSettled(userPromisesPrev);
      // // console.log("🚀 ~ consthr_dashbord= ~ prevAppointmentsPromisesResult:", prevAppointmentsPromisesResult)
      // let all_prev_usersF = userPromisesPrevResult
      //   .filter((data) => data.status === "fulfilled")
      //   .map((data) => data.value);

      // const prevUsersPromises = all_prev_appointmentsF.map(
      //   async (appointment) => {
      //     try {
      //       const user = await user_scheema.findOne({
      //         _id: appointment.userID,
      //       });
      //       return user;
      //     } catch (error) {
      //       res.render("error", {
      //         message: req.flash("message"),
      //         bad_alert: req.flash("error"),
      //       });
      //     }
      //   }
      // );

      // const all_prev_usersF = await Promise.all(prevUsersPromises);

      // Fetch employees for each appointment




      const empIdPrev = all_prev_appointmentsF.map((data) => data.employeeID);
      // console.log("🚀 ~ consthr_dashbord= ~ timeSlotId:", timeSlotId)

      let all_prev_employeesF = empIdPrev.map((id) =>
      emploies.filter((emp) => emp._id.toString() === id)
    );

    // console.log(all_appointmentsF.flat(Infinity))
    all_prev_employeesF = all_prev_employeesF.flat(Infinity);

    //   const empIdPrev = all_prev_appointmentsF.map((data) => data.employeeID);
    //   // console.log("🚀 ~ consthr_dashbord= ~ timeSlotId:", timeSlotId)

    //   const empPromisesPrev = empIdPrev.map((id) =>
    //     employee_scheema.findOne({
    //       _id: id,
    //     })
    //   );
    //   const empPromisesPrevResult = await Promise.allSettled(empPromisesPrev);
    //   // console.log("🚀 ~ consthr_dashbord= ~ prevAppointmentsPromisesResult:", prevAppointmentsPromisesResult)
    //   let all_prev_employeesF = empPromisesPrevResult
    //     .filter((data) => data.status === "fulfilled")
    //     .map((data) => data.value);

      // const prevEmployeeIDs = all_prev_appointmentsF.map(
      //   (appointment) => appointment.employeeID
      // );
      // const all_prev_employeesF = await Promise.all(
      //   prevEmployeeIDs.map(async (employeeID) => {
      //     try {
      //       const employee = await employee_scheema.findOne({
      //         _id: employeeID,
      //       });
      //       return employee;
      //     } catch (error) {
      //       res.render("error", {
      //         message: req.flash("message"),
      //         bad_alert: req.flash("error"),
      //       });
      //     }
      //   })
      // );





      const empId = all_appointmentsF.map((data) => data.employeeID);
      // console.log("🚀 ~ consthr_dashbord= ~ timeSlotId:", timeSlotId)

      let all_employeesF = empId.map((id) =>
      emploies.filter((emp) => emp._id.toString() === id)
    );

    // console.log(all_appointmentsF.flat(Infinity))
    all_employeesF = all_employeesF.flat(Infinity);


      var hostname;
      var hr_em = req.cookies.hr_email;
      if (hr_em == "amrita@swaayatt.com") {
        hostname = "Amrita Pachori";
      } else {
        hostname = "Soumya Kathal";
      }

      todaysTimeSlots = todaysTimeSlots.reverse();
      all_appointmentsF = all_appointmentsF.reverse();
      all_usersF = all_usersF.reverse();
      all_employeesF = all_employeesF.reverse();
// console.log(todaysTimeSlots)
      res.render("hr_dashbord.ejs", {
        emploies,
        todaysTimeSlots,
        all_appointmentsF,
        all_usersF,
        all_employeesF,
        all_prev_appointmentsF,
        prvs_time_slots,
        all_prev_employeesF,
        all_prev_usersF,
        hostname,
        message: req.flash("message"),
        bad_alert: req.flash("error"),
      });
      console.timeEnd("hr_dashboard");
    }
  } catch (error) {
    console.log(error);

    res.render("error", {
      message: req.flash("message"),
      bad_alert: req.flash("error"),
    });
  }
};

module.exports = hr_dashbord;
