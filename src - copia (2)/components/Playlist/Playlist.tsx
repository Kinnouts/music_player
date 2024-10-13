import React from 'react';
import styles from './Playlist.module.css';

interface PlaylistProps {
  title: string;
  description: string;
  imageUrl: string;
}

const Playlist: React.FC<PlaylistProps> = ({ title, description, imageUrl }) => {
  return (
    <div className={styles.playlist}>
      <img src={imageUrl} alt={title} className={styles.image} />
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default Playlist;