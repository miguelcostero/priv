// @flow
import React, { Component } from 'react';
import MoviesLayout from '../components/movies-layout';
import Card from '../components/movie-card';

type Props = {
  movies: [],
  perLine?: number
};

export default class MoviesContainer extends Component<Props> {
  props: Props;
  static defaultProps = {
    perLine: 5
  }

  render() {
    return (
      <MoviesLayout
        perLine={this.props.perLine}
      >
        {
          (this.props.movies) ?
            this.props.movies.map(movie => (
              <Card
                movie={movie}
                key={movie.id}
              />
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
