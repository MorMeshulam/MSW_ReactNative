import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { getAppConfig } from '../redux/actions/app.actions';

import Navigator from '../Navigator';

const App = () => {
  // Set an initializing state whilst Firebase connects
  const appConfig = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getAppConfig());

    return () => { };
  }, []);


  return (
    <View style={styles.container}>
      <Navigator />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
