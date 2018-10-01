// @flow
import React, { Node } from 'react';
import styles from './buttons-right-layout.sass';

type Props = {
  children: Node
};

const ButtonsRightLayout = ({ children }: Props) => (
  <div className={styles.Right}>{children}</div>
);

export default ButtonsRightLayout;
