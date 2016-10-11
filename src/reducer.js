const defaultState = {
  location: {
    city: 'Bandung',
    region: 'West Java',
    country: 'Indonesia',
  },

  wind: 6,
  temperature: [],

  snackbar: {
    state: false,
    message: '',
  },
};

export default function (state = defaultState, action) {
  switch(action.type) {
    case 'NEW_WEATHER_DATA':
      const payload = JSON.parse(action.payload);
      let temperature;

      if (state.temperature.length > 29)
        temperature = state.temperature.slice(1)
      else
        temperature = state.temperature.concat([{
          time: new Date(),
          value: Number(payload.temperature),
        }]);

      return {
        ...state,
        temperature,
        location: payload.location,
        wind: Number(payload.wind),
      };

    case 'MQTT_CONNECT':
      return {
        ...state,
        snackbar: {
          state: true,
          message: 'Connected to MQTT broker',
        },
      };

    case 'MQTT_DISCONNECT':
      return {
        ...state,
        snackbar: {
          state: true,
          message: 'Disconnected from MQTT broker',
        },
      };

    case 'MQTT_ERROR':
      return {
        ...state,
        snackbar: {
          state: true,
          message: action.err.message,
        },
      };

    case 'SNACKBAR_CLOSE':
      return {
        ...state,
        snackbar: {
          state: false,
          message: '',
        },
      };

    default:
      return state;
  }
};
