import '../Config';
import DebugConfig from '../Config/DebugConfig';
import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import RootContainer from './RootContainer';
import createStore from '../Redux';
import {SafeAreaProvider} from 'react-native-safe-area-view';
import admob, {
  firebase,
  MaxAdContentRating,
} from '@react-native-firebase/admob';

const store = createStore();

class App extends Component {
  componentDidMount() {
    StatusBar.setHidden(true);
    admob()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
      })
      .then(() => {
        // Request config successfully set!
      });
  }

  render() {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <RootContainer />
        </SafeAreaProvider>
      </Provider>
    );
  }
}

export default DebugConfig.useReactotron ? console.tron.overlay(App) : App;
