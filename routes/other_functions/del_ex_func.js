const time_slot = require("../../models/time_slots");
const time_slots = require("../../models/time_slots");

const appointment_requests = require("../../models/appointment_requests");
const previous_appointments = require("../../models/previous_appointments");
const prev_time_slots = require("../../models/prev_time_slots");

async function delete_expired_slots() {
  await time_slot.deleteMany({ occupied: false });
  const currentDate = new Date();
  const isoString =
    currentDate.toISOString().split("T")[0] + "T00:00:00.000+00:00";
  console.log(isoString);

  // const currentDate = new Date();
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const currentTime = `${hours}:${minutes}`;

  var slots_came_from_database = await time_slot.find({
    from_date: { $lt: isoString },
  });

  for (var i = 0; i < slots_came_from_database.length; i++) {
    var appo = await appointment_requests.findOne({
      time_slotId: slots_came_from_database[i]._id.toString(),
    });

    var prev_ts = await time_slot.findOne({
      _id: slots_came_from_database[i]._id,
    });

    console.log(appo, prev_ts);

    var p_ts = new prev_time_slots({
     
      employeeID: prev_ts.employeeID,
      from_date: prev_ts.from_date,
      time: prev_ts.time,
      occupied: prev_ts.occupied,
    });

    await p_ts.save();

    var p_appo = new previous_appointments({
     
      userID: appo.userID,
      employeeID: appo.employeeID,
      text: appo.text,
      time_slotId: p_ts._id,
      accepted: appo.accepted,
    });
    

    await p_appo.save();

    await appointment_requests.findOneAndDelete({
      time_slotId: slots_came_from_database[i]._id.toString(),
    });

    await time_slot.findOneAndDelete({ _id: slots_came_from_database[i]._id });
  }

  var slots_came_from_database_2 = await time_slot.find({
    $and: [{ from_date: isoString }, { time: { $lt: currentTime } }],
  });

  //   console.log(slots_came_from_database_2)
  for (var i = 0; i < slots_came_from_database_2.length; i++) {
    var appo = await appointment_requests.findOne({
      time_slotId: slots_came_from_database_2[i]._id.toString(),
    });

    var prev_ts = await time_slot.findOne({
      _id: slots_came_from_database_2[i]._id,
    });

    // console.log(appo,prev_ts)

    var p_appo = new previous_appointments({
      // _id: appo._id,
      userID: appo.userID,
      employeeID: appo.employeeID,
      text: appo.text,
      time_slotId: appo.time_slotId,
      accepted: appo.accepted,
    });

    var p_ts = new prev_time_slots({
      _id: prev_ts._id,
      employeeID: prev_ts.employeeID,
      from_date: prev_ts.from_date,
      time: prev_ts.time,
      occupied: prev_ts.occupied,
    });
    await p_ts.save();

    await p_appo.save();

    await appointment_requests.findOneAndDelete({
      time_slotId: slots_came_from_database_2[i]._id.toString(),
    });

    await time_slot.findOneAndDelete({
      _id: slots_came_from_database_2[i]._id,
    });
  }

  await time_slot.deleteMany({ occupied: false });
}

module.exports = delete_expired_slots;
