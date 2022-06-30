import React, { useState } from 'react';
import { Text, TouchableOpacity, ScrollView, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';
import CameraComponent from '../components/Camera';
import CustomTextInput from '../components/CustomTextInput';
import FormDateInput from '../components/FormDateInput';
import BarcodScan from '../components/BarcodScan';
import Signature from '../components/Signature';
import VideoComponent from '../components/VideoComponent';

const EditForms = ({ route }) => {
  const { formInfo } = route.params;
  const [saveData, saveSetData] = useState(formInfo);
  const handleData = (key, value, componentName) => {
    const object = {
      key,
      value,
      componentName,
    };

    const index = saveData.formData?.findIndex(x => x.key === key);

    if (index > -1) {
      const tempData = { ...saveData };
      tempData.formData.splice(index, 1, object);
      saveSetData(tempData);
      formInfo.formData = saveData;
    }
  };
  const update = async () => {
    const unsavedForms = await SecureStore.getItemAsync('unsavedForms');
    const parsed = JSON.parse(unsavedForms);
    const index = parsed?.findIndex(x => x.id === formInfo.id);

    if (index > -1) {
      parsed.splice(index, 1, saveData);
      await SecureStore.setItemAsync('unsavedForms', JSON.stringify(parsed));
    }
  };

  return (
    <ScrollView style={{ paddingTop: 50, paddingHorizontal: 15, flex: 1 }}>
      {
        saveData?.formData.map(x => {
          if (x.componentName === 'Input Date') {
            return (
              <FormDateInput
                value={x?.value}
                onSelect={date => handleData(x.key, date, x.componentName)}
                componentData={{ key: x.componentName }}
              />
            );
          }
          if (x.componentName === 'Input Number') {
            return (
              <CustomTextInput
                value={x?.value}
                onChangeText={e => handleData(x.key, e, x.componentName)}
                componentData={{ key: x.componentName }}
              />
            );
          }
          if (x.componentName === 'Input Email') {
            return (
              <CustomTextInput
                value={x?.value}
                onChangeText={e => handleData(x.key, e, x.componentName)}
                componentData={{ key: x.componentName }}
              />
            );
          }
          if (x.componentName === 'TextArea') {
            return (
              <CustomTextInput
                value={x?.value}
                style={{ height: 80 }}
                multiline
                numberOfLines={3}
                onChangeText={e => handleData(x.key, e, x.componentName)}
                componentData={{ key: x.componentName }}
              />
            );
          }
          if (x.componentName === 'Fotoğraf ve Yorum') {
            return (
              <CustomTextInput
                value={x?.value}
                onChangeText={e => handleData(x.key, e, x.componentName)}
                componentData={{ key: x.componentName }}
              />
            );
          }
          if (x.componentName === 'Fotoğraf Çek') {
            return (
              <CameraComponent
                value={x?.value}
                selected={uri => handleData(x.key, uri, x.componentName)}
                componentData={{ key: x.componentName }}
              />
            );
          }
          if (x.componentName === 'RECORD VIDEO') {
            return (
              <VideoComponent
                value={x?.value}
                selected={uri => handleData(x.key, uri, x.componentName)}
                componentData={{ key: x.componentName }}
              />
            );
          }
          if (x.componentName === 'Signature') {
            return (
              <Signature
                value={x?.value}
                selected={uri => handleData(x.key, uri, x.componentName)}
                componentData={{ key: x.componentName }}
              />
            );
          }
          if (x.componentName === 'RadioButton') {
            return (
              <View style={{ flexDirection: 'row' }}>
                <Text>{x.value}</Text>
                <Ionicons name="radio-button-on" size={24} color="black" />
              </View>
            );
          }
          if (x.componentName === 'Checkbox') {
            return (
              <View style={{ flexDirection: 'row' }}>
                {
                  x.value.map((val, index) => (
                    <View key={index} style={{ flexDirection: 'row' }}>
                      <Text>{val}</Text><Ionicons name="checkbox-outline" size={24} color="black" />
                    </View>
                  ))
                }
              </View>
            );
          }
          if (x.componentName === 'MultiSelect') {
            return (
              <View style={{ flexDirection: 'row' }}>
                <Text>{x.value}</Text>
                <Ionicons name="checkbox-outline" size={24} color="black" />
              </View>
            );
          }
          if (x.componentName === 'true') {
            return (
              <BarcodScan
                style={{ flexDirection: 'row' }}
                value={x?.value}
                selected={uri => handleData(x.key, uri, x.componentName)}
                componentData={{ key: x.componentName }}
              />
            );
          }
        })
    }
      <TouchableOpacity onPress={() => update()} style={{ borderRadius: 10, backgroundColor: 'purple', height: 30, alignItems: 'center', justifyContent: 'center' }}>
        <Text>güncelle</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default EditForms;
