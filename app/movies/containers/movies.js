// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MoviesLayout from '../components/movies-layout';

type Props = {
  movies: []
};

export default class MoviesContainer extends Component<Props> {
  props: Props;

  render() {
    return (
      <MoviesLayout>
        {
          (this.props.movies) ?
            this.props.movies.map(movie => (
              <Link
                to={`/movie/${movie.id}`}
                key={movie.id}
              >
                <img src={movie.medium_cover_image} alt={movie.title_long} />
              </Link>
            ))
          :
            <div>
              <h4>No movies found</h4>
            </div>
        }
      </MoviesLayout>
    );
  }
}
