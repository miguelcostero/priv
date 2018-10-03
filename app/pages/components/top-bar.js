// @flow
import React, { Node } from 'react';
import styles from './top-bar.sass';

type Props = {
  children: Node
};

const TopBar = ({ children }: Props) => (
  <div className={styles.TopBar}>
    <div className={styles.Container}>{children}</div>
  </div>
);

export default TopBar;
