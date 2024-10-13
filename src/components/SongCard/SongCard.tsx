import React from 'react';
import styles from './SongCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { AudioClip } from '../../types';

interface SongCardProps {
  clip: AudioClip;
  isPlaying: boolean;
  onPlay: (clip: AudioClip) => void;
  onPause: () => void;
  variant?: 'default' | 'hexagon';
}

const SongCard: React.FC<SongCardProps> = ({
  clip,
  isPlaying,
  onPlay,
  onPause,
  variant = 'default'
}) => {
  const handleClick = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay(clip);
    }
  };

  const cardClass = variant === 'hexagon' ? styles.hexagonCard : styles.defaultCard;

  return (
    <div className={styles.songCardContainer}>
      <div 
        className={`${styles.songCard} ${cardClass} ${isPlaying ? styles.playing : ''}`} 
        onClick={handleClick}
      >
        <img src={clip.channel.urls.logo_image.original} alt={clip.title} />
        <div className={styles.overlay}>
          <FontAwesomeIcon 
            icon={isPlaying ? faPause : faPlay} 
            className={styles.playPauseIcon}
          />
        </div>
      </div>
      <div className={styles.songInfo}>
        <h3 className={styles.songTitle}>{clip.title}</h3>
        <p className={styles.songArtist}>{clip.channel.title}</p>
      </div>
    </div>
  );
};

export default SongCard;