import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import ReduxNavigation from '../Navigation/ReduxNavigation';
import {connect} from 'react-redux';
import StartupActions from '../Redux/StartupRedux';
import SplashScreen from 'react-native-splash-screen';

// Styles
import styles from './Styles/RootContainerStyles';

class RootContainer extends Component {
  componentDidMount() {
    this.props.startup();
    SplashScreen.hide();
  }

  render() {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle="light-content" />
        <ReduxNavigation />
      </View>
    );
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
});

export default connect(null, mapDispatchToProps)(RootContainer);
