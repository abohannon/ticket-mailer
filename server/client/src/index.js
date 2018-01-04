import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import './style/index.css';
import App from './components/App';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

// Development only axios helpers
import axios from 'axios';

window.axios = axios;

const store = createStore(reducers, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root'));
registerServiceWorker();
