// @flow
import * as _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import { getMovieSuggestions } from '../../api';
import GoBack from '../components/go-back';
import MovieDetails from '../components/movie-details';
import MovieDetailsLayout from '../components/movie-details-layout';

type Props = {
  match: {
    params: {
      id: string
    }
  },
  actions: {
    findMovieDetails: (id: number) => void,
    openModal: () => void,
    closeModal: () => void
  },
  movie: ?{},
  windowTitle: string
};

class MovieDetailsPage extends Component<Props> {
  props: Props;
  state = {
    suggestions: []
  }

  componentDidMount() {
    this.getMovieDetails(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.getMovieDetails(newProps.match.params.id);
    }
  }

  getMovieDetails = (id: string) => {
    this.props.actions.findMovieDetails(id);

    getMovieSuggestions(parseInt(id, 10)).then(res => {
      this.setState({
        suggestions: res.data.movies
      });

      return true;
    }).catch(err => console.error(err, 'ERROR'));
  }

  render() {
    document.title = this.props.windowTitle;
    const { movie } = this.props;

    return (
      <MovieDetailsLayout>
        <GoBack path="/" />

        {
          (!_.isEmpty(movie)) &&
          <MovieDetails
            movie={movie}
            suggestions={this.state.suggestions}
          />
        }
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
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieDetailsPage));
