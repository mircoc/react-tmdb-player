import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import configureStore from './configureStore'

// import bootrap css before importing my components so bootstrap get less priority
import 'bootstrap/dist/css/bootstrap.css';

import AppContainer from './containers/AppContainer';

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);


