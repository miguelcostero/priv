// @flow
import React, { Component } from 'react';
import styles from './video.sass';

type Props = {
  pause: boolean,
  handleMouseMove: () => void,
  handleTimeUpdate: () => void,
  handleKeyUp: () => void,
  handleClick: () => void,
  handleSeeking: () => void,
  handleSeeked: () => void,
  subtitle: {
    src?: string,
    srcLang?: string,
    lang?: string
  },
  getRef: () => void
};

export default class Video extends Component<Props> {
  props: Props;

  state = {
    cursor: true
  };

  componentDidMount() {
    const { getRef } = this.props;
    getRef(this.video);
  }

  componentWillReceiveProps(nextProps) {
    const { pause } = this.props;
    if (nextProps.pause !== pause) {
      this.togglePlay();
    }
  }

  togglePlay() {
    const { pause } = this.props;
    const { cursor } = this.state;

    if (pause) {
      this.video.play();
    } else {
      this.video.pause();
    }

    this.setState({
      cursor: !cursor
    });
  }

  setRef = element => {
    this.video = element;
  };

  render() {
    const {
      handleClick,
      handleKeyUp,
      handleMouseMove,
      handleTimeUpdate,
      handleSeeking,
      handleSeeked,
      subtitle
    } = this.props;
    return (
      <div
        className={styles.Container}
        onClick={handleClick}
        onKeyUp={handleKeyUp}
        role="button"
        tabIndex="0"
      >
        <video
          ref={this.setRef}
          onMouseMove={handleMouseMove}
          onTimeUpdate={handleTimeUpdate}
          onSeeking={handleSeeking}
          onSeeked={handleSeeked}
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
}
