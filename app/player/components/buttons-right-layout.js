// @flow
import React from 'react';
import styles from './buttons-right-layout.sass';

type Props = {
  children: {}
};

const ButtonsRightLayout = (props: Props) => (
  <div className={styles.Right}>
    {props.children}
  </div>
);

export default ButtonsRightLayout;
