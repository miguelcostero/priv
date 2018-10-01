// @flow
import * as _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import MovieList from '../../movies/containers/movies';
import AppSettings from '../../settings/containers/settings';
import Modal from '../../widgets/components/modal';
import ModalContainer from '../../widgets/containers/modal';
import Search from '../../widgets/containers/search';
import ConfigButton from '../components/config-button';
import HomeLayout from '../components/home-layout';
import SearchResult from '../components/search-result';
import TopBar from '../components/top-bar';

type Props = {
  windowTitle: string,
  actions: {
    findMoviesList: (options?: {}) => void,
    updateWindowTitle: (title: string) => void,
    updateSearchList: () => void,
    closeModal: () => void,
    openModal: () => void
  },
  movies: [],
  search: [],
  modal: {
    visibility: boolean
  }
};

class HomePage extends Component<Props> {
  props: Props;

  componentWillMount() {
    const { actions } = this.props;
    actions.updateWindowTitle('Priv - Watch movies for free');
  }

  componentDidMount() {
    const { movies, actions } = this.props;
    if (_.isEmpty(movies)) {
      actions.findMoviesList({
        sort_by: 'date_added,like_count'
      });
    }
  }

  handleConfigButtonClick = () => {
    const { actions } = this.props;
    actions.openModal();
  };

  handleCloseModal = () => {
    const { actions } = this.props;
    actions.closeModal();
  };

  render() {
    const { windowTitle, search, movies, modal } = this.props;
    document.title = windowTitle;

    return (
      <HomeLayout>
        <TopBar>
          <h1 style={{ fontWeight: 900 }}>
            <span style={{ color: '#0CCA4A' }}>P</span>
            riv
          </h1>

          <Search />
          <ConfigButton handleClick={this.handleConfigButtonClick} />
        </TopBar>
        {!_.isEmpty(search) && <SearchResult result={search} />}
        <div
          style={
            _.isEmpty(search) ? { paddingTop: '95px' } : { paddingTop: '30px' }
          }
        >
          <MovieList movies={movies} />
        </div>
        {modal.visibility && (
          <ModalContainer>
            <Modal handleClick={this.handleCloseModal}>
              <AppSettings />
            </Modal>
          </ModalContainer>
        )}
      </HomeLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.data.movies,
    windowTitle: state.documentTitle.title,
    search: state.data.searchResult,
    modal: state.modal
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomePage)
);
