import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

function SettingsButton({ style, onPress, text }) {
  return (
    <TouchableOpacity
      style={[
        {
          height: 50,
          justifyContent: 'center',
          padding: 10,
          borderBottomColor: 'grey',
          borderBottomWidth: 0.2,
        },
        style,
      ]}
      onPress={onPress}
      text={text}
    >
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}

export default SettingsButton;
