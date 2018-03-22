// @flow
import React from 'react';
import styles from './buttons-layout.sass';

type Props = {
  children: {}
};

const ButtonsLayout = (props: Props) => (
  <div className={styles.ButtonsLayout}>
    {props.children}
  </div>
);

export default ButtonsLayout;
