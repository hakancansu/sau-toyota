import React, { createContext, useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

const NetworkInfoContext = createContext();

const NetworkInfoProvider = ({ children }) => {
  const [connect, setConnect] = useState(false);
  const [strength, setStrength] = useState(false);

  const checkConnected = () => NetInfo.fetch().then(state => state);

  const setConnected = () => checkConnected().then(res => { setConnect(res.isConnected); });
  const setConnectStrength = () => checkConnected().then(res => { setStrength(res.details.strength); });

  useEffect(() => {
    setConnected();
  }, []);

  return (
    <NetworkInfoContext.Provider value={{ connect, setConnected, strength, setConnectStrength }}>
      {children}
    </NetworkInfoContext.Provider>
  );
};

export { NetworkInfoContext, NetworkInfoProvider };
