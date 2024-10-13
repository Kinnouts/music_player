import React, { createContext, useState, useContext, ReactNode, useCallback, useRef } from 'react';

interface AudioClip {
  id: number;
  title: string;
  user: {
    username: string;
  };
  urls: {
    image: string;
    high_mp3: string;
  };
}

interface PlaybackContextType {
  currentClip: AudioClip | null;
  isPlaying: boolean;
  isPlaybarVisible: boolean;
  playClip: (clip: AudioClip) => void;
  pauseClip: () => void;
  togglePlay: () => void;
  closePlaybar: () => void;
  seekForward: () => void;
  seekBackward: () => void;
}

const PlaybackContext = createContext<PlaybackContextType | undefined>(undefined);

export const usePlayback = () => {
  const context = useContext(PlaybackContext);
  if (!context) {
    throw new Error('usePlayback must be used within a PlaybackProvider');
  }
  return context;
};

export const PlaybackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentClip, setCurrentClip] = useState<AudioClip | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlaybarVisible, setIsPlaybarVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playClip = useCallback((clip: AudioClip) => {
    setCurrentClip(clip);
    setIsPlaying(true);
    setIsPlaybarVisible(true);
    if (audioRef.current) {
      audioRef.current.src = clip.urls.high_mp3;
      audioRef.current.play();
    }
  }, []);

  const pauseClip = useCallback(() => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  }, [isPlaying]);

  const closePlaybar = useCallback(() => {
    setCurrentClip(null);
    setIsPlaying(false);
    setIsPlaybarVisible(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const seekForward = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10; // Adelanta 10 segundos
    }
  }, []);

  const seekBackward = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10; // Retrocede 10 segundos
    }
  }, []);

  return (
    <PlaybackContext.Provider 
      value={{ 
        currentClip, 
        isPlaying, 
        isPlaybarVisible, 
        playClip, 
        pauseClip, 
        togglePlay, 
        closePlaybar,
        seekForward,
        seekBackward
      }}
    >
      {children}
      <audio ref={audioRef} />
    </PlaybackContext.Provider>
  );
};