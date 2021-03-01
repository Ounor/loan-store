import React, {PureComponent} from 'react';
import {Image, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import get from 'lodash/get';
import map from 'lodash/map';
import find from 'lodash/find';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
import {BannerAdSize, BannerAd, TestIds} from '@react-native-firebase/admob';
import BottomModal from '../Components/BottomModal';

// Styles
import styles from './Styles/Styles';
import {adUnitId} from '../Lib/ads';
import Translate from '../Components/Translate';
import BackgroundGradient from '../Components/BackgroundGradient';

class LaunchScreen extends PureComponent {
  state = {
    isVisible: false,
  };

  handleNavigateByType = (item) => () => {
    if (item.isCreditCalc === '1') {
      this.props.navigation.push('CalculatorScreen', {
        translate: JSON.parse(this.props.translate),
      });
    } else if (item.url) {
      this.props.navigation.push('WebViewScreen', {
        uri: item.url,
      });
    } else {
      this.props.navigation.push('OffersScreen', {
        id: item.id,
        name: item.name,
        appStatus: this.props.appStatus,
      });
    }
  };

  renderItem = (item) => {
    const isAdver = Number(item.isAdver);
    return isAdver ? (
      <TouchableOpacity
        onPress={this.handleNavigateByType(item)}
        key={item.id}
        style={styles.button}
      />
    ) : (
      <TouchableOpacity
        onPress={this.handleNavigateByType(item)}
        key={item.id}
        style={styles.buttonStyle}>
        <Text style={styles.textStyleWhite}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  handleShowDisclaimer = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  };

  renderDisclaimer = () => (
    <ScrollView>
      <TouchableOpacity>
        <Translate style={styles.disclaimerText} value={'disclaimer'} />
        <Translate value={'disclaimerInfo'} />
      </TouchableOpacity>
    </ScrollView>
  );

  render() {
    const {loaded, buttons} = this.props;
    const {isVisible} = this.state;
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['#fff', '#fff']}
        style={{flex: 1, position: 'absolute', top: 0, bottom: 0, zIndex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
          style={styles.mainContainer}>
          {loaded && buttons ? (
            map(buttons, (item) => this.renderItem(item))
          ) : (
            <ActivityIndicator
              color="#3e4956"
              size="large"
              style={{marginTop: '15%'}}
            />
          )}
        </ScrollView>
        {loaded ? (
          <TouchableOpacity onPress={this.handleShowDisclaimer}>
            <Text
              style={{
                color: 'black',
                textAlign: 'right',
                padding: 16,
                fontSize: 16,
              }}>
              Дисклеймер
            </Text>
          </TouchableOpacity>
        ) : null}
        <BottomModal
          onHide={this.handleShowDisclaimer}
          children={this.renderDisclaimer()}
          styles={styles}
          visible={isVisible}
        />
        <BannerAd
          style={{position: 'absolute', bottom: -3}}
          unitId={adUnitId}
          size={BannerAdSize.ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
        <BackgroundGradient />
      </LinearGradient>
    );
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapStateProps = (state) => ({
  data: state.coreData,
  appStatus: state.coreData.appStatus,
  loaded: state.coreData.dataLoaded,
  buttons: get(
    state.coreData.typeByCountries,
    get(state.coreData, 'country', 'RU'),
    get(state.coreData.typeByCountries, 'RU'),
  ),
  translate:
    get(
      find(state.coreData.countries, [
        'id',
        get(state.coreData, 'country', 'RU'),
      ]),
      'translate',
      get(state.coreData, 'countries[0].translate'),
    ) || {},
});

export default connect(mapStateProps, null)(LaunchScreen);
