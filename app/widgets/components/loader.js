// @flow
import React from 'react';
import styles from './loader.sass';

const Loader = () => (
  <div className={styles.Container}>
    <div className={styles.Block}>
      <div className={styles.Eff}>
        <div className={styles.circle} />
        <div className={styles.circle} />
        <div className={styles.circle} />
      </div>
    </div>
  </div>
);

export default Loader;
