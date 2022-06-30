import React, { useState, useContext } from 'react';
import { Text, ScrollView, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { NetworkInfoContext } from '../context/NetworkInfoContext';

const OfflineForms = ({ navigation }) => {
  const { connect } = useContext(NetworkInfoContext);
  const [offlineData, setOfflineData] = useState([]);

  const save = async () => {
    const unsaved = await SecureStore.getItemAsync('unsavedForms');
    setOfflineData(JSON.parse(unsaved));
    if (connect) {
      console.log(JSON.parse(unsaved));
      await SecureStore.deleteItemAsync('unsavedForms');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      save();
    }, [offlineData]),
  );

  return (
    <LinearGradient colors={['#74b49b', '#f9f8eb']} style={{ flex: 1, alignItems: 'center' }}>
      <ScrollView style={{ height: 220, marginTop: 50 }}>
        {
          offlineData?.map((data, index1) => (
            <TouchableOpacity onPress={() => { navigation.navigate('EditForms', { formInfo: data }); }} key={index1} style={{ backgroundColor: 'white', padding: 10, borderRadius: 30, margin: 5, width: 250 }}>
              {
                data?.formData?.map(x => <Text key={x.key}>{x.componentName} : {x.value}</Text>)
              }
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </LinearGradient>
  );
};

export default OfflineForms;
