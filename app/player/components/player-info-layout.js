// @flow
import React, { Node } from 'react';
import styles from './player-info-layout.sass';

type Props = {
  hide: boolean,
  children: Node
};

let style;

const PlayerInfoLayout = ({ hide, children }: Props) => {
  if (hide) {
    style = {
      opacity: 1
    };
  } else {
    style = {
      opacity: 0
    };
  }

  return (
    <div className={styles.PlayerInfoLayout} style={style}>
      {children}
    </div>
  );
};

export default PlayerInfoLayout;
