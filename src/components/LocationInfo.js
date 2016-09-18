import React from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';

export const LocationInfo = props => (
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

const mapStateToProps = state => {
  const temperature = state.temperature[state.temperature.length - 1];
  return {
    location: state.location,
    windspeed: state.wind,
    temperature: temperature ? temperature.value : 72,
  };
};

export default connect(mapStateToProps)(LocationInfo);
