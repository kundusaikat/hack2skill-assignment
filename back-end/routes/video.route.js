const { Router } = require("express");

const videoRoutes = Router();

const VideoModel = require("../model/video.model");

// Define a route to retrieve video data
videoRoutes.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const videos = await VideoModel.find()
      .sort({ publishedAt: "desc" })
      .skip(skip)
      .limit(limit);

    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

videoRoutes.get("/videos/search", async (req, res) => {
  try {
    const query = req.query.q;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const videos = await VideoModel.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    })
      .sort({ publishedAt: "desc" })
      .skip(skip)
      .limit(limit);

    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = videoRoutes;
