// @flow
import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/fontawesome-free-solid';
import styles from './config-button.sass';

type Props = {
  handleClick: () => void
};

const ConfigButton = (props: Props) => (
  <div
    className={styles.ConfigButton}
    onClick={props.handleClick}
    onKeyUp={() => {}}
    role="button"
    tabIndex="-1"
  >
    <FontAwesomeIcon icon={faCog} />
  </div>
);

export default ConfigButton;
