// @flow
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import Player from '../../player/containers/player';

function mapStateToProps(state) {
  return {
    movie: state.data.currentMovie
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
  )(Player)
);
