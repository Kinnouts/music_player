import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import PlaylistForm from './components/PlaylistForm/PlaylistForm';
import PlaybackBar from './components/PlaybackBar/PlaybackBar';
import styles from './App.module.css';
import { AudioClip } from './types';
import { fetchAudioClips } from './AudioBoomServices'; // Asegúrate de que esta función exista

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
  const [audioClips, setAudioClips] = useState<AudioClip[]>([]);
  const [currentClip, setCurrentClip] = useState<AudioClip | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadAudioClips = async () => {
      const clips = await fetchAudioClips();
      setAudioClips(clips);
    };
    loadAudioClips();
  }, []);

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

  const handlePlay = (clip: AudioClip) => {
    setCurrentClip(clip);
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleClosePlaybackBar = () => {
    setCurrentClip(null);
    setIsPlaying(false);
  };

  const handleNext = () => {
    const currentIndex = audioClips.findIndex(clip => clip.id === currentClip?.id);
    if (currentIndex < audioClips.length - 1) {
      setCurrentClip(audioClips[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const currentIndex = audioClips.findIndex(clip => clip.id === currentClip?.id);
    if (currentIndex > 0) {
      setCurrentClip(audioClips[currentIndex - 1]);
    }
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
              <MainContent 
                clips={audioClips}
                currentClip={currentClip}
                isPlaying={isPlaying}
                onPlay={handlePlay}
                onPause={handlePause}
              />
            )}
          </main>
        </div>
      </div>
      {currentClip && (
        <PlaybackBar 
          currentClip={currentClip}
          isPlaying={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={handlePause}
          onClose={handleClosePlaybackBar}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </div>
  );
}

export default App;