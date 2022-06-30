import React, { createContext, useState } from 'react';

const AuthenticationContext = createContext();

const AuthenticationProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [name, setName] = useState('');

  const value = React.useMemo(() => ({
    isAuthenticated, setAuthenticated, name, setName,
  }), [isAuthenticated, name]);

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export { AuthenticationContext, AuthenticationProvider };
