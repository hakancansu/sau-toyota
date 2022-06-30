import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import i18n from 'i18n-js';

const IButton = ({ componentData, componentOptions }) => {
  const [buttonStyle, setButtonStyle] = useState([]);
  useEffect(() => {
    const temporary = [];
    componentOptions?.map(x => temporary.push({ [x.name]: x.key }));
    setButtonStyle(temporary);
  }, [componentOptions]);

  return (
    <View>
      <TouchableOpacity
        style={[{ height: 40, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, marginBottom: 10, borderRadius: 10 }, ...buttonStyle]}
      >
        <Text style={{ color: 'black' }}>{i18n.t(componentData?.key)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default IButton;
