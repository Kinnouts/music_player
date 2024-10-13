import React from 'react';
import Slider from 'react-slick';
import { Song } from '../../types';
import SongCard from '../SongCard/SongCard';
import { quickPicksData } from '../../data';
import styles from './QuickPicks.module.css';

// Asegúrate de importar los estilos de react-slick en tu archivo principal
 import 'slick-carousel/slick/slick.css';
 import 'slick-carousel/slick/slick-theme.css';

 const QuickPicks: React.FC = () => {
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
          {quickPicksData.map((song: Song) => (
            <div key={song.id} className={styles.songCardWrapper}>
              <SongCard {...song} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default QuickPicks;