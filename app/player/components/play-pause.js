// @flow
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './play-pause.sass';

type Props = {
  pause: boolean,
  handleClick: () => void
};

export default function PlayPause({ pause, handleClick }: Props) {
  return (
    <div className={styles.PlayPause}>
      <button type="button" onClick={handleClick}>
        {pause ? (
          <FontAwesomeIcon icon={faPlay} />
        ) : (
          <FontAwesomeIcon icon={faPause} />
        )}
      </button>
    </div>
  );
}
