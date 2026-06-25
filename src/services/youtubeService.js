import { search } from 'youtube-sr';

export const searchSongs = async (query) => {
  try {
    const results = await search(query, { limit: 10 });
    
    return results.map(video => ({
      id: video.id,
      title: video.title,
      artist: video.channel?.name || 'Unknown',
      duration: video.duration || 0,
      thumbnail: video.thumbnail,
      url: `https://www.youtube.com/watch?v=${video.id}`,
      type: 'video'
    }));
  } catch (error) {
    console.error('Error searching YouTube:', error);
    throw new Error('Failed to search songs');
  }
};

export const getTrending = async () => {
  try {
    const results = await search('trending music 2024', { limit: 20 });
    
    return results.map(video => ({
      id: video.id,
      title: video.title,
      artist: video.channel?.name || 'Unknown',
      duration: video.duration || 0,
      thumbnail: video.thumbnail,
      views: video.views || 0,
      url: `https://www.youtube.com/watch?v=${video.id}`
    }));
  } catch (error) {
    console.error('Error getting trending:', error);
    throw new Error('Failed to get trending songs');
  }
};