// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as _ from 'lodash';
import * as Actions from '../../actions';
import MovieDetailsLayout from '../components/movie-details-layout';
import GoBack from '../components/go-back';
import MovieDetails from '../components/movie-details';
import ModalContainer from '../../widgets/containers/modal';
import Modal from '../../widgets/components/modal';

type Props = {
  match: {
    params: {
      id: string
    }
  },
  actions: {
    getMovieDetails: (id: number) => void,
    openModal: () => void,
    closeModal: () => void
  },
  movie: ?{},
  windowTitle: string,
  modal: {
    visibility: boolean
  }
};

class MovieDetailsPage extends Component<Props> {
  props: Props;
  state = {
    modal: {
      image: '',
    }
  }

  componentDidMount() {
    this.props.actions.getMovieDetails(this.props.match.params.id);
  }

  handleOpenModal = (image: number) => {
    console.log(`click ${image}`);

    this.setState({
      modal: {
        image: this.props.movie[`large_screenshot_image${image}`]
      }
    });

    this.props.actions.openModal();
  }

  handleCloseModal = () => {
    this.props.actions.closeModal();
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
            handleOpenModal={this.handleOpenModal}
          />
        }

        {
          this.props.modal.visibility &&
          <ModalContainer>
            <Modal
              handleClick={this.handleCloseModal}
            >
              <img src={this.state.modal.image} alt={movie.title_long} style={{ width: '100%' }} />
            </Modal>
          </ModalContainer>
        }
      </MovieDetailsLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    movie: state.data.currentMovie,
    windowTitle: state.documentTitle.title,
    modal: state.modal
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieDetailsPage));
