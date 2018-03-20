// @flow
import React, { Component } from 'react';
import MovieDetails from '../components/movie-details/MovieDetails';

type Props = {
  match: {
    params: {
      id: string
    }
  }
};

export default class MovieDetailsPage extends Component<Props> {
  props: Props;

  render() {
    return (
      <MovieDetails
        movieId={parseInt(this.props.match.params.id, 10)}
      />
    );
  }
}
