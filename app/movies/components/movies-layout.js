// @flow
import React from 'react';
import styles from './movies-layout.sass';

type Props = {
  children: React.Node
};

const MoviesLayout = (props: Props) => (
  <div className={styles.MoviesLayout}>
    {props.children}
  </div>
);

export default MoviesLayout;
