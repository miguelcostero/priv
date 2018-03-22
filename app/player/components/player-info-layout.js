// @flow
import React from 'react';
import styles from './player-info-layout.sass';

type Props = {
  opacity: number,
  children: {}
};

const PlayerInfoLayout = (props: Props) => (
  <div
    className={styles.PlayerInfoLayout}
    style={{ opacity: props.opacity }}
  >
    {props.children}
  </div>
);

export default PlayerInfoLayout;
