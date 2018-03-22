import { UPDATE_CURRENT_MOVIE } from '../action-types';

const initialState = {
  currentMovie: {}
};

export default function data(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CURRENT_MOVIE:
      return {
        currentMovie: action.payload.movie
      };
    default:
      return state;
  }
}
