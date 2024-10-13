import React from 'react';
import styles from './ArtistCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

interface ArtistCardProps {
  id: string;
  name: string;
  imageUrl: string;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({
  name,
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
    <div className={styles.artistCard}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={name} className={styles.artistImage} />
        <button className={styles.playPauseButton} onClick={handlePlayPause}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
      </div>
      <h3 className={styles.artistName}>{name}</h3>
    </div>
  );
};

export default ArtistCard;