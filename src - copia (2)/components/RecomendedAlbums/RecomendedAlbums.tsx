import React from 'react';
import { Album } from '../../types';
import AlbumCard from '../AlbumCard/AlbumCard';
import { recommendedAlbumsData } from '../../data';
import styles from './RecomendedAlbums.module.css';
import Slider from 'react-slick';

// Importamos los requeridos de CSS for react-slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const RecomendedAlbums: React.FC = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
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
    <section className={styles.recomendedAlbums}>
      <h2>Recommended Albums</h2>
      <Slider {...settings}>
   
        {recommendedAlbumsData.map((album: Album) => (
          <AlbumCard key={album.id} {...album} />
        ))}
     
      </Slider>
    </section>
  );
};

export default RecomendedAlbums;