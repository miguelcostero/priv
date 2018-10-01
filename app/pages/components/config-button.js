// @flow
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './config-button.sass';

type Props = {
  handleClick: () => void
};

const ConfigButton = ({ handleClick }: Props) => (
  <div
    className={styles.ConfigButton}
    onClick={handleClick}
    onKeyUp={() => {}}
    role="button"
    tabIndex="-1"
  >
    <FontAwesomeIcon icon={faCog} />
  </div>
);

export default ConfigButton;
