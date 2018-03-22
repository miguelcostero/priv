// @flow
import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faExpand, faCompress } from '@fortawesome/fontawesome-free-solid';
import styles from './full-screen.sass';

type Props = {
  handleClick: () => void
};

export default function FullScreen(props: Props) {
  return (
    <div className={styles.FullScreen}>
      <button
        onClick={props.handleClick}
      >
        {
          document.webkitIsFullScreen ?
            <FontAwesomeIcon icon={faCompress} />
          :
            <FontAwesomeIcon icon={faExpand} />
        }
      </button>
    </div>
  );
}
