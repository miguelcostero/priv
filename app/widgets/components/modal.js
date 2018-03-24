// @flow
import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import styles from './modal.sass';

type Props = {
  children: React.Node,
  handleClick: () => void
};

const Modal = (props: Props) => (
  <div className={styles.Modal}>
    <div className={styles.Wrapper}>
      {props.children}
    </div>
    <button
      onClick={props.handleClick}
      className={styles.ModalClose}
    >
      <FontAwesomeIcon icon={faTimes} />
    </button>
  </div>
);

export default Modal;
