// @flow
import React from 'react';
import styles from './subtitles.sass';

type Props = {
  subtitles: [],
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
          props.subtitles.map(subtitle => (
            <option
              value={subtitle.langShort}
              key={subtitle.uuid}
            >
              {subtitle.lang.replace(/\b\w/g, l => l.toUpperCase())}
            </option>
          ))
        }
      </select>
    </div>
  );
}
