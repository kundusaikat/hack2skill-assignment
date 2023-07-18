const { Router } = require('express');

const videoRoutes = Router();

const VideoModel = require('../model/video.model');

// Define a route to retrieve video data
videoRoutes.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [videos, totalCount] = await Promise.all([
      VideoModel.find()
        .sort({ publishedAt: 'desc' })
        .skip(skip)
        .limit(limit),
      VideoModel.countDocuments(),
    ]);

    res.json({ videos, totalCount });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

videoRoutes.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const regexQuery = query.split(' ').map(term => `(?=.*${term})`).join('');
    const searchRegex = new RegExp(regexQuery, 'i');

    const [videos, totalCount] = await Promise.all([
      VideoModel.find({
        $or: [
          { title: searchRegex },
          { description: searchRegex },
        ],
      })
        .sort({ publishedAt: 'desc' })
        .skip(skip)
        .limit(limit),
      VideoModel.countDocuments({
        $or: [
          { title: searchRegex },
          { description: searchRegex },
        ],
      }),
    ]);

    res.json({ videos, totalCount });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = videoRoutes;
