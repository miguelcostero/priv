// @flow
import React from 'react';
import styles from './video.sass';

type Props = {
  setRef: () => void,
  handleMouseMove: () => void,
  handleMouseLeave: () => void,
  handleTimeUpdate: () => void,
  handleKeyUp: () => void,
  handleClick: () => void,
  autoplay: boolean,
  controls: boolean,
  subtitle: {
    src?: string,
    srcLang?: string,
    lang?: string
  }
};

const Video = (props: Props) => (
  <div
    className={styles.Container}
    onClick={props.handleClick}
    onKeyUp={props.handleKeyUp}
    role="button"
    tabIndex="0"
  >
    <video
      autoPlay={props.autoplay}
      ref={props.setRef}
      controls={props.controls}
      onMouseMove={props.handleMouseMove}
      onMouseLeave={props.handleMouseLeave}
      onTimeUpdate={props.handleTimeUpdate}
    >
      <track
        key={props.subtitle.srcLang}
        src={props.subtitle.src}
        kind="captions"
        srcLang={props.subtitle.srcLang}
        lang={props.subtitle.lang}
        default
      />
    </video>
  </div>
);

export default Video;
