// @flow
import React, { Component } from 'react';
import MoviesLayout from '../components/movies-layout';
import Card from '../components/movie-card';

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
