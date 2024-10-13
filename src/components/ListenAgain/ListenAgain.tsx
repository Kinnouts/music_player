import React from 'react';
import SongCard from '../SongCard/SongCard';
import { AudioClip } from '../../types';
import styles from './ListenAgain.module.css';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ListenAgainProps {
  clips: AudioClip[];
  currentClip: AudioClip | null;
  isPlaying: boolean;
  onPlay: (clip: AudioClip) => void;
  onPause: () => void;
}

const ListenAgain: React.FC<ListenAgainProps> = ({ 
  clips, 
  currentClip, 
  isPlaying, 
  onPlay, 
  onPause 
}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '60px',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerPadding: '40px',
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: '30px',
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '20px',
        }
      }
    ]
  };

  return (
    <section className={styles.listenAgain}>
      <h2>Listen Again</h2>
      <div className={styles.sliderContainer}>
        <Slider {...settings}>
          {clips.map((clip) => (
            <div key={clip.id} className={styles.slideItem}>
              <SongCard 
                clip={clip}
                isPlaying={isPlaying && currentClip?.id === clip.id}
                onPlay={() => onPlay(clip)}
                onPause={onPause}
                variant="hexagon"
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ListenAgain;