import React from 'react';
import Paper from 'material-ui/Paper';

const LocationInfo = props => (
  <Paper className="grid-paper">
    <div className="location-info">
      <h1> {props.location.city} </h1>
      <h3> {props.location.region}, {props.location.country} </h3>

      <div className="location-detail">
        <p> Temperature is {props.temperature}<sup>o</sup> F</p>
        <p> Wind speed is {props.windspeed} mph</p>
      </div>
    </div>
  </Paper>
);

export default LocationInfo;
