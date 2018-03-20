// @flow
import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/fontawesome-free-solid';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Home.sass';

import SearchInput from '../search-input/SearchInput';
import { url } from '../../config/api';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;
  state = {
    movies: []
  }

  componentDidMount() {
    document.title = 'Priv - Watch movies for free';

    axios.get(`${url}/list_movies.json`, {
      params: {
        limit: 5,
        sort_by: 'download_count',
        with_rt_ratings: true
      }
    }).then(res => {
      this.setState({
        movies: res.data.data.movies
      });
      return true;
    }).catch(err => console.error(err));
  }

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <SearchInput />

        <div className={styles.title}>
          <h1>Popular Movies</h1>
        </div>
        <div className={styles.MoviesContainer}>
          {
            this.state.movies.map(movie => (
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <div className={styles.MoviesList}>
                  <img src={movie.large_cover_image} alt={movie.slug} />
                  <div className={styles.info}>
                    <h2>{movie.title}</h2>
                    <p className={styles.stats}>
                      <span className={styles.year}>{movie.year}</span>
                      <span className={styles.star}><FontAwesomeIcon icon={faStar} /></span>
                      <span style={{ marginLeft: '5px' }}>{movie.rating}</span>
                    </p>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    );
  }
}
