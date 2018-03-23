// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../widgets/containers/loader';
import HandleError from '../error/containers/handle-error';

type Props = {
  children: React.Node,
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

export default connect(mapStateToProps, null)(App);
