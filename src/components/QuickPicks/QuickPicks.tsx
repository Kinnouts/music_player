import React from 'react';
import Slider from 'react-slick';
//import { AudioClip } from '../../AudioBoomServices';
import SongCard from '../SongCard/SongCard';
import styles from './QuickPicks.module.css';
import { AudioClip } from '../../types'; // Ajusta la ruta según sea necesario

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface QuickPicksProps {
  clips: AudioClip[];
  currentClip: AudioClip | null;
  isPlaying: boolean;
  onPlay: (clip: AudioClip) => void;
  onPause: () => void;
}

const QuickPicks: React.FC<QuickPicksProps> = ({ clips, currentClip, isPlaying, onPlay, onPause }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    rows: 3,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          rows: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: 3,
        }
      }
    ]
  };

  return (
    <section className={styles.quickPicks}>
      <h2>Quick Picks</h2>
      <div className={styles.songListContainer}>
        <Slider {...settings} className={styles.songList}>
          {clips.map((clip: AudioClip) => (
            <div key={clip.id} className={styles.songCardWrapper}>
              <SongCard 
                clip={clip}
                isPlaying={isPlaying && currentClip?.id === clip.id}
                onPlay={onPlay}
                onPause={onPause}
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default QuickPicks;