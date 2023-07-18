const mongoose = require("mongoose");

const Data2Schema = new mongoose.Schema({
  full_name: String,
  email: String,
  team_name: String,
});

const Data2Model = mongoose.model("data2", Data2Schema);

module.exports = Data2Model;
