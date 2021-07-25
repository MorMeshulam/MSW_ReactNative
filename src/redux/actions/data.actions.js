
export const SET_FORECAST = 'AppState/FETCH_CAMERAS';
export const SET_FORECAST_PENDING = 'AppState/SET_FORECAST_PENDING';
export const SET_FORECAST_COMPLETED = 'AppState/SET_FORECAST_COMPLETED';
export const SET_FORECAST_REJECTED = 'AppState/SET_FORECAST_REJECTED';

// import { uploadForecast } from '../../services/firebase';


export function setForecast() {
  return (dispatch, getState) => {

    // update database
    // uploadForecast(dispatch);
    
    return {
      type: SET_FORECAST,
    };
  }
}

export function setForecastPending() {
  return {
    type: SET_FORECAST_PENDING,
  };
}

export function setForecastCompleted(forecast) {
  return {
    type: SET_FORECAST_COMPLETED,
    forecast
  };
}

export function setForecastRejected() {
  return {
    type: SET_FORECAST_REJECTED,
  };
}
