import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, 
  faPause, 
  faStepBackward, 
  faStepForward, 
  faBackward, 
  faForward 
} from '@fortawesome/free-solid-svg-icons';
import styles from './PlaybackBar.module.css';

interface AudioClip {
  id: number;
  title: string;
  description: string;
  duration: number;
  channel: {
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

const PlaybackBar: React.FC = () => {
  const [audioClips, setAudioClips] = useState<AudioClip[]>([]);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchAudioClips();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (!isDragging) {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / (audio.duration || 1)) * 100);
      }
    };

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      if (isPlaying) {
        audio.play().catch(error => console.error("Error playing audio:", error));
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('durationchange', setAudioData);

    // Intentar obtener la duración inmediatamente
    if (audio.readyState >= 2) {
      setDuration(audio.duration);
    }

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('durationchange', setAudioData);
    };
  }, [currentClipIndex, isDragging, isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(error => console.error("Error playing audio:", error));
    }
  }, [currentClipIndex, isPlaying]);

  const fetchAudioClips = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.audioboom.com/audio_clips');
      const data = await response.json();
      if (data.body && data.body.audio_clips) {
        setAudioClips(data.body.audio_clips.slice(0, 15)); /*Los primeros quince clips de audio tomaré */
      }
    } catch (error) {
      console.error('Error fetching audio clips:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => console.error("Error playing audio:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrevious = () => {
    setCurrentClipIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : audioClips.length - 1
    );
    resetAudioState();
  };

  const handleNext = () => {
    setCurrentClipIndex((prevIndex) =>
      prevIndex < audioClips.length - 1 ? prevIndex + 1 : 0
    );
    resetAudioState();
  };

  const resetAudioState = () => {
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    // Mantenemos el estado de reproducción
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(error => console.error("Error playing next audio:", error));
    }
  };

  const handleSkipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 15, 0);
    }
  };

  const handleSkipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 15, audioRef.current.duration || 0);
    }
  };

  const handleProgressChange = (newProgress: number) => {
    if (!audioRef.current) return;
    
    const newTime = (newProgress / 100) * (audioRef.current.duration || 0);
    audioRef.current.currentTime = newTime;
    setProgress(newProgress);
    setCurrentTime(newTime);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleProgressChange(getProgressFromMouseEvent(e));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleProgressChange(getProgressFromMouseEvent(e));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getProgressFromMouseEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return 0;
    
    const progressBar = progressBarRef.current;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    return (clickPosition / progressBar.offsetWidth) * 100;
  };

  const formatTime = (time: number) => {
    if (!isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (isLoading) {
    return <div className={styles.playbackBar}>Loading...</div>;
  }

  if (audioClips.length === 0) {
    return <div className={styles.playbackBar}>No audio clips available.</div>;
  }

  const currentClip = audioClips[currentClipIndex];

  return (
    <div className={styles.playbackBar}>
      <span className={styles.songInfo}>
        <img
          src={currentClip.channel.urls.logo_image.original}
          alt="Current episode"
          className={styles.songImage}
        />
        <span>
          <p className={styles.songTitle}>
            {currentClip.title.length > 30
              ? `${currentClip.title.substring(0, 30)}...`
              : currentClip.title}
          </p>
          <p className={styles.songDescription}>
            {currentClip.description.length > 50
              ? `${currentClip.description.substring(0, 50)}...`
              : currentClip.description}
          </p>
        </span>
      </span>
      <div className={styles.rightSide}>
        <span className={styles.controls}>
          <button className={styles.controlButton} onClick={handlePrevious}>
            <FontAwesomeIcon icon={faStepBackward} />
          </button>
          <button className={styles.controlButton} onClick={handleSkipBackward}>
            <FontAwesomeIcon icon={faBackward} />
            <span className={styles.skipText}>15</span>
          </button>
          <button className={`${styles.controlButton} ${styles.playPauseButton}`} onClick={handlePlayPause}>
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>
          <button className={styles.controlButton} onClick={handleSkipForward}>
            <FontAwesomeIcon icon={faForward} />
            <span className={styles.skipText}>15</span>
          </button>
          <button className={styles.controlButton} onClick={handleNext}>
            <FontAwesomeIcon icon={faStepForward} />
          </button>
        </span>
        <div className={styles.progressContainer}>
          <div className={styles.timeInfo}>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div 
            className={styles.progressBarContainer} 
            ref={progressBarRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className={styles.progressBar}>
              <div
                className={styles.progress}
                style={{ width: `${progress}%` }}
              ></div>
              <div 
                className={styles.progressThumb}
                style={{ left: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={currentClip.urls.high_mp3}
        onEnded={handleNext}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default PlaybackBar;