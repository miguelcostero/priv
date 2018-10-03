// @flow
import React, { Node } from 'react';
import styles from './movies-layout.sass';

type Props = {
  children: Node,
  perLine: number
};

const MoviesLayout = ({ perLine, children }: Props) => (
  <div
    className={styles.MoviesLayout}
    style={{
      gridTemplateColumns: `repeat(${perLine}, 1fr)`
    }}
  >
    {children}
  </div>
);

export default MoviesLayout;
