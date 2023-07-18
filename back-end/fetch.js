const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const Data1Model = require("./model/data1.model");
const Data2Model = require("./model/data2.model");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();

connectDB();
const app = express();

const data1 = JSON.parse(
  fs.readFileSync("./resources/MOCK-DATA-1.json", "utf8")
);
Data1Model.insertMany(data1)
  .then(() => console.log("Data inserted into collection Data1"))
  .catch((err) =>
    console.error("Failed to insert data into collection Data1", err)
  );

const data2 = JSON.parse(
  fs.readFileSync("./resources/MOCK-DATA-2.json", "utf8")
);
Data2Model.insertMany(data2)
  .then(() => console.log("Data inserted into collection Data2"))
  .catch((err) =>
    console.error("Failed to insert data into collection Data2", err)
  );

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
