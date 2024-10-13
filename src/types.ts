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

  export interface Channel {
    id: number;
    title: string;
    description: string;
    user: {
      id: number;
      username: string;
    };
    urls: {
      logo_image: {
        original: string;
      };
      banner_image: {
        original: string;
      };
    };
    category: {
      id: number;
      title: string;
    };
    follower_count: number;
    audio_clip_count: number;
  }
  
  export interface Playlist {
    id: number;
    title: string;
    description: string;
    user: {
      id: number;
      username: string;
    };
    audio_clips: AudioClip[];
    created_at: string;
    updated_at: string;
  }
  
  // Aliases para mayor claridad en el uso
  export type Song = AudioClip;
  export type Album = Playlist;
  export type Artist = Channel;
  
  
  
  
  
  
  