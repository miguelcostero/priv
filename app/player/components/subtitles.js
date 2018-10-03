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

export default function Subtitles({
  currentSubtitle,
  handleChange,
  subtitles
}: Props) {
  return (
    <div className={styles.Subtitles}>
      <select value={currentSubtitle.srcLang || ''} onChange={handleChange}>
        <option value="" disabled>
          --subtitles--
        </option>
        {subtitles.map(subtitle => (
          <option value={subtitle.langShort} key={subtitle.uuid}>
            {subtitle.lang.replace(/\b\w/g, l => l.toUpperCase())}
          </option>
        ))}
      </select>
    </div>
  );
}
