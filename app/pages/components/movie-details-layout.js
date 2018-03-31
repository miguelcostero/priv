import React, { type Node } from 'react';
import styles from './movie-details-layout.sass';

type Props = {
  children: Node
}

const MovieDetailsLayout = (props: Props) => (
  <div className={styles.MovieDetailsLayout}>
    {props.children}
  </div>
);

export default MovieDetailsLayout;
