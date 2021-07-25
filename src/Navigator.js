import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Forecast from './components/Forecast';

import { colors, fonts } from './styles';

const stackNavigator = createStackNavigator(
  {
    Forecast: { screen: Forecast }
  },
  {
    defaultNavigationOptions: () => ({
      titleStyle: {
        fontFamily: fonts.primaryLight,
      },
      headerStyle: {
        // backgroundColor: colors.primary,
        borderBottomWidth: 0,
      },
      // headerBackground: (
      //   <Image
      //     style={{ flex: 1, width }}
      //     source={headerBackground}
      //     resizeMode="cover"
      //   />
      // ),
      headerTitleStyle: {
        color: colors.black,
        // fontFamily: fonts.primaryRegular,
      },
      headerTintColor: '#222222',
      headerLeft: (props) => (
        <TouchableOpacity
          onPress={props.onPress}
          style={{
            paddingLeft: 25,
          }}>
          <Image
            source={require('./assets/icons/arrow-back.png')}
            resizeMode="contain"
            style={{
              height: 20,
            }}
          />
        </TouchableOpacity>
      ),
    }),
  },
);

export default createAppContainer(stackNavigator);
