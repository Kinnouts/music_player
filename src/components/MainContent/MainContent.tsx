import React, { useMemo } from 'react';
import ListenAgain from '../ListenAgain/ListenAgain';
import QuickPicks from '../QuickPicks/QuickPicks';
import RecommendedAlbums from '../RecomendedAlbums/RecomendedAlbums';
import SimilarArtists from '../SimilarArtists/SimilarArtists';
import styles from './MainContent.module.css';
import { AudioClip } from '../../types'; // Ajusta la ruta según sea necesario


interface MainContentProps {
  clips: AudioClip[];
  currentClip: AudioClip | null;
  isPlaying: boolean;
  onPlay: (clip: AudioClip) => void;
  onPause: () => void;
}

const MainContent: React.FC<MainContentProps> = ({
  clips,
  currentClip,
  isPlaying,
  onPlay,
  onPause
}) => {
  const {
    listenAgainClips,
    quickPicksClips,
    recommendedAlbumsClips,
    similarArtistsClips
  } = useMemo(() => {
    const shuffled = [...clips].sort(() => 0.5 - Math.random());
    return {
      listenAgainClips: shuffled.slice(0, 5),
      quickPicksClips: shuffled.slice(5, 20),
      recommendedAlbumsClips: shuffled.slice(20, 24),
      similarArtistsClips: shuffled.slice(24, 31)
    };
  }, [clips]);

  return (
    <div className={styles.mainContent}>
      <ListenAgain
        clips={listenAgainClips}
        currentClip={currentClip}
        isPlaying={isPlaying}
        onPlay={onPlay}
        onPause={onPause}
      />
      <QuickPicks
        clips={quickPicksClips}
        currentClip={currentClip}
        isPlaying={isPlaying}
        onPlay={onPlay}
        onPause={onPause}
      />
      <RecommendedAlbums
        clips={recommendedAlbumsClips}
        currentClip={currentClip}
        isPlaying={isPlaying}
        onPlay={onPlay}
        onPause={onPause}
      />
      <SimilarArtists
        clips={similarArtistsClips}
        currentClip={currentClip}
        isPlaying={isPlaying}
        onPlay={onPlay}
        onPause={onPause}
      />
    </div>
  );
};

export default MainContent;