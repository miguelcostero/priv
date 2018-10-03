// @flow
import React, { Component, Node } from 'react';
import RegularError from '../components/regular-error';

type Props = {
  children: Node
};

export default class HandleError extends Component<Props> {
  props: Props;

  state = {
    handleError: false
  };

  componentDidCatch(error, info) {
    console.log(info, 'ERROR CATCHED');

    this.setState({
      handleError: true
    });
    // envía este error a un servicio como Sentry
  }

  render() {
    const { handleError } = this.state;
    const { children } = this.props;
    if (handleError) {
      return <RegularError />;
    }
    return children;
  }
}
