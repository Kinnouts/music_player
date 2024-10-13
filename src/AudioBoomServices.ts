import axios from 'axios';

export interface AudioClip {
  id: number;
  title: string;
  channel: {
    title: string;
    urls: {
      logo_image: {
        original: string;
      };
    };
  };
  urls: {
    high_mp3: string;
  };
}

const API_URL = 'https://api.audioboom.com/audio_clips';

export const fetchAudioClips = async (): Promise<AudioClip[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data.body.audio_clips;
  } catch (error) {
    console.error('Error fetching audio clips:', error);
    return [];
  }
};