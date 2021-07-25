import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { name as appName } from './app.json';
import AppView from './src/views/App';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppView />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => App);
