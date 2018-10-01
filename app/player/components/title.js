// @flow
import React from 'react';
import styles from './title.sass';

type Props = {
  title: string
};

const Title = ({ title }: Props) => (
  <div className={styles.Title}>
    <p>{title}</p>
  </div>
);

export default Title;
