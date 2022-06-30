import React, { useState, useEffect } from 'react';
import { View, StatusBar, TouchableOpacity, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import i18n from 'i18n-js';

const FormDateInput = ({ onSelect, value, style, componentData, componentOptions }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
    const selectedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    onSelect(selectedDate);
  };
  const [formDateStyle, setFormDateStyle] = useState([]);

  useEffect(() => {
    const temporary = [];
    componentOptions?.map(x => temporary.push({ [x.name]: x.key }));
    setFormDateStyle(temporary);
  }, [componentOptions]);
  return (
    <View>
      <Text>{ i18n.t(componentData?.key) }</Text>
      <TouchableOpacity
        style={[{ height: 40, backgroundColor: '#FFFFFF', justifyContent: 'center', paddingHorizontal: 10, marginBottom: 10, borderRadius: 10 },
          ...formDateStyle, style]}
        onPress={showDatePicker}
      >
        <Text>{ value }</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        value
      />
      <StatusBar style="auto" />
    </View>
  );
};

export default FormDateInput;
