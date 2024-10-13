import React from 'react';
import styles from './AlbumCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

interface AlbumCardProps {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({
  title,
  artist,
  imageUrl,
  isPlaying,
  onPlay,
  onPause
}) => {
  const handlePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  return (
    <div className={styles.albumCard}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={`${title} by ${artist}`} className={styles.albumImage} />
        <button className={styles.playPauseButton} onClick={handlePlayPause}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
      </div>
      <h3 className={styles.albumTitle}>{title}</h3>
      <p className={styles.albumArtist}>{artist}</p>
    </div>
  );
};

export default AlbumCard;