import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import '../css/App.css';
import WeatherPlot from './WeatherPlot';
import LocationInfo from './LocationInfo';
import AppBody from './AppBody';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar title="ReWeather"
          iconClassNameRight=""
          showMenuIconButton={false} />

        <AppBody>
          <WeatherPlot />
          <LocationInfo />
        </AppBody>
      </div>
    );
  }
}

export default App;
