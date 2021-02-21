import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {ActivityIndicator} from 'react-native-paper';

// ...
export default class WebViewScreen extends Component {
  state = {visible: true};
  hideSpinner() {
    this.setState({visible: false});
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <WebView
          onLoadStart={() => this.hideSpinner()}
          style={{flex: 1}}
          source={{uri: this.props.navigation.state.params.uri}}
        />
        {this.state.visible && (
          <ActivityIndicator
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              right: '50%',
            }}
            size="large"
            color="#43ba7b"
          />
        )}
      </View>
    );
  }
}
