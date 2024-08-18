import React from 'react';
import styles from './SongCard.module.css';

interface SongCardProps {
  title: string;
  artist: string;
  image: string;
  variant?: 'default' | 'hexagon';
}

const SongCard: React.FC<SongCardProps> = ({ title, artist, image, variant = 'default' }) => {
  if (variant === 'hexagon') {
    return (
      <div className={styles.hexagonContainer}>
        <div className={styles.hexagonSongCard}>
          <img src={image} alt={`${title} by ${artist}`} />
        </div>
        <div className={styles.hexagonInfo}>
          <div className={styles.songTitle}>{title}</div>
          <div className={styles.songArtist}>{artist}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.songCard}>
      <img src={image} alt={`${title} by ${artist}`} />
      <div className={styles.songInfo}>
        <div className={styles.songTitle}>{title}</div>
        <div className={styles.songArtist}>{artist}</div>
      </div>
    </div>
  );
};

export default SongCard;