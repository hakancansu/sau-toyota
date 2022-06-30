import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const ModalComponent = ({ ...props }) => (
  <Modal transparent {...props}>
    <View style={styles.wrapper}>
      <ActivityIndicator color="red" size="large" />
    </View>
  </Modal>
);
