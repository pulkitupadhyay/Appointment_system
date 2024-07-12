const mongoose = require("mongoose");

var employeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  link: {
    type: String,
  },
  days: [
    {
      day: String,
      slots: [String],
    },
  ],
});

module.exports = mongoose.model("employee", employeeSchema);
