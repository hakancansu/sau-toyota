import React, { createContext, useState } from 'react';

const AuthenticationContext = createContext();

const AuthenticationProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [name, setName] = useState('');
  return (
    <AuthenticationContext.Provider value={{ isAuthenticated, setAuthenticated, name, setName }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export { AuthenticationContext, AuthenticationProvider };
