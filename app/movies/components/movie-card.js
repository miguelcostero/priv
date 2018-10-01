// @flow
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './movie-card.sass';

type Props = {
  movie: {
    id: number,
    title: string,
    title_long: string,
    large_cover_image?: string,
    medium_cover_image?: string,
    small_cover_image: string,
    year: number,
    rating: number
  }
};

const MovieCard = ({ movie }: Props) => (
  <Link to={`/movie/${movie.id}`}>
    <div className={styles.MovieCard}>
      <img
        src={movie.medium_cover_image || movie.small_cover_image}
        alt={movie.title_long}
      />

      <div className={styles.Info}>
        <div style={{ overflow: 'hidden' }}>
          <h1>{movie.title}</h1>
          <div className={styles.year}>
            <span>{movie.year}</span>
          </div>
          <div className={styles.rating}>
            <FontAwesomeIcon icon={faStar} />
            <span>{movie.rating}</span>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default MovieCard;
