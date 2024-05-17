
const employee_scheema = require('./../../models/employee_module')

const addSlot = async (req, res, next) => {
    const { emp_id, slottoadd } = req.body;
    try {
      const that_employee = await employee_scheema.findOne({
        _id: emp_id.trim(),
      });
  
      if (that_employee) {
        // Check if the slottoadd is not already in the array
        if (!that_employee.slots.includes(slottoadd)) {
          // Add slottoadd to the array
          that_employee.slots.push(slottoadd);
          // Save the updated document
          await that_employee.save();
          // Set flash message for success
          req.flash("message", "Slot added successfully.");
        } else {
          // Set flash message for slot already existing
          req.flash("error", "Slot already exists for this employee.");
        }
      } else {
        // Set flash message for employee not found
        req.flash("error", "Employee not found.");
      }
    } catch (error) {
      console.error("Error adding slot:", error);
      // Set flash message for internal server error
      req.flash("error", "Internal Server Error");
    }
    // Redirect back to the previous URL
    res.redirect(req.header("referer") || "/");
  }


  module.exports = addSlot