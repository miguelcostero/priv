// @flow
import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/fontawesome-free-solid';
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

const MovieCard = (props: Props) => (
  <Link to={`/movie/${props.movie.id}`}>
    <div className={styles.MovieCard}>
      <img
        src={props.movie.medium_cover_image || props.movie.small_cover_image}
        alt={props.movie.title_long}
      />

      <div className={styles.Info}>
        <div style={{ overflow: 'hidden' }}>
          <h1>{props.movie.title}</h1>
          <div className={styles.year}>
            <span>{props.movie.year}</span>
          </div>
          <div className={styles.rating}>
            <FontAwesomeIcon icon={faStar} />
            <span>{props.movie.rating}</span>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default MovieCard;

