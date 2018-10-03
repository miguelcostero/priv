// @flow
import React, { Node } from 'react';
import styles from './controls.sass';

type Props = {
  children: Node
};

const Controls = ({ children }: Props) => (
  <div className={styles.Controls}>{children}</div>
);

export default Controls;
