// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import moment from 'moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faStar, faEye } from '@fortawesome/fontawesome-free-solid';
import ImdbLogo from '../../assets/images/logo-imdb.svg';
import styles from './movie-details.sass';

type Props = {
  movie: {
    id: number,
    background_image: string,
    large_cover_image: string,
    title_long: string,
    genres: [],
    description_full: string,
    rating: number,
    mpa_rating: string,
    date_uploaded?: string,
    torrents: [],
    medium_screenshot_image1: string,
    medium_screenshot_image2: string,
    medium_screenshot_image3: string,
    slug: string
  }
};

const MovieDetails = (props: Props) => (
  <div className={styles.MovieContainer} style={{ backgroundImage: `url(${props.movie.background_image})` }}>
    <section className={styles.movieInfo}>
      <aside className={styles.Sidebar}>
        <img src={props.movie.large_cover_image} alt={props.movie.title_long} />
      </aside>
      <div className={styles.content}>
        <h1 className={styles.title}>{props.movie.title_long}</h1>
        <div className={styles.genres}>
          {
            props.movie.genres.map(genre => <span key={genre.uuid}>{genre.name}</span>)
          }
        </div>
        <p className={styles.description}>
          {props.movie.description_full}
        </p>
        <div className={styles.rating}>
          <img src={ImdbLogo} alt="IMDb Rating" />
          <span>{props.movie.rating}</span>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faStar} />
          </span>
        </div>
        {
          (props.movie.mpa_rating) &&
          <p className={styles.mpaRating}>
            <FontAwesomeIcon icon={faEye} />
            <span style={{ marginLeft: '10px' }}>{props.movie.mpa_rating}</span>
          </p>
        }
        {
          (props.movie.date_uploaded) &&
          <p className={styles.dateAdded}>
            {moment(props.movie.date_uploaded).format('MMMM Do YYYY, h:mm:ss a')}
          </p>
        }
        <div className={styles.PlayButtons}>
          {
            props.movie.torrents.map(torrent => (
              <Link to={`/player/${torrent.hash}`} key={torrent.hash}>
                <div className={styles.PlayButton}>
                  <span>Play {torrent.quality}</span>
                </div>
              </Link>
            ))
          }
        </div>

        <OwlCarousel
          className={styles.Screenshots}
          loop
          margin={5}
          nav
          autoWidth
        >
          <div className={styles.item}>
            <img src={props.movie.medium_screenshot_image1} alt={props.movie.slug} />
          </div>
          <div className={styles.item}>
            <img src={props.movie.medium_screenshot_image2} alt={props.movie.slug} />
          </div>
          <div className={styles.item}>
            <img src={props.movie.medium_screenshot_image3} alt={props.movie.slug} />
          </div>
        </OwlCarousel>
      </div>
    </section>
  </div>
);

export default MovieDetails;
