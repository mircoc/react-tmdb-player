import toUpper from 'lodash/toUpper'

import * as types from './types'
import api, { getPaginatedResult, getSearchResult } from '../apis';

// configuration action creators
const configurationLoad = () => ({
  type: types.CONFIGURATION_LOAD,
})

const configurationLoadFinish = (payload) => ({
  type: types.CONFIGURATION_LOAD_OK,
  payload
})

const configurationLoadError = () => ({
  type: types.CONFIGURATION_LOAD_KO,
})


function fetchConfiguration() {
  return dispatch => {
    dispatch(configurationLoad())
    return api.Common.configuration()
      .then(response => {
        const result = response.body
        dispatch(configurationLoadFinish(result))
      }, error => {
        dispatch(configurationLoadError())
      })
  }
}

// FIXME add caching on localstorage
function shouldLoadConfiguration(state) {
  // const stItem = localstorage.get("cachekey")
  if (!state.configuration) {
    return true
  } else if (state.loading) {
    return false
  }
  return true
}

export function fetchConfigurationIfNeeded() {
  return (dispatch, getState) => {
    if (shouldLoadConfiguration(getState())) {
      return dispatch(fetchConfiguration())
    }
  }
}

// list action creators
const listLoad = (listType, listOptions) => ({
  type: types.LIST_LOAD,
  listType: getListKey(listType, listOptions)
})

const listLoadFinish = (listType, listOptions, payload) => ({
  type: types.LIST_LOAD_OK,
  listType: getListKey(listType, listOptions),
  payload
})

const listLoadError = (listType, listOptions) => ({
  type: types.LIST_LOAD_KO,
  listType: getListKey(listType, listOptions)
})


/**
 * Calculate the list key based on type and parameters
 * 
 * @param {String} type 
 * @param {Object} options 
 * 
 * @returns {String} list key to be used in reducers
 */
export const getListKey = (type, options = {}) => {
  const optionsKey = Object.keys(options)
    .sort()
    .map(k => `${k}_${options[k]}`)
    .join("_")
  
  return toUpper(`${type}_${optionsKey}`)
}


function fetchList(listType, listOptions) {
  return dispatch => {
    dispatch(listLoad(listType, listOptions))
    return api.Lists.byTypeOptions(listType, listOptions)
      .then(response => {
        const result = getPaginatedResult(response.body)
        dispatch(listLoadFinish(listType, listOptions, result))
      }, error => {
        dispatch(listLoadError(listType, listOptions))
      })
  }
}

function shouldLoadList(state, listType, listOptions) {
  const typeKey = getListKey(listType, listOptions)
  const list = state.listsByType[typeKey]
  if (!list) {
    return true
  } else if (list.refresh) {
    return true
  } else if (list.error) {
    return true
  }
  return false
}

export function fetchListIfNeeded(listType, listOptions = {}) {
  return (dispatch, getState) => {
    if (shouldLoadList(getState(), listType, listOptions)) {
      return dispatch(fetchList(listType, listOptions))
    }
  }
}

/**
 * Calculate the detail key based on type and id
 * 
 * @param {String} itemType api.ITEM_TYPE
 * @param {String} id item id
 * 
 * @returns {String} detail key
 */
export const getDetailKey = (itemType, id) => toUpper(`${itemType}_${id}`)

// detail action creators
const detailLoad = (detailKey) => ({
  type: types.DETAIL_LOAD,
  detailKey,
})

const detailLoadFinish = (detailKey, payload) => ({
  type: types.DETAIL_LOAD_OK,
  detailKey,
  payload,
})

const detailLoadError = (detailKey) => ({
  type: types.DETAIL_LOAD_KO,
  detailKey,
})


function fetchDetail(itemType, id) {
  const detailKey = getDetailKey(itemType, id)
  return dispatch => {
    dispatch(detailLoad(detailKey))
    return api.Details.byType(itemType, id)
      .then(response => {
        const result = response.body
        dispatch(detailLoadFinish(detailKey, result))
      }, error => {
        dispatch(detailLoadError(detailKey))
      })
  }
}

function shouldLoadDetail(state, itemType, id) {
  const detailKey = getDetailKey(itemType, id)
  const detail = state.detailsByKey[detailKey]
  if (!detail) {
    return true
  } else if (detail.refresh) {
    return true
  } else if (detail.error) {
    return true
  }
  return false
}

export function fetchDetailIfNeeded(itemType, id) {
  return (dispatch, getState) => {
    if (shouldLoadDetail(getState(), itemType, id)) {
      return dispatch(fetchDetail(itemType, id))
    }
  }
}


// search action creators
/**
 * 
 * @param {String} payload - search string
 */
const searchLoad = (payload) => ({
  type: types.SEARCH_LOAD,
  payload,
})

/**
 * 
 * @param {Array} payload - result array
 */
const searchLoadFinish = (payload) => ({
  type: types.SEARCH_LOAD_OK,
  payload,
})

const searchLoadError = () => ({
  type: types.SEARCH_LOAD_KO,
})

export function fetchSearch(query) {
  return dispatch => {
    dispatch(searchLoad(query))
    return api.Search.multi(query)
      .then(response => {
        const result = getSearchResult(response.body)
        dispatch(searchLoadFinish(result))
      }, error => {
        dispatch(searchLoadError())
      })
  }
}
