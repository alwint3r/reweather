import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './css/index.css';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

const ThemedApp = (props) => (
    <MuiThemeProvider>
        <App {...props} />
    </MuiThemeProvider>
);

ReactDOM.render(
  <ThemedApp />,
  document.getElementById('root')
);
