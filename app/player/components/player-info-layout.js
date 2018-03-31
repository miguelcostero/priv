// @flow
import React from 'react';
import styles from './player-info-layout.sass';

type Props = {
  hide: boolean,
  children: {}
};

let style;

const PlayerInfoLayout = (props: Props) => {
  if (props.hide) {
    style = {
      opacity: 1,
      cursor: 'default'
    };
  } else {
    style = {
      opacity: 0,
      cursor: 'none'
    };
  }

  return (
    <div
      className={styles.PlayerInfoLayout}
      style={style}
    >
      {props.children}
    </div>
  );
};

export default PlayerInfoLayout;
