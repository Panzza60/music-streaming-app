import express from 'express';
import { searchSongs, getTrending } from '../services/youtubeService.js';

const router = express.Router();

router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    const songs = await searchSongs(q);
    res.json({
      success: true,
      query: q,
      results: songs,
      count: songs.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/trending', async (req, res) => {
  try {
    const trending = await getTrending();
    res.json({ success: true, data: trending, count: trending.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;