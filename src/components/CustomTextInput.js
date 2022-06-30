import { View, TextInput, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import i18n from 'i18n-js';

const CustomTextInput = ({
  value,
  onChangeText,
  style,
  placeholder,
  componentData,
  multiline,
  numberOfLines,
  componentStyle,
  componentOptions,
  ...props
}) => {
  const [customStyle, setCustomStyle] = useState([]);

  useEffect(() => {
    const temporary = [];
    componentOptions?.map(x => temporary.push({ [x.name]: x.key }));
    setCustomStyle(temporary);
  }, [componentOptions]);
  return (
    <View>
      <Text style={[{ color: 'black' }, ...customStyle]}>{i18n.t(componentData?.key)}</Text>
      <TextInput
        style={[
          {
            backgroundColor: '#FFFFFF',
            justifyContent: 'center',
            paddingHorizontal: 10,
            marginBottom: 10,
            borderRadius: 10,
          },
          ...customStyle,
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
};

export default CustomTextInput;
