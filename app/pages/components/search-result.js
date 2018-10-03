// @flow
import React from 'react';
import MovieList from '../../movies/containers/movies';
import styles from './search-result.sass';

type Props = {
  result: []
};

const SearchResult = ({ result }: Props) => (
  <div className={styles.SearchResult}>
    <h1>Search result: ({result.length} movies found)</h1>
    <MovieList movies={result} />
  </div>
);

export default SearchResult;
