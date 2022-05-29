import { View, TextInput, Text } from 'react-native';
import React from 'react';

const CustomTextInput = ({
  value,
  onChangeText,
  style,
  placeholder,
  componentData,
  multiline,
  numberOfLines,
  ...props
}) => (
  <View>
    <Text>{componentData?.key && componentData?.key}</Text>
    <TextInput
      style={[
        {
          height: 40,
          backgroundColor: '#FFFFFF',
          justifyContent: 'center',
          paddingHorizontal: 10,
          marginBottom: 10,
          borderRadius: 10,
        },
        style,
      ]}
      multiline={multiline}
      numberOfLines={numberOfLines}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      {...props}
    />
  </View>
);

export default CustomTextInput;
