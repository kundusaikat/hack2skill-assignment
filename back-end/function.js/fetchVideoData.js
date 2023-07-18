const VideoModel = require('../model/video.model');
const axios = require('axios');


const fetchLatestVideos = async () => {
    const apiKeys = [process.env.API_KEY1, process.env.API_KEY2, process.env.API_KEY3];
    let currentApiKeyIndex = 0;
  try {
    const searchQuery = 'football';
    const currentApiKey = apiKeys[currentApiKeyIndex];

    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${currentApiKey}&q=${searchQuery}&part=snippet&type=video&order=date&publishedAfter=2021-01-01T00:00:00Z`
    );

    const videos = response.data.items.map((item) => {
      return {
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnails: item.snippet.thumbnails,
      };
    });

    
    await VideoModel.insertMany(videos);
    console.log('Videos saved to the database');
  } catch (error) {
    console.log('Error fetching videos from YouTube API:', error.message);

    // If the error is due to reaching the API limit, switch to the next API key
    if (error.response && error.response.status === 403 && error.response.data.error.errors[0].reason === 'quotaExceeded') {
      currentApiKeyIndex = (currentApiKeyIndex + 1) % apiKeys.length;
      console.log('Switching to the next API key:', apiKeys[currentApiKeyIndex]);

      // Retry fetching videos with the next API key
      fetchLatestVideos();
    }
  }
};

module.exports = fetchLatestVideos;
