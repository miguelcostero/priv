// @flow
import React from 'react';
import styles from './subtitles.sass';

type Props = {
  subtitles: {},
  handleChange: () => void,
  currentSubtitle: {
    srcLang: string
  }
};

export default function Subtitles(props: Props) {
  return (
    <div className={styles.Subtitles}>
      <select
        value={props.currentSubtitle.srcLang || ''}
        onChange={props.handleChange}
      >
        <option value="" disabled>--subtitles--</option>
        {
          Object.keys(props.subtitles).map(key => (
            <option
              value={props.subtitles[key].langcode}
              key={key}
            >
              {props.subtitles[key].lang}
            </option>
          ))
        }
      </select>
    </div>
  );
}
