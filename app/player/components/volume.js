// @flow
import {
  faVolumeDown,
  faVolumeOff,
  faVolumeUp
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import styles from './volume.sass';

type Props = {
  status: string,
  handleVolumeChange: () => void,
  toggleMute: () => void,
  setRef: () => void
};

export default class Volume extends Component<props> {
  props: Props;

  state = {
    icon: faVolumeUp
  };

  componentWillReceiveProps(nextProps) {
    let icon;

    switch (nextProps.status) {
      case 'up':
        icon = faVolumeUp;
        break;

      case 'down':
        icon = faVolumeDown;
        break;

      case 'mute':
        icon = faVolumeOff;
        break;

      default:
        icon = faVolumeUp;
        break;
    }

    this.setState({
      icon
    });
  }

  render() {
    const { handleVolumeChange, toggleMute, setRef } = this.props;
    const { icon } = this.state;

    return (
      <div className={styles.Volume}>
        <button type="button">
          <FontAwesomeIcon icon={icon} onClick={toggleMute} />

          <div className={styles.Range}>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              ref={setRef}
              onChange={handleVolumeChange}
            />
          </div>
        </button>
      </div>
    );
  }
}
