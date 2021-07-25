import {
  GET_APP_CONFIG,
  GET_APP_CONFIG_PENDING,
  GET_APP_CONFIG_REJECTED,
  GET_APP_CONFIG_COMPLETED,
} from '../actions/app.actions';

const initialState = {
  layout: null,
  settings: [],
  loading: true
};

export default function AppReducer(state = initialState, action) {
  switch (action.type) {
    case GET_APP_CONFIG:
      return {
        ...state,
      };
    case GET_APP_CONFIG_PENDING:
      return {
        ...state,
        loading: true,
      };
    case GET_APP_CONFIG_REJECTED:
      return {
        ...state,
        loading: false,
      };
    case GET_APP_CONFIG_COMPLETED:
      return {
        ...state,
        ...action.config,
        loading: false,
      };
    default:
      return state;
  }
}
