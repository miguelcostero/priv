// @flow
import React, { Component, type Node } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Loader from '../widgets/containers/loader';
import HandleError from '../error/containers/handle-error';

type Props = {
  children: Node,
  loading: boolean
};

class App extends Component<Props> {
  props: Props;

  render() {
    return (
      <HandleError>
        {
          (this.props.loading) && <Loader />
        }

        <div>
          {this.props.children}
        </div>
      </HandleError>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.isLoading.active,
  };
}

export default withRouter(connect(mapStateToProps, null)(App));
