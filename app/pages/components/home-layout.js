// @flow
import React, { type Node } from 'react';
import styles from './home-layout.sass';

type Props = {
  children: Node
};

const HomeLayout = (props: Props) => (
  <div className={styles.HomeLayout}>
    {props.children}
  </div>
);

export default HomeLayout;
