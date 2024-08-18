import React from 'react';
import { Song } from '../../types';
import SongCard from '../SongCard/SongCard';
import { quickPicksData } from '../../data';
import styles from './QuickPicks.module.css';

const QuickPicks: React.FC = () => {
  return (
    <section className={styles.quickPicks}>
      <h2>Quick Picks</h2>
      <div className={styles.songListContainer}>
        <div className={styles.songList}>
          {quickPicksData.map((song: Song) => (
            <SongCard key={song.id} {...song} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickPicks;