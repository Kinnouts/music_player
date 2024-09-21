import React, { useState } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import PlaylistForm from './components/PlaylistForm/PlaylistForm';
import PlaybackBar from './components/PlaybackBar/PlaybackBar';
import styles from './App.module.css';

interface Playlist {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const App: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [editingPlaylist, setEditingPlaylist] = useState<Playlist | null>(null);
  const [showPlaylistForm, setShowPlaylistForm] = useState(false);

  const addPlaylist = (playlist: Omit<Playlist, 'id'>) => {
    const newPlaylist = { ...playlist, id: Date.now().toString() };
    setPlaylists([...playlists, newPlaylist]);
    setShowPlaylistForm(false);
  };

  const updatePlaylist = (updatedPlaylist: Playlist) => {
    setPlaylists(playlists.map(p => p.id === updatedPlaylist.id ? updatedPlaylist : p));
    setEditingPlaylist(null);
    setShowPlaylistForm(false);
  };

  const handleEditPlaylist = (id: string) => {
    const playlistToEdit = playlists.find(p => p.id === id);
    if (playlistToEdit) {
      setEditingPlaylist(playlistToEdit);
      setShowPlaylistForm(true);
    }
  };

  const togglePlaylistForm = () => {
    setShowPlaylistForm(!showPlaylistForm);
    setEditingPlaylist(null);
  };

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.mainContainer}>
        <Sidebar 
          playlists={playlists} 
          onNewPlaylist={togglePlaylistForm}
          onEditPlaylist={handleEditPlaylist}
          onHomeClick={() => {
            setShowPlaylistForm(false);
            setEditingPlaylist(null);
          }}
        />
        <div className={styles.mainWrapper}>
          <main className={styles.mainContent}>
            {showPlaylistForm ? (
              <PlaylistForm 
                onSubmit={editingPlaylist ? updatePlaylist : addPlaylist} 
                initialData={editingPlaylist}
              />
            ) : (
              <MainContent />
            )}
          </main>
        </div>
      </div>
      <PlaybackBar />
    </div>
  );
}

export default App;



