import React, { useContext } from 'react';
import { View, Platform } from 'react-native';
import * as Application from 'expo-application';
import i18n from 'i18n-js';
import { Entypo, Octicons, Fontisto, AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import NetInfo from '@react-native-community/netinfo';
import SettingsButton from '../components/SettingsButton';
import { NetworkInfoContext } from '../context/NetworkInfoContext';

function Settings({ navigation }) {
  const Uuid = Platform.OS !== 'ios' && Application.androidId;
  const { connect, setConnect } = useContext(NetworkInfoContext);

  const close = () => {
    setConnect(false);
  };

  const open = () => {
    const checkConnected = () => NetInfo.fetch().then(state => state);
    checkConnected().then(res => { setConnect(res.isConnected); });
  };

  return (
    <LinearGradient colors={['#74b49b', '#f9f8eb']} style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <SettingsButton
          icon={<Octicons name="device-camera" size={24} color="black" />}
          onPress={() => { navigation.navigate('ImageAndCameraSettins'); }}
          text={i18n.t('picture and camera settings')}
        />
        <AntDesign name="doubleright" size={24} color="black" style={{ alignSelf: 'center' }} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <SettingsButton
          icon={<Fontisto name="mobile" size={24} color="black" />}
          text={`Device UUID:${Uuid}`}
        />
        <AntDesign name="doubleright" size={24} color="black" style={{ alignSelf: 'center' }} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <SettingsButton
          icon={<Entypo name="network" size={24} color={connect ? 'green' : 'red'} style={{ alignSelf: 'center' }} />}
          text={connect ? i18n.t('online mode') : i18n.t('offline mode')}
          onPress={() => (connect ? close() : open())}
        />
        <AntDesign name="doubleright" size={24} color="black" style={{ alignSelf: 'center' }} />
      </View>
    </LinearGradient>
  );
}

export default Settings;
