import React, { createContext, useState } from 'react';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
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
  const [locale, setLocale] = useState(Localization.locale);
  i18n.locale = locale;

  const value = React.useMemo(() => ({
    locale, setLocale,
  }), [locale]);

  return (
    <LocalizeContext.Provider value={value}>
      {children}
    </LocalizeContext.Provider>
  );
};

export { LocalizeContext, LocalizeProvider };
