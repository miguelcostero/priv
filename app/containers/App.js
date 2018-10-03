// @flow
import React, { Component, Node } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import HandleError from '../error/containers/handle-error';
import Loader from '../widgets/containers/loader';

type Props = {
  children: Node,
  loading: boolean
};

class App extends Component<Props> {
  props: Props;

  render() {
    const { loading, children } = this.props;
    return (
      <HandleError>
        {loading && <Loader />}

        <div>{children}</div>
      </HandleError>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.isLoading.active
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(App)
);
