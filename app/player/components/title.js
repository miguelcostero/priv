// @flow
import React from 'react';
import styles from './title.sass';

type Props = {
  title: string
};

const Title = (props: Props) => (
  <div className={styles.Title}>
    <p>{props.title}</p>
  </div>
);

export default Title;
