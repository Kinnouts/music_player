import React from 'react';
import Header from './components/Header/Header';
import ListenAgain from './components/ListenAgain/ListenAgain';
import QuickPicks from './components/QuickPicks/QuickPicks';
import RecommendedAlbums from './components/RecomendedAlbums/RecomendedAlbums';
import SimilarArtists from './components/SimilarArtists/SimilarArtists';
import PlaybackBar from './components/PlaybackBar/PlaybackBar';
import styles from './App.module.css';


const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.mainContent}>
        <ListenAgain />
        <QuickPicks />
        <RecommendedAlbums />
        <SimilarArtists />
      </main>
      <PlaybackBar />
    </div>
  );
}

export default App;