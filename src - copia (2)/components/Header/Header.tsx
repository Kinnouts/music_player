import React from 'react';
import styles from './Header.module.css';
import UserImage from '../../public/user.jpg';
import MusicIcon from '../../public/music-icon.jpeg'

// Supongamos que el nombre del usuario viene de props o de un contexto
const userName = "Samantha"; // Reemplaza esto con el nombre del usuario dinámico
const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={MusicIcon} alt="Music Logo" />
        <span>Music</span>
      </div>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search" />
      </div>
      <div className={styles.userProfile}>
      <span className={styles.greeting}>Hola, {userName}!</span>
      <img src={UserImage} alt="User Avatar" />
      </div>
    </header>
  );
};

export default Header;