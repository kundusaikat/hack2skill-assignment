const { Router } = require("express");
const Data2Model = require("../model/data2.model");

const dataRoutes = Router();

// Get all data
dataRoutes.get("/", async (req, res) => {
  try {
    const result = await Data2Model.aggregate([
      {
        $lookup: {
          from: "data1",
          localField: "email",
          foreignField: "email",
          as: "data1",
        },
      },
      {
        $unwind: "$data1",
      },
      {
        $project: {
          _id: 0,
          team_name: 1,
          full_name: "$data1.full_name",
          email: "$data1.email",
          number: "$data1.number",
          city: "$data1.city",
          url: "$data1.url",
        },
      },
    ]);

    res.json(result);
  } catch (err) {
    console.error("Failed to execute query", err);
    res.status(500).json({ error: "Failed to execute query" });
  }
});

module.exports = dataRoutes;
