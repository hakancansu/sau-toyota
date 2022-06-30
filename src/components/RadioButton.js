import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import i18n from 'i18n-js';

const RadioButton = ({ componentData, onPress, data }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
    {componentData.map(e => (
      <TouchableOpacity key={e.key} onPress={() => onPress(e.key)} style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        {data?.find(x => x.value === e.key) ? <Ionicons name="radio-button-on" size={24} color="black" /> : <Ionicons name="radio-button-off" size={24} color="black" /> }
        <Text>{i18n.t(e?.key)}</Text>
      </TouchableOpacity>
    ))}

  </View>
);

export default RadioButton;
