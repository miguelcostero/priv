// @flow
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './search.sass';

type Props = {
  handleSubmit: () => void,
  setRef: () => void,
  handleChange: () => void,
  value: string
};

const Search = ({ handleSubmit, setRef, handleChange, value }: Props) => (
  <form className={styles.Search} onSubmit={handleSubmit}>
    <input
      ref={setRef}
      type="text"
      placeholder="Find your favourites movies..."
      name="search"
      onChange={handleChange}
      value={value}
    />
    <button type="submit">
      <FontAwesomeIcon icon={faSearch} />
    </button>
  </form>
);

export default Search;
