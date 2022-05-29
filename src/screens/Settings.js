import React from 'react';
import { View, Platform } from 'react-native';
import * as Application from 'expo-application';
import i18n from 'i18n-js';
import SettingsButton from '../components/SettingsButton';

function Settings({ navigation }) {
  const Uuid = Platform.OS !== 'ios' && Application.androidId;
  return (
    <View style={{ marginTop: 25, flex: 1, backgroundColor: 'white' }}>
      <SettingsButton text={i18n.t('Offline Forms')} />
      <SettingsButton onPress={() => { navigation.navigate('Dil'); }} text={i18n.t('language')} />
      <SettingsButton text={i18n.t('picture and camera settings')} />
      <SettingsButton text={`Cihaz UUID:${Uuid}`} />
    </View>
  );
}

export default Settings;
