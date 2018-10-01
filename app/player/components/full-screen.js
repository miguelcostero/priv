// @flow
import { faCompress, faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './full-screen.sass';

type Props = {
  handleClick: () => void
};

export default function FullScreen({ handleClick }: Props) {
  return (
    <div className={styles.FullScreen}>
      <button type="button" onClick={handleClick}>
        {document.webkitIsFullScreen ? (
          <FontAwesomeIcon icon={faCompress} />
        ) : (
          <FontAwesomeIcon icon={faExpand} />
        )}
      </button>
    </div>
  );
}
