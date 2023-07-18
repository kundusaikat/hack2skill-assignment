const express = require("express");
const connectDB = require("./config/db");

const dataRoutes = require("./routes/data.route");
const dotenv = require("dotenv");
const videoRoutes = require("./routes/video.route");
const fetchLatestVideos = require("./function.js/fetchVideoData");
dotenv.config();

connectDB();
const app = express();

app.get("", (req, res) => {
  res.send("Welcome to Hack2Skill Assignment.");
});

app.use("/data", dataRoutes);

// Run the fetchLatestVideos function every 10 seconds
setInterval(fetchLatestVideos, 30000);
// fetchLatestVideos();
app.use("/video", videoRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
