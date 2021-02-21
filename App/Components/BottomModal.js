import React, {Component} from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';

export default class BottomModal extends Component {
  render() {
    const {visible, styles, children, onHide, isFullScreen} = this.props;
    return (
      <Modal
        onBackdropPress={onHide}
        style={styles.modalContainer}
        onSwipeComplete={onHide}
        swipeDirection={['down']}
        hasBackdrop
        isVisible={visible}
        scrollOffsetMax={400 - 300} // content height - ScrollView height
        propagateSwipe={true}>
        <View style={[styles.modal, isFullScreen && {height: '80%'}]}>
          {children}
        </View>
      </Modal>
    );
  }
}
