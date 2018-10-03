import { UPDATE_DOCUMENT_TITLE } from '../action-types';

const initialState = {
  title: 'Priv'
};

export default function documentTitle(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DOCUMENT_TITLE:
      return {
        title: action.payload.value
      };
    default:
      return state;
  }
}
