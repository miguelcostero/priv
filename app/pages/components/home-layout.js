// @flow
import * as React from 'react';
import styles from './home-layout.sass';

type Props = {
  children: React.Node
};

const HomeLayout = (props: Props) => (
  <div className={styles.HomeLayout}>
    {props.children}
  </div>
);

export default HomeLayout;
