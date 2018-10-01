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
