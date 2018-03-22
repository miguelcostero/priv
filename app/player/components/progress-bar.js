// @flow
import React from 'react';
import styles from './progress-bar.sass';

type Props = {
  currentTime: number,
  videoDuration: number,
  downloaded: number,
  handleProgressChange: () => void,
  setRef: () => void
};

export default function ProgressBar(props: Props) {
  return (
    <div
      className={styles.ProgressBarContainer}
      onClick={props.handleProgressChange}
      onKeyUp={() => {}}
      role="button"
      tabIndex="0"
      ref={props.setRef}
    >
      <div className={styles.ProgressBar}>
        <div
          className={styles.CurrentDownloadedBar}
          style={{ width: `${props.downloaded}%` }}
        />
        <div
          className={styles.CurrentTimeBar}
          style={{ width: `${(100 / props.videoDuration) * props.currentTime}%` }}
        />
      </div>
    </div>
  );
}
