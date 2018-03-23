// @flow
import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/fontawesome-free-solid';
import styles from './search.sass';

type Props = {
  handleSubmit: () => void,
  setRef: () => void,
  handleChange: () => void,
  value: string
};

const Search = (props: Props) => (
  <form
    className={styles.Search}
    onSubmit={props.handleSubmit}
  >
    <input
      ref={props.setRef}
      type="text"
      placeholder="Find your favourites movies..."
      name="search"
      onChange={props.handleChange}
      value={props.value}
    />
    <button type="submit">
      <FontAwesomeIcon icon={faSearch} />
    </button>
  </form>
);

export default Search;
