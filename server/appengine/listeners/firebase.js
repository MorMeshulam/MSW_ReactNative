const { fetchSpotData } = require('../lib/msw');
const moment = require('moment');

const importForecast = async api => {
  const forecast = await fetchSpotData();
  console.log('MSW_forecast response data',forecast);

  const newForecast = {
    value: null,
    data: forecast,
  };

  const collectionId = 'forecast';
  const docId = new moment().format('DD_MM_YYYY');

  newForecast.createdDate = new Date().toUTCString();

  return api.firestore()
    .collection(collectionId)
    .doc(docId)
    .set(newForecast)
    .then(function(docRef) {
      console.log(
        'Document written with ID: ',
        docId || (docRef && docRef.id),
      );
      return newForecast;
    })
    .catch(function(error) {
      console.error('Error adding document: ', error);
    });
};

module.exports = {
  child_added_newuser,
  child_added_pro_user,
  sendVerificationEmail,
  importForecast,
};
