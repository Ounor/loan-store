import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
//252525252
export default class BottomModal extends Component {
  render() {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['#ea3939', '#ec02e2']}
        style={{flex: 1, position: 'absolute', top: 0, bottom: 0, zIndex: 1}}>
        {this.props.children}
      </LinearGradient>
    );
  }
}
