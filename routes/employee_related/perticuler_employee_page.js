const time_slot = require("./../../models/time_slots");
const employee_scheema = require("./../../models/employee_module");

const with_perticuler_employee = async (req, res, next) => {
  try {
    var employee = await employee_scheema.findOne({ _id: req.params.id });
    // var user = await user_scheema.findOne({ email: req.cookies.user_email})

    var time_slots = await time_slot.find({
      employeeID: req.params.id,
      occupied: true,
    });
    var time_slots1 = time_slots;
    time_slots1.sort((a, b) => {
      const dateA = new Date(a.from_date);
      const dateB = new Date(b.from_date);
      return dateA - dateB;
    });

    res.render("with_perticuler_employee", {
      employee,
      time_slots,
      message: req.flash("message"),
      bad_alert: req.flash("error"),
    });
  } catch (error) {
    res.render("error", {
      message: req.flash("message"),
      bad_alert: req.flash("error"),
    });
  }
};

module.exports = with_perticuler_employee;
