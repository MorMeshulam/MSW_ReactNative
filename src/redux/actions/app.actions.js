export const GET_APP_CONFIG = 'GET_APP_CONFIG';
export const GET_APP_CONFIG_PENDING = 'GET_APP_CONFIG_PENDING';
export const GET_APP_CONFIG_COMPLETED = 'GET_APP_CONFIG_COMPLETED';
export const GET_APP_CONFIG_REJECTED = 'GET_APP_CONFIG_REJECTED';


export const getAppConfig = () => {
  return (dispatch, getState) => {

    getAppConfigPending();

    return {
      type: GET_APP_CONFIG,
    };
  };
};

export const getAppConfigPending = () => ({
  type: GET_APP_CONFIG_PENDING,
});

export const getAppConfigCompleted = config => {
  return {
    type: GET_APP_CONFIG_COMPLETED,
    config,
  };
};

export const getAppConfigRejected = () => ({
  type: GET_APP_CONFIG_REJECTED,
});
