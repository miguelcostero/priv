// @flow
import React, { Component } from 'react';
import PlayPause from './play-pause';
import FullScreen from './full-screen';
import ProgressBar from './progress-bar';
import Volume from './volume';
import Timer from './timer';
import Subtitles from './subtitles';
import styles from './VideoControls.sass';

type Props = {
  downloaded: number,
  pause: boolean,
  currentTime: number,
  videoDuration: number,
  togglePlay: () => void,
  handleFullScreenClick: () => void,
  handleVolumeChange: () => void,
  volumeStatus: string,
  toggleMute: () => void,
  getRefVolumeRange: () => void,
  handleProgressChange: () => void,
  getProgressBarRef: () => void,
  subtitles: {},
  handleSubtitleChange: () => void,
  currentSubtitle: {}
};

export default class VideoControls extends Component<Props> {
  props: Props;

  render() {
    const {
      downloaded,
      currentTime,
      videoDuration,
      pause,
      togglePlay,
      handleFullScreenClick,
      handleVolumeChange,
      volumeStatus,
      toggleMute,
      getRefVolumeRange,
      handleProgressChange,
      getProgressBarRef,
      subtitles,
      handleSubtitleChange,
      currentSubtitle
    } = this.props;

    return (
      <div className={styles.Container}>
        <ProgressBar
          currentTime={currentTime}
          videoDuration={videoDuration}
          downloaded={downloaded * 100}
          handleProgressChange={handleProgressChange}
          setRef={getProgressBarRef}
        />
        <div className={styles.controls}>
          <div className={styles.left}>
            <PlayPause
              className={styles.buttonControl}
              pause={pause}
              handleClick={togglePlay}
            />
            <Volume
              handleVolumeChange={handleVolumeChange}
              status={volumeStatus}
              toggleMute={toggleMute}
              setRef={getRefVolumeRange}
            />
            <Timer
              duration={videoDuration}
              currentTime={currentTime}
            />
          </div>
          <div className={styles.right}>
            <Subtitles
              subtitles={subtitles}
              handleChange={handleSubtitleChange}
              currentSubtitle={currentSubtitle}
            />
            <FullScreen
              handleClick={handleFullScreenClick}
            />
          </div>
        </div>
      </div>
    );
  }
}
