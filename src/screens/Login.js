import React, { useContext, useState } from 'react';
import { View, Text, Platform, TextInput, Image, TouchableOpacity } from 'react-native';
import * as Application from 'expo-application';
import { Entypo } from '@expo/vector-icons';
import i18n from 'i18n-js';
import { LinearGradient } from 'expo-linear-gradient';
import * as Localization from 'expo-localization';
import LoginButton from '../components/LoginButton';
import { LoaderContext } from '../context/LoaderContext';
import { AuthenticationContext } from '../context/AuthenticationContext';
import { NetworkInfoContext } from '../context/NetworkInfoContext';
import Members from '../constants/Members.json';
import { LocalizeContext } from '../context/LocalizeContext';

const Login = () => {
  const { setAuthenticated, name, setName } = useContext(AuthenticationContext);
  const { setLocale, locale } = useContext(LocalizeContext);

  const { connect } = useContext(NetworkInfoContext);
  const { setLoader } = useContext(LoaderContext);
  const [pass, setPass] = useState('Cansu');
  const [messageError, setMessageError] = useState('');
  const { Persons } = Members;

  const loginHandle = () => {
    const user = Persons.find(person => (person.name === name && person.surname === pass));
    if (user !== undefined) {
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
        setAuthenticated(true);
      }, (3000));
    } else {
      setMessageError('Kullanıcı adınızı veya şifrenizi yanlış girdiniz');
    }

    console.log(connect);
  };
  const Uuid = Platform.OS !== 'ios' && Application.androidId;
  return (
    <LinearGradient colors={['#74b49b', '#f9f8eb']} style={{ flex: 1, padding: 20 }}>

      <View style={{ flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '40%',
        marginHorizontal: '12%' }}
      >
        <Text style={{ color: 'aliceblue',
          fontSize: 50,
          marginBottom: 15,
          textAlign: 'center',
          fontStyle: 'italic' }}
        >{i18n.t('Hello')} !
        </Text>
        <TextInput
          placeholder={i18n.t('type your username')}
          onChangeText={e => setName(e)}
          value={name}
          style={{ backgroundColor: '#FFFFFF',
            justifyContent: 'center',
            paddingHorizontal: 10,
            height: 40,
            marginTop: 20,
            marginBottom: 10,
            borderRadius: 10 }}
        />
        <TextInput
          placeholder={i18n.t('type your surname')}
          onChangeText={e => setPass(e)}
          value={pass}
          style={{ backgroundColor: '#FFFFFF',
            justifyContent: 'center',
            paddingHorizontal: 10,
            marginBottom: 10,
            height: 40,
            marginTop: 20,
            borderRadius: 10 }}
        />
        <Text style={{ color: 'white', marginTop: 10 }}>{i18n.t('unique id')}:{ Uuid }</Text>
        <Text style={{ color: 'red' }}>{messageError}</Text>
        <LoginButton
          onPress={() => { loginHandle(); }}
          style={{ backgroundColor: 'aliceblue', marginTop: 30, borderRadius: 10 }}
          text={i18n.t('Log in')}
        />
        <Entypo
          style={{ textAlign: 'center', marginTop: 30 }}
          name="network"
          size={34}
          color={connect ? '#1CE043' : 'red'}
        />
        <Text style={{ textAlign: 'center',
          fontSize: 18,
          fontStyle:
         'italic',
          color: connect ? 'white' : 'white' }}
        >{connect ? 'Online mod' : 'Offline mod'}
        </Text>
        {
          Localization.locale === locale ? (
            <TouchableOpacity onPress={() => setLocale('En-US')}>
              <Image source={require('../../image/Turkey.png')} style={{ width: 42, height: 30 }} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setLocale('tr-TR')}>
              <Image source={require('../../image/England.png')} style={{ width: 42, height: 30 }} />
            </TouchableOpacity>
          )
        }

      </View>

    </LinearGradient>
  );
};

export default Login;
