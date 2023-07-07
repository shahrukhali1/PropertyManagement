// index.js
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {name as appName} from './app.json';


import App from './src/App';
import rootReducer from './src/redux/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
