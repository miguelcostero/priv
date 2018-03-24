// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as _ from 'lodash';
import * as Actions from '../../actions';
import HomeLayout from '../components/home-layout';
import Search from '../../widgets/containers/search';
import TopBar from '../components/top-bar';
import ConfigButton from '../components/config-button';
import MovieList from '../../movies/containers/movies';
import ModalContainer from '../../widgets/containers/modal';
import Modal from '../../widgets/components/modal';
import SearchResult from '../components/search-result';

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
    this.props.actions.updateWindowTitle('Priv - Watch movies for free');
  }

  componentDidMount() {
    if (_.isEmpty(this.props.movies)) {
      this.props.actions.findMoviesList({
        sort_by: 'date_added,like_count'
      });
    }
  }

  handleConfigButtonClick = () => {
    console.log('click config');
    this.props.actions.openModal();
  }

  handleCloseModal = () => {
    this.props.actions.closeModal();
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
        {
          (!_.isEmpty(this.props.search)) &&
          <SearchResult
            result={this.props.search}
          />
        }
        <div
          style={(_.isEmpty(this.props.search)) ? { paddingTop: '95px' } : { paddingTop: '30px' }}
        >
          <MovieList
            movies={this.props.movies}
          />
        </div>
        {
          this.props.modal.visibility &&
          <ModalContainer>
            <Modal
              handleClick={this.handleCloseModal}
            >
              <h1>Configurations</h1>
            </Modal>
          </ModalContainer>
        }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
