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
  }

  componentDidMount() {
    this.props.getRef(this.video);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pause !== this.props.pause) {
      this.togglePlay();
    }
  }

  togglePlay() {
    if (this.props.pause) {
      this.video.play();
    } else {
      this.video.pause();
    }

    this.setState({
      cursor: !this.state.cursor
    });
  }

  setRef = element => {
    this.video = element;
  }

  render() {
    return (
      <div
        className={styles.Container}
        onClick={this.props.handleClick}
        onKeyUp={this.props.handleKeyUp}
        role="button"
        tabIndex="0"
      >
        <video
          ref={this.setRef}
          onMouseMove={this.props.handleMouseMove}
          onTimeUpdate={this.props.handleTimeUpdate}
          onSeeking={this.props.handleSeeking}
          onSeeked={this.props.handleSeeked}
        >
          <track
            key={this.props.subtitle.srcLang}
            src={this.props.subtitle.src}
            kind="captions"
            srcLang={this.props.subtitle.srcLang}
            lang={this.props.subtitle.lang}
            default
          />
        </video>
      </div>
    );
  }
}
