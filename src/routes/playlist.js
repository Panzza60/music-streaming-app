import express from 'express';

const router = express.Router();
const playlists = new Map();
let playlistId = 1;

router.post('/create', (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Playlist name is required' });
    }

    const newPlaylist = {
      id: playlistId++,
      name,
      description: description || '',
      songs: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    playlists.set(newPlaylist.id, newPlaylist);
    res.status(201).json({ success: true, data: newPlaylist });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/', (req, res) => {
  const allPlaylists = Array.from(playlists.values());
  res.json({ success: true, data: allPlaylists, count: allPlaylists.length });
});

router.post('/:id/add-song', (req, res) => {
  try {
    const { id } = req.params;
    const { song } = req.body;
    const playlist = playlists.get(parseInt(id));
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });
    if (playlist.songs.some(s => s.id === song.id)) {
      return res.status(400).json({ error: 'Song already in playlist' });
    }
    playlist.songs.push(song);
    res.json({ success: true, data: playlist });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/:id/remove-song/:songId', (req, res) => {
  try {
    const { id, songId } = req.params;
    const playlist = playlists.get(parseInt(id));
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });
    playlist.songs = playlist.songs.filter(s => s.id !== songId);
    res.json({ success: true, data: playlist });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  if (!playlists.has(parseInt(id))) {
    return res.status(404).json({ error: 'Playlist not found' });
  }
  playlists.delete(parseInt(id));
  res.json({ success: true, message: 'Playlist deleted' });
});

export default router;