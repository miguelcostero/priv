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

export default function ProgressBar({
  handleProgressChange,
  setRef,
  downloaded,
  videoDuration,
  currentTime
}: Props) {
  return (
    <div
      className={styles.ProgressBarContainer}
      onClick={handleProgressChange}
      onKeyUp={() => {}}
      role="button"
      tabIndex="0"
      ref={setRef}
    >
      <div className={styles.ProgressBar}>
        <div
          className={styles.CurrentDownloadedBar}
          style={{ width: `${downloaded}%` }}
        />
        <div
          className={styles.CurrentTimeBar}
          style={{ width: `${(100 / videoDuration) * currentTime}%` }}
        />
      </div>
    </div>
  );
}
