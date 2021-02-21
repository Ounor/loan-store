import {NavigationActions} from 'react-navigation';
import {AdEventType, InterstitialAd} from '@react-native-firebase/admob';
import {InterstitialAdId} from '../Lib/ads';

// gets the current screen from navigation state
const getCurrentRouteName = (navigationState) => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
};

const showInterstitialAd = () => {
  const interstitialAd = InterstitialAd.createForAdRequest(InterstitialAdId);
  interstitialAd.onAdEvent((type, error) => {
    if (type === AdEventType.LOADED) {
      interstitialAd.show();
    }
  });
  interstitialAd.load();
};

const screenTracking = ({getState}) => (next) => (action) => {
  if (
    action.type !== NavigationActions.NAVIGATE &&
    action.type !== NavigationActions.BACK
  ) {
    return next(action);
  }

  showInterstitialAd();

  const currentScreen = getCurrentRouteName(getState().nav);
  const result = next(action);
  const nextScreen = getCurrentRouteName(getState().nav);
  // if (nextScreen !== currentScreen) {
  //   try {
  //     __DEV__ &&
  //       console.tron.log(`NAVIGATING ${currentScreen} to ${nextScreen}`);
  //     // Example: Analytics.trackEvent('user_navigation', {currentScreen, nextScreen})
  //   } catch (e) {
  //     __DEV__ && console.tron.log(e);
  //   }
  // }
  return result;
};

export default screenTracking;
