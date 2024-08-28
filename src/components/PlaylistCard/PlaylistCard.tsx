import React from 'react';
import styles from './PlaylistCard.module.css';

interface PlaylistCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  onClick: (id: string) => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ id, title, description, imageUrl, onClick }) => {
  return (
    <div className={styles.card} onClick={() => onClick(id)}>
      <img src={imageUrl} alt={title} className={styles.image} />
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default PlaylistCard;