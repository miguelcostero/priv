// @flow
import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/fontawesome-free-solid';
import styles from './play-pause.sass';

type Props = {
  pause: boolean,
  handleClick: () => void
};

export default function PlayPause(props: Props) {
  return (
    <div className={styles.PlayPause}>
      <button
        onClick={props.handleClick}
      >
        {
          props.pause ?
            <FontAwesomeIcon icon={faPlay} />
          :
            <FontAwesomeIcon icon={faPause} />
        }
      </button>
    </div>
  );
}
