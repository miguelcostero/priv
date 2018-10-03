// @flow
import React, { Node } from 'react';
import styles from './buttons-layout.sass';

type Props = {
  children: Node
};

const ButtonsLayout = ({ children }: Props) => (
  <div className={styles.ButtonsLayout}>{children}</div>
);

export default ButtonsLayout;
