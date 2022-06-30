import React, { useContext, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import CustomTextInput from '../components/CustomTextInput';
import { CameraContext } from '../context/CameraSettingsContext';

const ImageAndCameraSettins = () => {
  const { quality, setQuality } = useContext(CameraContext);
  const [qualityTemp, setqualityTemp] = useState(quality * 100);

  return (
    <LinearGradient colors={['#74b49b', '#f9f8eb']} style={{ flex: 1, padding: 20 }}>
      <View style={{ marginTop: '15%' }}>
        <CustomTextInput onChangeText={(e => setqualityTemp(e))} value={qualityTemp.toString()} componentData={{ key: 'Quality' }} />
        <TouchableOpacity
          style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', margin: '15%', height: 50, borderRadius: 10, borderColor: 'brown', borderWidth: 2 }}
          onPress={() => setQuality(parseFloat(qualityTemp / 100))}
        >
          <Text>ayarla</Text>
        </TouchableOpacity>
        <Text>{quality}</Text>

        <Feather style={{ textAlign: 'center' }} name="settings" size={80} color="brown" />
      </View>
    </LinearGradient>
  );
};

export default ImageAndCameraSettins;
