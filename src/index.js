import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import IndexReducer from './index-reducer';
import IndexSagas from './index-sagas';

import image from './constants/images';

const sagaMiddleware = createSagaMiddleware();

/*eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&  
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
/*eslint-enable */

const initialState = {
  imageUrl: image
};

const store = createStore(  
  IndexReducer,
  initialState,
  composeSetup(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(IndexSagas);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
