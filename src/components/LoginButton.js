import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

function LoginButton({ style, onPress, text }) {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: 'aliceblue',
          marginTop: 30,
          borderRadius: 10,
          height: 50,
          justifyContent: 'center',
          padding: 10,
        },
        style,
      ]}
      onPress={onPress}
      text={text}
    >
      <Text style={{ textAlign: 'center', alignItems: 'center' }}>{text}</Text>
    </TouchableOpacity>
  );
}

export default LoginButton;
