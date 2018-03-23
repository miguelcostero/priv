import {
  UPDATE_CURRENT_MOVIE,
  UPDATE_MOVIES_LIST
} from '../action-types';

const initialState = {
  movies: [],
  currentMovie: {}
};

export default function data(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CURRENT_MOVIE:
      return {
        currentMovie: action.payload.movie
      };
    case UPDATE_MOVIES_LIST:
      return {
        movies: action.payload.movies
      };
    default:
      return state;
  }
}
