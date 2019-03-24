import {
  LIST_LOAD,
  LIST_LOAD_OK,
  LIST_LOAD_KO,
  LIST_REFRESH,
} from '../actions/types';


function list(
  state = {
    loading: false,
    error: false,
    refresh: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case LIST_REFRESH:
      return {
        ...state,
        refresh: true,
      }
    case LIST_LOAD:
      return {
        ...state,
        refresh: false,
        loading: true,
        error: false,
      }
    case LIST_LOAD_OK:
      return {
        ...state,
        loading: false,
        items: action.payload,
      }
    case LIST_LOAD_KO:
      return {
        ...state,
        error: true,
        loading: false,
      }
    default:
      return state
  }
}

export default function listsByType(state = {}, action) {
  switch (action.type) {
    case LIST_REFRESH:
    case LIST_LOAD:
    case LIST_LOAD_OK:
    case LIST_LOAD_KO:
      return {
        ...state,
        [action.listType]: list(
          state[action.listType],
          action
        )
      }
    default:
      return state
  }
}
