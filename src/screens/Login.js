import React, { useContext, useState } from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import * as Application from 'expo-application';
import { Entypo } from '@expo/vector-icons';
import LoginButton from '../components/LoginButton';
import CustomTextInput from '../components/CustomTextInput';
import { AuthenticationContext } from '../context/AuthenticationContext';
import { NetworkInfoContext } from '../context/NetworkInfoContext';

const Login = () => {
  const { isAuthenticated, setAuthenticated, name, setName } = useContext(AuthenticationContext);
  const { connect } = useContext(NetworkInfoContext);
  const [pass, setPass] = useState('');

  const loginHandle = () => {
    setAuthenticated(true);
    setName(name);
    console.log(name);
    console.log(connect);
  };

  const Uuid = Platform.OS !== 'ios' && Application.androidId;
  return (
    <View style={{ backgroundColor: '#1E324D', flex: 1 }}>
      <View style={{ marginTop: '50%', marginHorizontal: '10%', backgroundColor: '#0049C9', padding: 20, borderRadius: 7 }}>
        <Entypo name="network" size={24} color={connect ? 'green' : 'red'} />
        <Text style={{ color: 'aliceblue' }}>type your username</Text>
        {/* <CustomTextInput onChangeText={e => setName(e)} value={name} style={{ marginTop: 0, borderRadius: 10, backgroundColor: 'aliceblue' }} />
        <Text style={{ color: 'aliceblue' }}>type your surname</Text>
        <CustomTextInput onChangeText={e => setPass(e)} value={pass} style={{ marginTop: 0, borderRadius: 10, backgroundColor: 'aliceblue' }} /> */}
        <Text style={{ color: 'white', marginTop: 10 }}>unique id:{ Uuid }</Text>
        <LoginButton onPress={() => loginHandle()} style={{ backgroundColor: 'aliceblue', marginTop: 30, borderRadius: 10 }} text="Log in" />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  net: {
    color: 'red',
  },
  nonet: {
    color: 'white',
  },
});
