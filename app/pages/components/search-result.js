// @flow
import React from 'react';
import MovieList from '../../movies/containers/movies';
import styles from './search-result.sass';

type Props = {
  result: []
};

const SearchResult = (props: Props) => (
  <div className={styles.SearchResult}>
    <h1>Search result: ({props.result.length} movies found)</h1>
    <MovieList
      movies={props.result}
    />
  </div>
);

export default SearchResult;
