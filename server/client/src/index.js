import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import './style/index.css';
import App from './App';
import reducers from './reducers';
import { loadUser, saveUser } from './helpers/localStorage';
import registerServiceWorker from './registerServiceWorker';

// ==== Development only axios helpers
import axios from 'axios';

window.axios = axios;
// =====
const persistedState = loadUser();
const store = createStore(
  reducers,
  persistedState,
  applyMiddleware(reduxThunk),
);

console.log('store', store.getState());

store.subscribe(
  throttle(() => {
    saveUser({
      userAuth: {
        isAuthorized: store.getState().userAuth.isAuthorized,
        currentTour: store.getState().userAuth.currentTour,
      },
    });
  }, 1000),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
