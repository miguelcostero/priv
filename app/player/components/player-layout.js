// @flow
import React from 'react';
import styles from './player-layout.sass';

type Props = {
  children: {},
  setRef: () => void,
  handleDoubleClick: () => void
};

const PlayerLayout = (props: Props) => (
  <div
    className={styles.PlayerLayout}
    ref={props.setRef}
    onDoubleClick={props.handleDoubleClick}
  >
    {props.children}
  </div>
);

export default PlayerLayout;
