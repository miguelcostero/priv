// @flow
import React, { Node } from 'react';
import styles from './buttons-left-layout.sass';

type Props = {
  children: Node
};

const ButtonsLeftLayout = ({ children }: Props) => (
  <div className={styles.Left}>{children}</div>
);

export default ButtonsLeftLayout;
