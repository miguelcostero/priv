// @flow
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Node } from 'react';
import styles from './modal.sass';

type Props = {
  children: Node,
  handleClick: () => void
};

const Modal = ({ children, handleClick }: Props) => (
  <div className={styles.Modal}>
    <div className={styles.Wrapper}>{children}</div>
    <button type="button" onClick={handleClick} className={styles.ModalClose}>
      <FontAwesomeIcon icon={faTimes} />
    </button>
  </div>
);

export default Modal;
