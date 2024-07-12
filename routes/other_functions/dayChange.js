const employee_module = require("./../../models/employee_module");

const dayChange = async (req, res, next) => {
  try {
    const { emp_id, dayToChange } = req.body;
    const that_employee = await employee_module.findOne({ _id: emp_id.trim() });

    // Checking if the employee exists
    if (that_employee) {
      const dayIndex = that_employee.days.findIndex((d) => d.day === dayToChange);
      if (dayIndex === -1) {
        that_employee.days.push({ day: dayToChange, slots: [] });
        await that_employee.save();

        req.flash("message", "Day Added");
        res.redirect(`/employee_Dashbord/${emp_id}`);
      } else {
        that_employee.days.splice(dayIndex, 1);
        await that_employee.save();

        req.flash("message", "Day Removed");
        res.redirect(`/employee_Dashbord/${emp_id}`);
      }
    } else {
      req.flash("error", "Employee not found");
      res.redirect("/");
    }
  } catch (error) {
    console.log("Error during day change:", error);
    req.flash('error", "An error occurred while processing your request.');
    res.redirect(`/employee_Dashbord/${req.body.emp_id}`);

  }
};

module.exports = dayChange;
