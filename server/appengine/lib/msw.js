const {
  MAGIC_SEA_WEED_API_PATH,
  MAGIC_SEA_WEED_KEY,
} = require('../config/secrets');
const axios = require('axios');

//Ashdod
const spotId = 4219;
const unitId = 'us';

const fetchSpotData = async () => {
  let targetUrl = `${MAGIC_SEA_WEED_API_PATH}/${MAGIC_SEA_WEED_KEY}/forecast/?spot_id=${spotId}&units=${unitId}`;
  let responseData = null;
  return axios
    .get(targetUrl)
    .then(function(response) {
      // handle success
      // console.log(response.data);
      responseData = response.data;
      return responseData;
    })
    .catch(function(error) {
      // handle error
      console.log(error);
      return error;
    })
    .then(function() {
      // always executed
      console.log('MSW GET FORECAST ENDED SUCCESSFULY! ');
      return responseData;
    });
};

module.exports = {
  fetchSpotData,
};
