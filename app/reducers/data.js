import {
  UPDATE_CURRENT_MOVIE,
  UPDATE_MOVIES_LIST,
  SEARCH_MOVIES
} from '../action-types';

const initialState = {
  movies: [],
  currentMovie: {},
  searchResult: []
};

export default function data(state = initialState, action) {
  const clone = Object.assign({}, state);

  switch (action.type) {
    case UPDATE_CURRENT_MOVIE:
      clone.currentMovie = action.payload.movie;
      return clone;
    case UPDATE_MOVIES_LIST:
      clone.movies = action.payload.movies;
      return clone;
    case SEARCH_MOVIES:
      clone.searchResult = action.payload.result;
      return clone;
    default:
      return state;
  }
}
