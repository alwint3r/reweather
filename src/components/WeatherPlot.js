import React from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  LineChart
} from 'recharts';

const chartMargin = {
  top: 5,
  right: 10,
  left: 0,
  bottom: 5,
};

export const WeatherPlot = props => (
  <Paper className="grid-paper">
    <ResponsiveContainer minHeight={300}>
      <LineChart margin={chartMargin} data={props.data}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone"
          name="Temperature"
          dataKey="value"
          stroke="#8884d8"
          isAnimationActive={false } />
      </LineChart>
    </ResponsiveContainer>
  </Paper>
);

const mapStateToProps = state => {
  return {
    data: state.temperature,
  };
}

export default connect(mapStateToProps)(WeatherPlot);
