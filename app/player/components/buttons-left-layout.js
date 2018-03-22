// @flow
import React from 'react';
import styles from './buttons-left-layout.sass';

type Props = {
  children: {}
};

const ButtonsLeftLayout = (props: Props) => (
  <div className={styles.Left}>
    {props.children}
  </div>
);

export default ButtonsLeftLayout;
