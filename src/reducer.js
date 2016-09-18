const defaultState = {
  location: {
    city: 'Bandung',
    region: 'West Java',
    country: 'Indonesia',
  },

  wind: 6,
  temperature: [],
};

export default function (state = defaultState, action) {
  switch(action.type) {
    case 'NEW_WEATHER_DATA':
      const payload = JSON.parse(action.payload);

      let temperature;

      if (state.temperature.length > 29)
        temperature = state.temperature.slice()
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

    default:
      return state;
  }
};
