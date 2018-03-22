// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Player from '../../player/containers/player';
import * as PlayerActions from '../../actions/player';

function mapStateToProps(state) {
  return {
    movie: state.data.currentMovie
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(PlayerActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Player));
