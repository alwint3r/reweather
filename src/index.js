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
  url: 'ws://broker.hivemq.com:8000',
  opt: {
    clientId: 'reweather-redux-' + Date.now(),
  },
};
const mqttRedux = createClient(mqttConfig);
const store = createStore(reducer, applyMiddleware(mqttRedux.createMiddleware()));
const actionTopicMapping = {
  'NEW_WEATHER_DATA': 'reweather/weather',
};

mqttRedux.connect(actionTopicMapping, store);

injectTapEventPlugin();

const ThemedApp = (props) => (
  <MuiThemeProvider>
    <App {...props} />
  </MuiThemeProvider>
);

ReactDOM.render(
  <Provider store={store}>
    <ThemedApp />
  </Provider>,
  document.getElementById('root')
);
