import React, { useState, useEffect } from 'react';
import styles from './PlaylistForm.module.css';

interface Playlist {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface PlaylistFormProps {
  onSubmit: (playlist: Playlist) => void;
  initialData?: Playlist | null;
}

const PlaylistForm: React.FC<PlaylistFormProps> = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setImageUrl(initialData.imageUrl);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initialData?.id || Date.now().toString(),
      title,
      description,
      imageUrl
    });
    setTitle('');
    setDescription('');
    setImageUrl('');
  };

  const isFormValid = title && description && imageUrl;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formContainer}>
        <div className={styles.formFields}>
          <h2 className={styles.formTitle}>{initialData ? 'Editar' : 'Crear Nueva'} Playlist</h2>
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
            {initialData ? 'Actualizar' : 'Agregar'} playlist
          </button>
        </div>
        {imageUrl && (
          <div className={styles.previewImageContainer}>
            <img
              src={imageUrl}
              alt="Vista previa de la imagen"
              className={styles.previewImage}
            />
          </div>
        )}
      </div>
    </form>
  );
};

export default PlaylistForm;