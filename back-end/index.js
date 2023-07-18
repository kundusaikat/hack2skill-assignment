const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const dataRoutes = require("./routes/data.route");
const dotenv = require("dotenv");
const videoRoutes = require("./routes/video.route");
const fetchLatestVideos = require("./function.js/fetchVideoData");
dotenv.config();

connectDB();
const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://192.168.29.152:3000",
  "http://127.0.0.1:3000",
  "https://hack2skill-assignment-client.onrender.com",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.get("", (req, res) => {
  res.send("Welcome to Hack2Skill Assignment.");
});

app.use("/data", dataRoutes);

// Run the fetchLatestVideos function every 10 seconds
setInterval(fetchLatestVideos, 10000);
// fetchLatestVideos();
app.use("/video", videoRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
