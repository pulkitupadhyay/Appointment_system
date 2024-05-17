const employee_module = require('./../../models/employee_module')

const removeSlot = async (req, res, next) => {
    const { slottoremove, emp_id } = req.body;
    try {
      const that_employee = await employee_module.findOne({ _id: emp_id.trim() });
  
      if (that_employee) {
        const indexToRemove = that_employee.slots.indexOf(slottoremove);
  
        if (indexToRemove !== -1) {
          that_employee.slots.splice(indexToRemove, 1);
          await that_employee.save();
          req.flash("message", "Slot removed successfully.");
        } else {
          req.flash("error", "Slot not found for this employee.");
        }
      } else {
        req.flash("error", "Employee not found.");
      }
    } catch (error) {
      console.error("Error removing slot:", error);
      req.flash("error", "Internal Server Error");
    }
    res.redirect(req.header("referer") || "/");
  }



  module.exports = removeSlot;