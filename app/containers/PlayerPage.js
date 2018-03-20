// @flow
import React, { Component } from 'react';
import Player from '../components/player/Player';

type Props = {
  match: {
    params: {
      hash: string,
      movieId: string
    }
  }
};

export default class PlayerPage extends Component<Props> {
  props: Props;

  render() {
    return (
      <Player
        movieId={this.props.match.params.movieId}
        movieHash={this.props.match.params.hash}
      />
    );
  }
}
