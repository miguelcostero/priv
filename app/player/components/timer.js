// @flow
import React from 'react';
import styles from './timer.sass';

type Props = {
  currentTime: number,
  duration: number
};

function leftPad(number) {
  const pad = '00';
  return pad.substring(0, pad.length - number.length) + number;
}

function formattedTime(secs) {
  const hours = parseInt(secs / 3600, 10);
  const minutes = parseInt((secs / 60) % 60, 10);
  const seconds = parseInt(secs % 60, 10);

  return (hours > 0) ?
    `${hours}:${leftPad(minutes.toString())}:${leftPad(seconds.toString())}`
    :
    `${minutes}:${leftPad(seconds.toString())}`;
}

export default function Timer(props: Props) {
  return (
    <div className={styles.Timer}>
      <p>
        <span>{formattedTime(props.currentTime)} / {formattedTime(props.duration)}</span>
      </p>
    </div>
  );
}
