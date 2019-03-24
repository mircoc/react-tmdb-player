import {
  DETAIL_LOAD,
  DETAIL_LOAD_OK,
  DETAIL_LOAD_KO,
  DETAIL_REFRESH,
} from '../actions/types';


function detail(
  state = {
    loading: false,
    error: false,
    refresh: false,
    item: {}
  },
  action
) {
  switch (action.type) {
    case DETAIL_REFRESH:
      return {
        ...state,
        refresh: true,
      }
    case DETAIL_LOAD:
      return {
        ...state,
        refresh: false,
        loading: true,
        error: false,
      }
    case DETAIL_LOAD_OK:
      return {
        ...state,
        loading: false,
        item: action.payload,
      }
    case DETAIL_LOAD_KO:
      return {
        ...state,
        error: true,
        loading: false,
      }
    default:
      return state
  }
}

export default function detailsByKey(state = {}, action) {
  switch (action.type) {
    case DETAIL_REFRESH:
    case DETAIL_LOAD:
    case DETAIL_LOAD_OK:
    case DETAIL_LOAD_KO:
      return {
        ...state,
        [action.detailKey]: detail(
          state[action.detailKey],
          action
        )
      }
    default:
      return state
  }
}
