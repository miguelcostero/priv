// @flow
import React, { Component } from 'react';
import Card from '../components/movie-card';
import MoviesLayout from '../components/movies-layout';

type Props = {
  movies: [],
  perLine?: number
};

export default class MoviesContainer extends Component<Props> {
  props: Props;

  static defaultProps = {
    perLine: 5
  };

  render() {
    const { perLine, movies } = this.props;
    return (
      <MoviesLayout perLine={perLine}>
        {movies ? (
          movies.map(movie => <Card movie={movie} key={movie.id} />)
        ) : (
          <div>
            <h4>No movies found</h4>
          </div>
        )}
      </MoviesLayout>
    );
  }
}
