import React, { useState, createContext } from 'react';
import { ModalComponent } from '../components/ModalComponent';

const LoaderContext = createContext();

const LoaderProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);
  return (
    <LoaderContext.Provider value={{ setLoader, loader }}>
      <ModalComponent animationType="none" visible={loader} />
      {children}
    </LoaderContext.Provider>
  );
};

export { LoaderContext, LoaderProvider };
