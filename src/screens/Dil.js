import i18n from 'i18n-js';
import React, { useContext, useState } from 'react';
import { Text, Button } from 'react-native';
import { Restart } from 'fiction-expo-restart';
import * as SecureStore from 'expo-secure-store';
import LoginButton from '../components/LoginButton';
import { LocalizeContext } from '../context/LocalizeContext';

const Dil = () => {
  const local = async () => {
    await SecureStore.setItemAsync('language', 'tr-TR');
    Restart();
  };
  const localİng = async () => {
    await SecureStore.setItemAsync('language', 'en-EN');
    Restart();
  };

  return (
    <><LoginButton onPress={() => local()} text={i18n.t('Turkish')} /><LoginButton onPress={() => localİng()} text={i18n.t('English')} /></>
  );
};

export default Dil;
