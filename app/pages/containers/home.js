// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from '../../actions';
import HomeLayout from '../components/home-layout';
import Search from '../../widgets/containers/search';
import TopBar from '../components/top-bar';
import ConfigButton from '../components/config-button';
import MovieList from '../../movies/containers/movies';

type Props = {
  windowTitle: string,
  actions: {
    findMoviesList: (options?: {}) => void,
    updateWindowTitle: (title: string) => void
  },
  movies: []
};

class HomePage extends Component<Props> {
  props: Props;

  componentWillMount() {
    this.props.actions.updateWindowTitle('Priv - Watch movies for free');
  }

  componentDidMount() {
    this.props.actions.findMoviesList({
      sort_by: 'year'
    });
  }

  handleConfigButtonClick = () => {
    console.log('click config');
  }

  render() {
    document.title = this.props.windowTitle;

    return (
      <HomeLayout>
        <TopBar>
          <h1 style={{ fontWeight: 900 }}>
            <span style={{ color: '#0CCA4A' }}>P</span>riv
          </h1>

          <Search />
          <ConfigButton
            handleClick={this.handleConfigButtonClick}
          />
        </TopBar>
        <MovieList
          movies={this.props.movies}
        />
      </HomeLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.data.movies,
    windowTitle: state.documentTitle.title
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
