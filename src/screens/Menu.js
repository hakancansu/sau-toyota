import I18n from 'i18n-js';
import React, { useContext, useState, useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthenticationContext } from '../context/AuthenticationContext';
import { NetworkInfoContext } from '../context/NetworkInfoContext';

const Menu = () => {
  const { setAuthenticated } = useContext(AuthenticationContext);
  const { connect } = useContext(NetworkInfoContext);
  const { name } = useContext(AuthenticationContext);
  const [netİnfo, setNetİnfo] = useState('');

  useEffect(() => {
    if (connect === false) {
      setNetİnfo('çevrimdışı moddasınız');
    }
  }, [netİnfo]);

  return (
    <LinearGradient colors={['#74b49b', '#f9f8eb']} style={{ flex: 1, alignItems: 'center' }}>
      <MaterialCommunityIcons name="cpu-32-bit" size={300} color="black" style={{ marginTop: '8%' }} />
      <Text style={{ marginTop: 50, color: '#1e2022', fontSize: 30 }}>{I18n.t('Welcome')} {name}
      </Text><Entypo name="network" size={24} color={connect ? 'green' : 'red'} />
      <Text style={{ fontSize: 14, color: 'white' }}>{netİnfo}</Text>
      <TouchableOpacity
        onPress={() => setAuthenticated(false)}
        style={{ backgroundColor: 'aliceblue',
          marginTop: 30,
          borderRadius: 10,
          height: 40,
          padding: 10,
          width: 150,
          alignItems: 'center' }}
      >
        <Text style={{ color: '#1e2022' }} onPress={() => setAuthenticated(false)}>{I18n.t('Exit')}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Menu;
