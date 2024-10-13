import React from 'react';
import { Artist } from '../../types';
import styles from './ArtistCard.module.css';

const ArtistCard: React.FC<Artist> = ({ name, image }) => {
  return (
    <div className={styles.artistCard}>
      <img src={image} alt={name} className={styles.image} />
      <p className={styles.name}>{name}</p>
    </div>
  );
};

export default ArtistCard;