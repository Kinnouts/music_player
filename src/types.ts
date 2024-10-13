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