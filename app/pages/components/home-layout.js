// @flow
import React, { Node } from 'react';
import styles from './home-layout.sass';

type Props = {
  children: Node
};

const HomeLayout = ({ children }: Props) => (
  <div className={styles.HomeLayout}>{children}</div>
);

export default HomeLayout;
