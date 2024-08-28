import React, { useState } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import PlaylistForm from './components/PlaylistForm/PlaylistForm';
import PlaybackBar from './components/PlaybackBar/PlaybackBar';
import styles from './App.module.css';

interface Playlist {
  title: string;
  description: string;
  imageUrl: string;
}
const App: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [showPlaylistForm, setShowPlaylistForm] = useState(false);

  const addPlaylist = (playlist: Playlist) => {
    setPlaylists([...playlists, playlist]);
    setShowPlaylistForm(false);
  };

  const togglePlaylistForm = () => {
    setShowPlaylistForm(!showPlaylistForm);
  };

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.content}>
        <Sidebar 
          playlists={playlists} 
          onNewPlaylist={togglePlaylistForm}
          onHomeClick={() => setShowPlaylistForm(false)}
        />
        <main className={styles.mainContent}>
          {showPlaylistForm ? (
            <PlaylistForm onSubmit={addPlaylist} />
          ) : (
            <MainContent />
          )}
        </main>
      </div>
      <PlaybackBar />
    </div>
  );
}

export default App;