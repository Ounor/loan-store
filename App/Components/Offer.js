import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import styles from '../Containers/Styles/Styles';
import LinearGradient from 'react-native-linear-gradient';
import Translate from './Translate';
import BottomModal from './BottomModal';

export default class Offer extends Component {
  state = {
    isHidden: true,
    numberOfLines: 0,
  };

  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    children: PropTypes.string,
    navigator: PropTypes.object,
    isAvailable: PropTypes.bool,
  };

  handleToggle = () => {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  };

  handleNavigateByOffer = () => {
    const {item} = this.props;
    if (item.url) {
      this.props.navigation.push('WebViewScreen', {
        uri: item.url,
      });
    } else {
      this.props.navigation.push('OffersScreen', {
        id: item.id,
      });
    }
  };

  handleShowDescription = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  };

  render() {
    const {isHidden, isVisible} = this.state;
    const {item, isAdver, isAvailable} = this.props;
    return (
      <View key={item.id} style={styles.offerCard}>
        {isAdver ? <Text style={styles.adverText}>Реклама</Text> : null}
        <View style={{flexDirection: 'row', width: '100%'}}>
          <Image
            source={{
              uri: item.image,
            }}
            style={{
              width: 65,
              height: 65,
              marginRight: 16,
              marginBottom: 16,
            }}
          />
          <View style={{width: '75%'}}>
            <Text style={styles.textStyle}>{item.name}</Text>
            {item.subtitle ? <Text>{item.subtitle}</Text> : null}
          </View>
        </View>

        {item.description ? (
          <>
            <Text style={isHidden && {display: 'none'}}>
              {item.description}
            </Text>
            {isAvailable ? (
              <TouchableOpacity activeOpaity={1} onPress={this.handleToggle}>
                {isHidden ? (
                  <Translate
                    style={{
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      textDecorationLine: 'underline',
                    }}
                    value={'more'}
                  />
                ) : (
                  <Translate
                    style={{
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      paddingTop: 16,
                      textDecorationLine: 'underline',
                    }}
                    value={'hide'}
                  />
                )}
              </TouchableOpacity>
            ) : null}
          </>
        ) : null}
        <TouchableOpacity
          onPress={
            isAvailable
              ? this.handleNavigateByOffer
              : this.handleShowDescription
          }>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#43ba7b', '#43ba7b']}
            style={styles.buttonStyleOrder}>
            {isAvailable ? (
              <Translate style={styles.buttonTextOrder} value={'order'} />
            ) : (
              <Translate style={styles.buttonTextOrder} value={'more'} />
            )}
          </LinearGradient>
        </TouchableOpacity>
        <BottomModal
          onHide={this.handleShowDescription}
          children={<Text> {item.description}</Text>}
          styles={styles}
          visible={isVisible}
        />
      </View>
    );
  }
}
