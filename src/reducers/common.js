import {
  CONFIGURATION_LOAD,
  CONFIGURATION_LOAD_OK,
  CONFIGURATION_LOAD_KO
} from '../actions/types';

const defaultState = {
  configuration: null,
  loading: false,
  error: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case CONFIGURATION_LOAD:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case CONFIGURATION_LOAD_OK:
      return {
        ...state,
        error: false,
        loading: false,
        configuration: action.payload
      };
    case CONFIGURATION_LOAD_KO:
      return {
        ...state,
        error: true,
        loading: false,
      };
    default:
      return state;
  }
};
