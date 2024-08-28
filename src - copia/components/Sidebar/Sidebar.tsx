import React from 'react';
import { Home, PlusCircle } from 'lucide-react';
import styles from './Sidebar.module.css';
import Playlist from '../Playlist/Playlist';

interface PlaylistData {
  title: string;
  description: string;
  imageUrl: string;
}

interface SidebarProps {
  playlists: PlaylistData[];
  onNewPlaylist: () => void;
  onHomeClick: () => void;}

  const Sidebar: React.FC<SidebarProps> = ({ playlists, onNewPlaylist, onHomeClick }) => {
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
          {playlists.map((playlist, index) => (
            <Playlist key={index} {...playlist} />
          ))}
        </div>
      </div>
    );
  };
  
  export default Sidebar;