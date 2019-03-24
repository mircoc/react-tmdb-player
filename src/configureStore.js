import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'


const middlewares = [
  thunkMiddleware
];

// use logger only on development
if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');

  middlewares.push(logger);
}


const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, applyMiddleware(...middlewares))
}

export default configureStore