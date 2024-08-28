import React from 'react';
import { Home, PlusCircle } from 'lucide-react';
import styles from './Sidebar.module.css';
import PlaylistCard from '../PlaylistCard/PlaylistCard';

interface Playlist {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface SidebarProps {
  playlists: Playlist[];
  onNewPlaylist: () => void;
  onEditPlaylist: (id: string) => void;
  onHomeClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ playlists, onNewPlaylist, onEditPlaylist, onHomeClick }) => {
  return (
    <div className={styles.sidebar}>
      <button className={styles.button} onClick={onHomeClick}>
        <Home className={styles.icon} />
        Home
      </button>
      <button
        className={styles.button}
        onClick={onNewPlaylist}
      >
        <PlusCircle className={styles.icon} />
        Nueva Playlist
      </button>
      
      <div className={styles.playlistsContainer}>
        <h2 className={styles.playlistsTitle}>Playlists</h2>
        {playlists.map((playlist) => (
          <PlaylistCard 
            key={playlist.id}
            {...playlist}
            onClick={onEditPlaylist}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;