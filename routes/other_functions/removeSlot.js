const employee_module = require('./../../models/employee_module');

const removeSlot = async (req, res, next) => {
  const { emp_id, dayToRemoveSlot, slotToRemove } = req.body;
  try {
    const that_employee = await employee_module.findOne({ _id: emp_id.trim() });

    if (that_employee) {
      const dayIndex = that_employee.days.findIndex(
        (d) => d.day === dayToRemoveSlot
      );

      if (dayIndex !== -1) {
        const slotIndex = that_employee.days[dayIndex].slots.indexOf(slotToRemove);
        
        if (slotIndex !== -1) {
          that_employee.days[dayIndex].slots.splice(slotIndex, 1);
          await that_employee.save();
          req.flash("message", "Slot removed successfully.");
        } else {
          req.flash("error", "Slot not found for this day.");
        }
      } else {
        req.flash("error", "Day not found.");
      }
    } else {
      req.flash("error", "Employee not found.");
    }
  } catch (error) {
    console.error("Error removing slot:", error);
    req.flash("error", "Internal Server Error");
  }
  res.redirect(req.header("referer") || "/");
};

module.exports = removeSlot;
