// @flow
import React, { type Node } from 'react';
import styles from './movies-layout.sass';

type Props = {
  children: Node,
  perLine: number
};

const MoviesLayout = (props: Props) => (
  <div
    className={styles.MoviesLayout}
    style={{
      gridTemplateColumns: `repeat(${props.perLine}, 1fr)`
    }}
  >
    {props.children}
  </div>
);

export default MoviesLayout;
