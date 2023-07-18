const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  publishedAt: Date,
  thumbnails: {
    default: {
      url: String,
      width: Number,
      height: Number,
    },
  },
});

const VideoModel = mongoose.model('Video', videoSchema);

module.exports = VideoModel;
