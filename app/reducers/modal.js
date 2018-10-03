import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../action-types';

const initialState = {
  visibility: false
};

export default function modal(state = initialState, action) {
  const clone = Object.assign({}, state);

  switch (action.type) {
    case OPEN_MODAL:
      clone.visibility = true;
      return clone;
    case CLOSE_MODAL:
      clone.visibility = false;
      return clone;
    default:
      return state;
  }
}
