// @flow
import React from 'react';
import styles from './player-layout.sass';

type Props = {
  children: {},
  setRef: () => void,
  handleDoubleClick: () => void
};

const PlayerLayout = ({ children, setRef, handleDoubleClick }: Props) => (
  <div
    className={styles.PlayerLayout}
    ref={setRef}
    onDoubleClick={handleDoubleClick}
  >
    {children}
  </div>
);

export default PlayerLayout;
