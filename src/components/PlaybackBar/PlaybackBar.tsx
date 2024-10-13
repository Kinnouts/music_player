import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, 
  faPause, 
  faStepBackward, 
  faStepForward, 
  faBackward, 
  faForward,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import styles from './PlaybackBar.module.css';
import { AudioClip } from '../../AudioBoomServices';

interface PlaybackBarProps {
  currentClip: AudioClip | null;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const PlaybackBar: React.FC<PlaybackBarProps> = ({ 
  currentClip, 
  isPlaying, 
  onPlay, 
  onPause, 
  onClose,
  onNext,
  onPrevious
}) => {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', () => setDuration(audio.duration));
    };
  }, [currentClip]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentClip]);

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setProgress(parseFloat(e.target.value));
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!currentClip) return null;

  return (
    <div className={styles.playbackBar}>
      <div className={styles.songInfo}>
        <img src={currentClip.channel.urls.logo_image.original} alt={currentClip.title} />
        <div>
          <div className={styles.songTitle}>{currentClip.title}</div>
          <div className={styles.songArtist}>{currentClip.channel.title}</div>
        </div>
      </div>
      <div className={styles.controls}>
        <button onClick={onPrevious} className={styles.controlButton}>
          <FontAwesomeIcon icon={faStepBackward} />
        </button>
        <button onClick={() => { if (audioRef.current) audioRef.current.currentTime -= 15; }} className={styles.controlButton}>
          <FontAwesomeIcon icon={faBackward} />
        </button>
        <button onClick={handlePlayPause} className={`${styles.controlButton} ${styles.playPauseButton}`}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
        <button onClick={() => { if (audioRef.current) audioRef.current.currentTime += 15; }} className={styles.controlButton}>
          <FontAwesomeIcon icon={faForward} />
        </button>
        <button onClick={onNext} className={styles.controlButton}>
          <FontAwesomeIcon icon={faStepForward} />
        </button>
      </div>
      <div className={styles.progressContainer}>
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
          className={styles.progressBar}
        />
        <span>{formatTime(duration)}</span>
      </div>
      <button onClick={onClose} className={styles.closeButton}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <audio
        ref={audioRef}
        src={currentClip.urls.high_mp3}
        onEnded={onPause}
      />
    </div>
  );
};

export default PlaybackBar;