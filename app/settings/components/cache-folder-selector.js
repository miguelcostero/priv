// @flow
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './cache-folder-selector.sass';

type Props = {
  path: string,
  handleClick: () => void,
  setRef: () => void,
  handleChange: () => void
};

const CacheFolderSelector = ({
  path,
  handleClick,
  handleChange,
  setRef
}: Props) => (
  <div className={styles.CacheFolderSelector}>
    <div className={styles.Title}>
      <h3>Cache folder path</h3>
      <p>This is where all movies will be saved.</p>
    </div>

    <div className={styles.PathContainer}>
      <p>{path}</p>
      <button type="button" onClick={handleClick}>
        <FontAwesomeIcon icon={faFolderOpen} />
      </button>
    </div>

    <input
      type="file"
      ref={setRef}
      onChange={handleChange}
      webkitdirectory="true"
      style={{ display: 'none' }}
    />
  </div>
);

export default CacheFolderSelector;
