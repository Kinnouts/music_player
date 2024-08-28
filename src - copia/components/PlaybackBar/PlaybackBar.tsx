import React from 'react';
import styles from './PlaybackBar.module.css';

const PlaybackBar: React.FC = () => {
  return (
    <div className={styles.playbackBar}>
      <div className={styles.songInfo}>
        <img src="/path/to/current-song-image.jpg" alt="Current song" className={styles.songImage} />
        <div>
          <p className={styles.songTitle}>Current Song Title</p>
          <p className={styles.songArtist}>Current Song Artist</p>
        </div>
      </div>
      <div className={styles.controls}>
        <button className={styles.controlButton}>Previous</button>
        <button className={styles.controlButton}>Play/Pause</button>
        <button className={styles.controlButton}>Next</button>
      </div>
      <div className={styles.progressBar}>
        <div className={styles.progress}></div>
      </div>
    </div>
  );
};

export default PlaybackBar;