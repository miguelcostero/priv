// @flow
import { Component, type Node } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: Node
};

class ModalContainer extends Component<Props> {
  props: Props;

  render() {
    return createPortal(
      this.props.children,
      document.getElementById('modal-container')
    );
  }
}

export default ModalContainer;
