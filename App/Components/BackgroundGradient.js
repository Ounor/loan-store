import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';

export default class BottomModal extends Component {
  render() {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['#1d0c3f', '#2b788f']}
        style={{flex: 1, position: 'absolute', top: 0, bottom: 0, zIndex: 1}}>
        {this.props.children}
      </LinearGradient>
    );
  }
}
