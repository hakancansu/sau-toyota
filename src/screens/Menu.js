import React, { useContext } from 'react';
import { Text } from 'react-native';
import i18n from 'i18n-js';
import { AuthenticationContext } from '../context/AuthenticationContext';

const Menu = () => {
  const { name } = useContext(AuthenticationContext);
  return (
    <Text style={{ marginTop: 100 }}>{i18n.t('welcome')} {name} </Text>
  );
};

export default Menu;
