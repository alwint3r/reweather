import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import '../css/App.css';
import WeatherPlot from './WeatherPlot';
import LocationInfo from './LocationInfo';
import AppBody from './AppBody';

const mockLocation = {
  city: 'Bandung',
  region: 'West Java',
  country: 'Indonesia',
};

const mockData = {
  temperature: 74,
  windspeed: 6,
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar title="ReWeather"
          iconClassNameRight=""
          showMenuIconButton={false} />

        <AppBody>
          <WeatherPlot />
          <LocationInfo location={mockLocation}
            temperature={mockData.temperature}
            windspeed={mockData.windspeed} />
        </AppBody>
      </div>
    );
  }
}

export default App;
