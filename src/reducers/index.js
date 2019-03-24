import { combineReducers } from 'redux';

import common from './common'
import listsByType from './listsByType'
import detailsByKey from './detailsByKey'
import search from './search'

export default combineReducers({
  common,
  listsByType,
  detailsByKey,
  search,
})