// @flow
import { UPDATE_CURRENT_MOVIE } from '../action-types';

export function updateCurrentMovieSubtitles(movie) {
  return {
    type: UPDATE_CURRENT_MOVIE,
    payload: {
      movie
    }
  };
}
