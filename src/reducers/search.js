import {
  SEARCH_LOAD,
  SEARCH_LOAD_OK,
  SEARCH_LOAD_KO
} from '../actions/types';

const defaultState = {
  query: "",
  results: null,
  loading: false,
  error: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SEARCH_LOAD:
      return {
        ...state,
        error: false,
        loading: true,
        query: action.payload,
      };
    case SEARCH_LOAD_OK:
      return {
        ...state,
        error: false,
        loading: false,
        results: action.payload
      };
    case SEARCH_LOAD_KO:
      return {
        ...state,
        error: true,
        loading: false,
      };
    default:
      return state;
  }
};
