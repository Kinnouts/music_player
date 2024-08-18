import React from 'react';
import { Song } from '../../types';
import SongCard from '../SongCard/SongCard';
import { listenAgainData } from '../../data';
import styles from './ListenAgain.module.css';

const ListenAgain: React.FC = () => {
  return (
    <section className={styles.listenAgain}>
      <h2>Listen Again</h2>
      <div className={styles.songList}>
        {listenAgainData.map((song: Song) => (
          <SongCard 
            key={song.id} 
            title={song.title} 
            artist={song.artist} 
            image={song.image} 
            variant="hexagon" 
          />
        ))}
      </div>
    </section>
  );
};

export default ListenAgain;