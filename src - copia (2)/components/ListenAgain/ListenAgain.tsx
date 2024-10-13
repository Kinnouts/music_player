import React from 'react';
import { Song } from '../../types';
import SongCard from '../SongCard/SongCard';
import { listenAgainData } from '../../data';
import styles from './ListenAgain.module.css';
import Slider from 'react-slick';

// Importamos los requeridos de CSS for react-slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ListenAgain: React.FC = () => {
  
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
  return (
    <section className={styles.listenAgain}>
      <h2>Listen Again</h2>
      <Slider {...settings}>
        {listenAgainData.map((song: Song) => (
          <SongCard 
            key={song.id} 
            title={song.title} 
            artist={song.artist} 
            image={song.image} 
            variant="hexagon" 
          />
        ))}
      </Slider>
    </section>
  );
};

export default ListenAgain;