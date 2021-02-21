import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LaunchScreen from '../Containers/LaunchScreen';

import styles from './Styles/NavigationStyles';
import OffersScreen from '../Containers/OffersScreen';
import CalculatorScreen from '../Containers/CalculatorScreen';
import WebViewScreen from '../Containers/WebViewScreen';
import React from 'react';
import Header from '../Components/Header';

const PrimaryNav = createStackNavigator(
  {
    LaunchScreen: {
      screen: LaunchScreen,
      navigationOptions: ({navigation}) => ({
        header: <Header styles={styles} navigation={navigation} />,
      }),
    },
    OffersScreen: {
      screen: OffersScreen,
      navigationOptions: ({navigation}) => ({
        header: <Header styles={styles} navigation={navigation} />,
      }),
    },
    CalculatorScreen: {
      screen: CalculatorScreen,
      navigationOptions: ({navigation}) => ({
        header: <Header styles={styles} navigation={navigation} />,
      }),
    },
    WebViewScreen: {
      screen: WebViewScreen,
      navigationOptions: ({navigation}) => ({
        header: <Header styles={styles} navigation={navigation} />,
      }),
    },
  },
  {
    headerMode: 'float',
    initialRouteName: 'LaunchScreen',
  },
);

export default createAppContainer(PrimaryNav);
