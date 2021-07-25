const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const { importForecast } = require('./listeners/firebase');
const { FIREBASE_CONFIG } = require('./config/secrets');
const serviceAccount = require('./config/your-admin-file-firebase-adminsdk-serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: FIREBASE_CONFIG.databaseURL,
});

const app = express();
app.use(cors());

// Index page, just to make it easy to see if the app is working.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/app/index.html');
});

app.get('/msw/forecast', (req, res) => {
  console.log('[functions-cron]: MSW load forecast start');
  importForecast(admin)
    .then(mswRes => {
      return res
        .status(200)
        .send('[functions-cron]: MSW load forecast ended successfuly')
        .end();
    })
    .catch(err => {
      return res
        .status(500)
        .send('[functions-cron]: MSW load forecast failed', err)
        .end();
    });
});

// Start the server
// const PORT = process.env.PORT || 6060;
// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}`);
//   console.log('Press Ctrl+C to quit.');
// });

if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 1111, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

module.exports = app;
