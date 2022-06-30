/* eslint-disable no-restricted-syntax */
import React, { useState, useContext, useEffect } from 'react';
import { Text, TouchableOpacity, SafeAreaView, ScrollView, Alert, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import i18n from 'i18n-js';
import * as Location from 'expo-location';
import CameraComponent from '../components/Camera';
import CustomTextInput from '../components/CustomTextInput';
import FormDateInput from '../components/FormDateInput';
import MultipleSelect from '../components/MultipleSelect';
import CheckBox from '../components/CheckBox';
import RadioButton from '../components/RadioButton';
import Info from '../components/Info';
import IButton from '../components/IButton';
import BarcodScan from '../components/BarcodScan';
import AllInOneForm from '../constants/AllInOneForm.json';
import { NetworkInfoContext } from '../context/NetworkInfoContext';
import Signature from '../components/Signature';
import VideoComponent from '../components/VideoComponent';

const FormDemo = () => {
  const { connect } = useContext(NetworkInfoContext);
  const [data, setData] = useState([]);
  const [adress, setAdress] = useState();
  const { forms } = AllInOneForm.data.pages[0];
  async function getLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use location service.',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    }

    const { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      const response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (const item of response) {
        const templeAddress = `${item.name}, ${item.street}, ${item.postalCode}, ${item.subregion}, ${item.country}`;
        setAdress(templeAddress);
      }
    }
  }
  const save = async dataForm => {
    const unsavedForms = await SecureStore.getItemAsync('unsavedForms');
    if (connect) {
      await SecureStore.deleteItemAsync('unsavedForms');
    } else if (unsavedForms === null) {
      const object = { id: AllInOneForm.data.id, formData: [...dataForm], location: adress };
      await SecureStore.setItemAsync('unsavedForms', JSON.stringify([object]));
    } else {
      const parsed = JSON.parse(unsavedForms);
      const stringfyUnsaved = JSON.stringify([...parsed, { id: AllInOneForm.data.id, formData: dataForm, location: adress }]);
      await SecureStore.setItemAsync('unsavedForms', stringfyUnsaved);
    }
  };

  const handleData = (key, value, componentName) => {
    const object = {
      key,
      value,
      componentName,
    };

    const index = data.findIndex(x => x.key === key);

    if (index > -1) {
      const tempData = [...data];
      tempData.splice(index, 1, object);
      setData(tempData);
    } else {
      setData([...data, object]);
    }
  };

  const send = () => {
    if (connect) {
      console.log({ id: AllInOneForm.data.id, formData: data, location: adress });
    }
    save(data);
    setData([]);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <SafeAreaView style={{ paddingTop: '5%', paddingHorizontal: 15, flex: 1 }}>
      <View style={{ backgroundColor: connect ? 'green' : 'red', height: 40, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 20 }}>offline</Text>
      </View>
      <ScrollView>
        {
      forms.map(form => (
        <>
          <Text key={form.title} style={{ color: 'red' }}>{form.title} {i18n.t('Offline Forms')}</Text>
          { form.rows.map(row => (
            row.components.map(component => {
              if (component.options[0]
                ?.key === 'Input Number') {
                return (
                  <CustomTextInput
                    componentOptions={component.options}
                    value={data?.find(x => x.key === component.shortName)?.value}
                    key={component.shortName}
                    componentData={component.options[0]}
                    keyboardType="phone-pad"
                    onChangeText={e => handleData(component.shortName, e, component.options[0].key)}
                    componentStyle={component.options[4]}
                    component={component}
                  />
                );
              }
              if (component.options[0]
                ?.key === 'Input Date') {
                return (
                  <FormDateInput
                    key={component.shortName}
                    value={data?.find(x => x.key === component.shortName)?.value}
                    componentData={component.options[0]}
                    keyboardType="email-address"
                    onSelect={date => handleData(component.shortName, date, component.options[0].key)}
                    componentOptions={component.options}
                  />
                );
              }
              if (component.options[0]
                ?.key === 'Input Email') {
                return (
                  <CustomTextInput
                    componentOptions={component.options}
                    value={data?.find(x => x.key === component.shortName)?.value}
                    key={component.shortName}
                    componentData={component.options[0]}
                    keyboardType="email-address"
                    onChangeText={e => handleData(component.shortName, e, component.options[0].key)}
                  />
                );
              }
              if (component.options[0]
                ?.key === 'TextArea') {
                return (
                  <CustomTextInput
                    componentOptions={component.options}
                    style={{ height: 80 }}
                    multiline
                    numberOfLines={3}
                    value={data?.find(x => x.key === component.shortName)?.value}
                    key={component.shortName}
                    componentData={component.options[0]}
                    onChangeText={e => handleData(component.shortName, e, component.options[0].key)}
                  />
                );
              }
              if (component.options[0]
                ?.key === 'I am a Button') {
                return (
                  <IButton key={component.shortName} componentData={component.options[0]} componentOptions={component.options} />
                );
              }
              if (component.options[0]
                ?.key === 'Fotoğraf ve Yorum') {
                return (
                  <CustomTextInput
                    componentOptions={component.options}
                    style={{ height: 80 }}
                    multiline
                    numberOfLines={3}
                    value={data?.find(x => x.key === component.shortName)?.value}
                    key={component.shortName}
                    componentData={component.options[0]}
                    onChangeText={e => handleData(component.shortName, e, component.options[0].key)}
                  />
                );
              }
              if (component.options[0]
                ?.key === 'Fotoğraf Çek') {
                return (
                  <CameraComponent
                    key={component.shortName}
                    componentData={component.options[0]}
                    selected={uri => handleData(component.shortName, uri, component.options[0].key)}
                    componentOptions={component.options}
                  />
                );
              }
              if (component.options[0]
                ?.key === '<p>Deneme İçerik</p>') {
                return (
                  <Info value={component.options[0].key} key={component.shortName} />
                );
              }
              if (component.options[0]
                ?.key === 'MultiSelect') {
                return (
                  <MultipleSelect
                    onSelectItem={datam => handleData(component.shortName, datam, component.options[0].key)}
                    value={data?.find(x => x.key === component.shortName)?.value}
                    componentData={component.options.filter(x => x.type === 'Option')}
                    key={component.shortName}
                  />
                );
              }
              if (component
                ?.type === 'Signature') {
                return (
                  <Signature
                    key={component.shortName}
                    selected={uri => handleData(component.shortName, uri, component.options[0].key)}
                    componentData={component.options[0]}
                  />
                );
              }
              if (component.options[0]
                ?.key === 'Checkbox') {
                return (
                  <CheckBox
                    data={data.find(x => x.key === component.shortName)}
                    onPress={value => handleData(component.shortName, value, component.options[0].key)}
                    componentData={component.options.filter(x => x.type === 'Option')}
                    key={component.shortName}
                  />
                );
              }
              if (component.options[0]
                ?.key === 'RadioButton') {
                return (
                  <RadioButton
                    data={data}
                    onPress={uri => handleData(component.shortName, uri, component.options[0].key)}
                    componentData={component.options.filter(x => x.type === 'Option')}
                    key={component.shortName}
                  />
                );
              }
              if (component.options[0]
                ?.key === 'true') {
                return (
                  <BarcodScan
                    componentOptions={component.options}
                    componentData={component.options[0]}
                    selected={uri => handleData(component.shortName, uri, component.options[0].key)}
                    key={component.shortName}
                  />
                );
              }
              if (component.options[0]
                ?.key === 'RECORD VIDEO') {
                return (
                  <VideoComponent
                    selected={uri => handleData(component.shortName, uri, component.options[0].key)}
                    componentData={component.options[0]}
                    componentOptions={component.options}
                    key={component.shortName}
                  />
                );
              }
            })

            // return (<Text>{row.components[0].options[0]?.key}--daha eklenmedi</Text>);
          ))
          }
        </>
      ))
      }
        <TouchableOpacity
          onPress={() => { send(); }}
          style={{ borderRadius: 10, backgroundColor: 'purple', height: 30, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text>{i18n.t('Send')}</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default FormDemo;
