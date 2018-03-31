// @flow
import React, { type Node } from 'react';
import styles from './movies-layout.sass';

type Props = {
  children: Node
};

const MoviesLayout = (props: Props) => (
  <div className={styles.MoviesLayout}>
    {props.children}
  </div>
);

export default MoviesLayout;
