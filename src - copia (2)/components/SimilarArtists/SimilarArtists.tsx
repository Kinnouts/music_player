import React from 'react';
import { Artist } from '../../types';
import ArtistCard from '../ArtistCard/ArtistCard';
import { similarArtistsData } from '../../data';
import styles from './SimilarArtists.module.css';

const SimilarArtists: React.FC = () => {
  return (
    <section className={styles.similarArtists}>
      <h2>Similar Artists</h2>
      <div className={styles.artistList}>
        {similarArtistsData.map((artist: Artist) => (
          <ArtistCard key={artist.id} {...artist} />
        ))}
      </div>
    </section>
  );
};

export default SimilarArtists;