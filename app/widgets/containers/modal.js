// @flow
import { Component, Node } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: Node
};

class ModalContainer extends Component<Props> {
  props: Props;

  render() {
    const { children } = this.props;
    return createPortal(children, document.getElementById('modal-container'));
  }
}

export default ModalContainer;
