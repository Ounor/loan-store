import React, {Component} from 'react';
import {TouchableOpacity, Text, View, Image, FlatList} from 'react-native';
import images from '../Themes/Images';
import BottomModal from './BottomModal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DataActions from '../Redux/DataRedux';
import styles from 'react-native-webview/lib/WebView.styles';
import map from 'lodash/map';
import LinearGradient from 'react-native-linear-gradient';

class Header extends Component {
  state = {
    visible: false,
  };

  toggleCountryModal = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  selectCountry = (country) => () => {
    this.props.setCountry({country: country});
    this.props.navigation.navigate('LaunchScreen');
    this.toggleCountryModal();
  };

  renderCountry = (item) => {
    const {styles} = this.props;
    return (
      <TouchableOpacity
        key={item.id}
        onPress={this.selectCountry(item.id)}
        style={styles.countyTitleContainer}>
        <Image style={styles.countryImg} source={images.country[item.id]} />
        <Text style={styles.countyTitle}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {visible} = this.state;
    const {styles, countries} = this.props;
    return (
      <>
        <View>
          <LinearGradient
            start={{x: 0.15, y: 1}}
            style={styles.header}
            end={{x: 1, y: 1}}
            colors={['#28313b', '#485461']}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('LaunchScreen')}>
              <Text style={styles.logoTitle}>Credit Store</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggleCountryModal}>
              <Image style={styles.world} source={images.world} />
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <BottomModal
          children={
            <View style={styles.listContainerTwoCol}>
              {map(countries, (item) => this.renderCountry(item))}
            </View>
          }
          styles={styles}
          visible={visible}
          onHide={this.toggleCountryModal}
        />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setCountry: (country) => dispatch(DataActions.setCountry(country)),
    },
    dispatch,
  );

const mapStateProps = (state) => ({
  countries: state.coreData.countries,
});

export default connect(mapStateProps, mapDispatchToProps)(Header);
