const employee_scheema = require("./../../models/employee_module");

const addSlot = async (req, res, next) => {
  const { emp_id, dayToAddSlot, slottoadd } = req.body;
  try {
    const that_employee = await employee_scheema.findOne({
      _id: emp_id.trim(),
    });

    // Checking if the Employee Exists
    if (that_employee) {
      const dayIndex = that_employee.days.findIndex(
        (d) => d.day === dayToAddSlot
      );

      if (dayIndex !== -1) {
        if (!that_employee.days[dayIndex].slots.includes(slottoadd)) {
          that_employee.days[dayIndex].slots.push(slottoadd);
          await that_employee.save();
          req.flash("message", "Slot added successfully.");
        } else {
          req.flash("error", "Slot already exists for this day.");
        }
      } else {
        req.flash("error", "Day not found.");
      }
    } else {
      req.flash("error", "Employee not found.");
    }
  } catch (error) {
    console.error("Error adding slot:", error);
    req.flash("error", "Internal Server Error");
  }
  res.redirect(req.header("referer") || "/");
};

module.exports = addSlot;
