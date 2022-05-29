import React, { createContext, useState } from 'react';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import * as SecureStore from 'expo-secure-store';
import { en } from '../languages/en';
import { tr } from '../languages/tr';

i18n.translations = {
  en,
  tr,
};
i18n.fallbacks = true;
i18n.defaultSeparator = '|';

const LocalizeContext = createContext();

const LocalizeProvider = ({ children }) => {
  const [locale, setLocale] = useState('tr');

  const getLanguage = async () => {
    const dil = await SecureStore.getItemAsync('language');
    return dil;
  };

  React.useEffect(() => {
    SecureStore.getItemAsync('language').then(x => { i18n.locale = x; });
  }, []);

  return (
    <LocalizeContext.Provider value={{ i18n, locale, setLocale }}>
      { children }
    </LocalizeContext.Provider>
  );
};

export { LocalizeContext, LocalizeProvider };
