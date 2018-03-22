// @flow
import React from 'react';
import styles from './controls.sass';

type Props = {
  children: {}
};

const Controls = (props: Props) => (
  <div className={styles.Controls}>
    {props.children}
  </div>
);

export default Controls;
