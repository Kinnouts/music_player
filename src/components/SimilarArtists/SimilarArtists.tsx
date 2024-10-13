import React from 'react';
//import { AudioClip } from '../../AudioBoomServices';
import ArtistCard from '../ArtistCard/ArtistCard';
import styles from './SimilarArtists.module.css';
import Slider from 'react-slick';
import { AudioClip } from '../../types'; // Ajusta la ruta según sea necesario

// Importamos los requeridos de CSS for react-slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface SimilarArtistsProps {
  clips: AudioClip[];
  currentClip: AudioClip | null;
  isPlaying: boolean;
  onPlay: (clip: AudioClip) => void;
  onPause: () => void;
}

const SimilarArtists: React.FC<SimilarArtistsProps> = ({ 
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
    slidesToShow: 7,
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
        {clips.map((clip) => (
          <ArtistCard
            key={clip.id}
            id={clip.id.toString()}
            name={clip.channel.title}
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

export default SimilarArtists;