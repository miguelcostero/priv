// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as _ from 'lodash';
import * as MovieDetailsActions from '../../actions/movie-details';
import MovieDetailsLayout from '../components/movie-details-layout';
import GoBack from '../components/go-back';
import MovieDetails from '../components/movie-details';

type Props = {
  match: {
    params: {
      id: string
    }
  },
  actions: {
    getMovieDetails: (id: number) => void
  },
  movie: ?{},
  windowTitle: string
};

class MovieDetailsPage extends Component<Props> {
  props: Props;

  componentDidMount() {
    this.props.actions.getMovieDetails(this.props.match.params.id);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.movie.id !== nextProps.movie.id) {
      return true;
    }

    return false;
  }

  render() {
    document.title = this.props.windowTitle;
    const { movie } = this.props;

    return (
      <MovieDetailsLayout>
        <GoBack path="/" />
        {(!_.isEmpty(movie)) && <MovieDetails movie={movie} />}
      </MovieDetailsLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    movie: state.data.currentMovie,
    windowTitle: state.documentTitle.title
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(MovieDetailsActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieDetailsPage));
