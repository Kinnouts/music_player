import React, { useState } from 'react';
import styles from './PlaylistForm.module.css';

interface PlaylistFormProps {
  onSubmit: (playlist: { title: string; description: string; imageUrl: string }) => void;
}

const PlaylistForm: React.FC<PlaylistFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, imageUrl });
    setTitle('');
    setDescription('');
    setImageUrl('');
  };

  const isFormValid = title && description && imageUrl;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.formTitle}>Crear Nueva Playlist</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.input}
      />
      <input
        type="text"
        placeholder="URL de la imagen"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className={styles.input}
      />
      <button
        type="submit"
        disabled={!isFormValid}
        className={styles.submitButton}
      >
        Agregar playlist
      </button>
    </form>
  );
};

export default PlaylistForm;