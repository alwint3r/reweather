import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './css/index.css';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createClient } from './lib/mqttredux';

import reducer from './reducer';

const mqttConfig = {
  url: 'ws://localhost:8888',
  opt: {
    clientId: 'reweather-redux-' + Date.now(),
    protocolId: 'MQIsdp',
    protocolVersion: 3,
  },
};
const mqttRedux = createClient(mqttConfig);
const store = createStore(reducer, applyMiddleware(mqttRedux.createMiddleware()));
const actionTopicMapping = {
  'NEW_WEATHER_DATA': 'reweather/weather',
};

mqttRedux.connect(actionTopicMapping, store);

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
