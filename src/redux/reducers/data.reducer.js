import {
  SET_FORECAST,
  SET_FORECAST_PENDING,
  SET_FORECAST_REJECTED,
  SET_FORECAST_COMPLETED
} from '../actions/data.actions';

const initialState = {
  forecast: null,
  loading: false,
};

export default function DataReducer(state = initialState, action) {
  switch (action.type) {

      case SET_FORECAST:
        return {
          ...state,
        };
      case SET_FORECAST_PENDING:
        return {
          ...state,
          loading: true,
        };
      case SET_FORECAST_REJECTED:
        return {
          ...state,
          loading: false,
        };
      case SET_FORECAST_COMPLETED:
        return {
          ...state,
          forecast: action.forecast,
          loading: false,
        };

    default:
      return state;
  }
}
