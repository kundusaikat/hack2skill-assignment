const mongoose = require("mongoose");

const Data1Schema = new mongoose.Schema({
  full_name: String,
  email: String,
  number: String,
  city: String,
  url: String,
  team_name: String,
});

const Data1Model = mongoose.model("data1", Data1Schema);

module.exports = Data1Model;
