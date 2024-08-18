import React from 'react';
import { Album } from '../../types';
import styles from './AlbumCard.module.css';

const AlbumCard: React.FC<Album> = ({ title, artist, image }) => {
  return (
    <div className={styles.albumCard}>
      <img src={image} alt={`${title} by ${artist}`} className={styles.image} />
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.artist}>{artist}</p>
      </div>
    </div>
  );
};

export default AlbumCard;