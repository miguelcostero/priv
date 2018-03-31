// @flow
import React, { type Node } from 'react';
import styles from './top-bar.sass';

type Props = {
  children: Node
};

const TopBar = (props: Props) => (
  <div className={styles.TopBar}>
    <div className={styles.Container}>
      {props.children}
    </div>
  </div>
);

export default TopBar;
