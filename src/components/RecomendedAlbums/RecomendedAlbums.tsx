import React from 'react';
//import { AudioClip } from '../../AudioBoomServices';
import AlbumCard from '../AlbumCard/AlbumCard';
import styles from './RecomendedAlbums.module.css';
import Slider from 'react-slick';
import { AudioClip } from '../../types'; // Ajusta la ruta según sea necesario

// Importamos los requeridos de CSS for react-slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface RecommendedAlbumsProps {
  clips: AudioClip[];
  currentClip: AudioClip | null;
  isPlaying: boolean;
  onPlay: (clip: AudioClip) => void;
  onPause: () => void;
}

const RecommendedAlbums: React.FC<RecommendedAlbumsProps> = ({ 
  clips, 
  currentClip, 
  isPlaying, 
  onPlay, 
  onPause 
}) => {
  if (clips.length === 0) {
    return null;
  }

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
    <section className={styles.recommendedAlbums}>
      <h2>Recommended Albums</h2>
      <Slider {...settings}>
        {clips.map((clip) => (
          <AlbumCard
            key={clip.id}
            id={clip.id.toString()}
            title={clip.title}
            artist={clip.channel.title}
            imageUrl={clip.channel.urls.logo_image.original}
            isPlaying={isPlaying && currentClip?.id === clip.id}
            onPlay={() => onPlay(clip)}
            onPause={onPause}
          />
        ))}
      </Slider>
    </section>
  );
};

export default RecommendedAlbums;