import React from 'react';
import { Artist } from '../../types';
import ArtistCard from '../ArtistCard/ArtistCard';
import { similarArtistsData } from '../../data';
import styles from './SimilarArtists.module.css';
import Slider from 'react-slick';

// Importamos los requeridos de CSS for react-slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SimilarArtists: React.FC = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 7, /*Ajustar aquí la cantidad de tarjetas mostradas, tenerlo en cuenta cuando hay separaciones muy grandes */
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
    <section className={styles.similarArtists}>
      <h2>Similar Artists</h2>
      <Slider {...settings}>
      
          {similarArtistsData.map((artist: Artist) => (
            <ArtistCard key={artist.id} {...artist} />
          ))}
        
      </Slider>
    </section>
  );
};

export default SimilarArtists;