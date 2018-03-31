// @flow
import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/fontawesome-free-solid';
import styles from './cache-folder-selector.sass';

type Props = {
  path: string,
  handleClick: () => void,
  setRef: () => void,
  handleChange: () => void
};

const CacheFolderSelector = (props: Props) => (
  <div className={styles.CacheFolderSelector}>
    <div className={styles.Title}>
      <h3>Cache folder path</h3>
      <p>This is where all movies will be saved.</p>
    </div>

    <div className={styles.PathContainer}>
      <p>{props.path}</p>
      <button
        onClick={props.handleClick}
      >
        <FontAwesomeIcon icon={faFolderOpen} />
      </button>
    </div>

    <input
      type="file"
      ref={props.setRef}
      onChange={props.handleChange}
      webkitdirectory="true"
      style={{ display: 'none' }}
    />
  </div>
);

export default CacheFolderSelector;
