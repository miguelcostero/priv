// @flow
import React, { Component } from 'react';
import styles from './Video.sass';

type Props = {
  setRef: () => void,
  handleMouseMove: () => void,
  handleMouseLeave: () => void,
  handleTimeUpdate: () => void,
  autoplay: boolean,
  controls: boolean,
  subtitle: {
    src?: string,
    srcLang?: string,
    lang?: string
  }
};

export default function Video(props: Props) {
  const {
    setRef,
    autoplay,
    controls,
    handleMouseMove,
    handleMouseLeave,
    handleTimeUpdate,
    subtitle
  } = props;

  return (
    <div
      className={styles.Container}
    >
      <video
        autoPlay={autoplay}
        ref={setRef}
        controls={controls}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTimeUpdate={handleTimeUpdate}
      >
        <track
          key={subtitle.srcLang}
          src={subtitle.src}
          kind="captions"
          srcLang={subtitle.srcLang}
          lang={subtitle.lang}
          default
        />
      </video>
    </div>
  );
}
