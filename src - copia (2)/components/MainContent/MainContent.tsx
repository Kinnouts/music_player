import React from 'react';
import ListenAgain from '../ListenAgain/ListenAgain';
import QuickPicks from '../QuickPicks/QuickPicks';
import RecommendedAlbums from '../RecomendedAlbums/RecomendedAlbums';
import SimilarArtists from '../SimilarArtists/SimilarArtists';
import styles from './MainContent.module.css';

const MainContent: React.FC = () => {
  return (
    <div className={styles.mainContent}>
      <ListenAgain />
      <QuickPicks />
      <RecommendedAlbums />
      <SimilarArtists />
    </div>
  );
};

export default MainContent;