import { IS_LOADING } from '../action-types';

const initialState = {
  active: false
};

export default function isLoading(state = initialState, action) {
  switch (action.type) {
    case IS_LOADING:
      return {
        active: action.payload.value
      };
    default:
      return state;
  }
}
