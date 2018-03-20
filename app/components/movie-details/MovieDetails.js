// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import uuid from 'uuid/v4';
import OwlCarousel from 'react-owl-carousel';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faStar, faEye } from '@fortawesome/fontawesome-free-solid';
import { url } from '../../config/api';
import styles from './MovieDetails.sass';
import ImdbLogo from '../../assets/images/logo-imdb.svg';

type Props = {
  movieId: number
};

export default class MovieDetailsPage extends Component<Props> {
  props: Props;
  state = {
    movie: null
  }

  componentDidMount() {
    axios.get(`${url}/movie_details.json`, {
      params: {
        movie_id: this.props.movieId,
        with_images: true,
        with_cast: true
      }
    }).then(res => {
      const { movie } = res.data.data;
      const genres = movie.genres.map(genre => ({
        name: genre,
        uuid: uuid()
      }));
      movie.genres = genres;

      this.setState({
        movie
      });

      document.title = this.state.movie.title_long;

      return true;
    }).catch(err => console.error(err, 'ERROR'));
  }

  render() {
    const { movie } = this.state;

    return (
      <div className={styles.Container}>
        <div className={styles.goBack}>
          <Link to="/">
            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
          </Link>
        </div>

        {
          (movie) ?
            <div className={styles.MovieContainer} style={{ backgroundImage: `url(${movie.background_image})` }}>
              <section className={styles.movieInfo}>
                <aside className={styles.Sidebar}>
                  <img src={movie.large_cover_image} alt={movie.title_long} />
                </aside>
                <div className={styles.content}>
                  <h1 className={styles.title}>{movie.title_long}</h1>
                  <div className={styles.genres}>
                    {
                      movie.genres.map(genre => <span key={genre.uuid}>{genre.name}</span>)
                    }
                  </div>
                  <p className={styles.description}>
                    {movie.description_full}
                  </p>
                  <div className={styles.rating}>
                    <img src={ImdbLogo} alt="IMDb Rating" />
                    <span>{movie.rating}</span>
                    <span className={styles.icon}>
                      <FontAwesomeIcon icon={faStar} />
                    </span>
                  </div>
                  <p className={styles.mpaRating}>
                    <FontAwesomeIcon icon={faEye} />
                    <span style={{ marginLeft: '10px' }}>{movie.mpa_rating}</span>
                  </p>
                  <p className={styles.dateAdded}>
                    {moment(movie.date_uploaded).format('MMMM Do YYYY, h:mm:ss a')}
                  </p>

                  <div className={styles.PlayButtons}>
                    {
                      movie.torrents.map(torrent => (
                        <Link to={`/player/${movie.id}/${torrent.hash}`} key={torrent.hash}>
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
                      <img src={movie.medium_screenshot_image1} alt={movie.slug} />
                    </div>
                    <div className={styles.item}>
                      <img src={movie.medium_screenshot_image2} alt={movie.slug} />
                    </div>
                    <div className={styles.item}>
                      <img src={movie.medium_screenshot_image3} alt={movie.slug} />
                    </div>
                  </OwlCarousel>
                </div>
              </section>
            </div>
          :
            <p>no movie</p>
        }
      </div>
    );
  }
}
