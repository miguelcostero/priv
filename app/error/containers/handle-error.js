// @flow
import React, { Component } from 'react';
import RegularError from '../components/regular-error';

type Props = {
  children: React.Node
}

export default class HandleError extends Component<Props> {
  props: Props;

  state = {
    handleError: false,
  }

  componentDidCatch(error, info) {
    console.log(info, 'ERROR CATCHED');

    this.setState({
      handleError: true,
    });
    // envía este error a un servicio como Sentry
  }

  render() {
    if (this.state.handleError) {
      return (
        <RegularError />
      );
    }
    return this.props.children;
  }
}
