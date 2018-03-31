// @flow
import * as React from 'react';
import styles from './title.sass';

type Props = {
  title: string
};

const Title = (props: Props) => (
  <div className={styles.Title}>
    <h1>{props.title}</h1>
  </div>
);

export default Title;
