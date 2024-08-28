import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import styles from './PlaybackBar.module.css';
import { currentSong } from '../../data'; // Importamos currentSong desde song.ts

const PlaybackBar: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={styles.playbackBar}>
      <span className={styles.songInfo}>
        <img src={currentSong.image} alt="Current song" className={styles.songImage} />
        <span>
          <p className={styles.songTitle}>{currentSong.name}</p>
          <p className={styles.songArtist}>{currentSong.artist}</p>
        </span>
      </span>
      <div className={styles.rightSide}>
        <span className={styles.controls}>
          <button className={styles.controlButton}>
            <FontAwesomeIcon icon={faStepBackward} />
          </button>
          <button className={styles.controlButton} onClick={handlePlayPause}>
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>
          <button className={styles.controlButton}>
            <FontAwesomeIcon icon={faStepForward} />
          </button>
        </span>
        <div className={styles.progressBar}>
          <div className={styles.progress}></div>
        </div>
      </div>
    </div>
  );
};

export default PlaybackBar;