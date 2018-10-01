import React, { Node } from 'react';
import styles from './movie-details-layout.sass';

type Props = {
  children: Node
};

const MovieDetailsLayout = ({ children }: Props) => (
  <div className={styles.MovieDetailsLayout}>{children}</div>
);

export default MovieDetailsLayout;
