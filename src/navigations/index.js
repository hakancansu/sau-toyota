/* eslint-disable react/no-unstable-nested-components */
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, AntDesign, FontAwesome } from '@expo/vector-icons';
import i18n from 'i18n-js';
import Login from '../screens/Login';
import Menu from '../screens/Menu';
import Settings from '../screens/Settings';
import OfflineForms from '../screens/OfflineForms';
import EditForms from '../screens/EditForms';
import ImageAndCameraSettins from '../screens/ImageAndCameraSettins';
import { AuthenticationContext } from '../context/AuthenticationContext';
import FormDemo from '../screens/FormDemo';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{ title: i18n.t('tab_Menu'), headerShown: false, tabBarIcon: () => <Feather name="menu" size={24} color="black" /> }}
      />
      <Tab.Screen
        name="Form"
        component={FormDemo}
        options={{ unmountOnBlur: true, title: i18n.t('Form'), headerShown: false, tabBarIcon: () => <AntDesign name="form" size={24} color="black" /> }}
      />
      <Tab.Screen
        name="OfflineForms"
        component={OfflineForms}
        options={{ unmountOnBlur: true, title: i18n.t('OfflineForms'), headerShown: false, tabBarIcon: () => <FontAwesome name="wpforms" size={24} color="black" /> }}
      />
      <Tab.Screen
        name="Setting"
        component={Settings}
        options={{ title: i18n.t('Setting'), headerShown: false, tabBarIcon: () => <Feather name="settings" size={24} color="black" /> }}
      />
    </Tab.Navigator>
  );
}

const MainStack = createNativeStackNavigator();
export const navigationRef = React.createRef();

export const Main = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack.Navigator>
        {isAuthenticated ? (
          <>
            <MainStack.Screen name="UserScreen" component={Tabs} options={{ headerShown: false, tabBarIcon: () => <Feather name="menu" size={24} color="black" /> }} />
            <MainStack.Screen name="EditForms" component={EditForms} options={{ headerShown: true }} />
            <MainStack.Screen name="ImageAndCameraSettins" component={ImageAndCameraSettins} options={{ headerShown: true }} />
          </>
        )
          : (
            <MainStack.Screen name="Auth" component={Login} options={{ headerShown: false, tabBarIcon: () => <Feather name="menu" size={24} color="black" /> }} />
          )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
