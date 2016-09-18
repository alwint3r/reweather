import React from 'react';
import Paper from 'material-ui/Paper';
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

const mockData = [
  {
    time: new Date(),
    value: 72,
  },
  {
    time: new Date(),
    value: 72,
  },

  {
    time: new Date(),
    value: 74,
  },
  {
    time: new Date(),
    value: 74,
  },
];

const WeatherPlot = props => (
  <Paper className="grid-paper">
    <ResponsiveContainer minHeight={300}>
      <LineChart margin={chartMargin} data={props.data || mockData}>
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

export default WeatherPlot;
