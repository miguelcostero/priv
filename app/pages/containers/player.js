// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Player from '../../player/containers/player';
import * as Actions from '../../actions';

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Player));
