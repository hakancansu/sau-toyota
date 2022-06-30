import React, { useState, createContext } from 'react';
import { ModalComponent } from '../components/ModalComponent';

const LoaderContext = createContext();

const LoaderProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);

  const value = React.useMemo(() => ({
    setLoader, loader,
  }), [loader]);

  return (
    <LoaderContext.Provider value={value}>
      <ModalComponent animationType="none" visible={loader} />
      {children}
    </LoaderContext.Provider>
  );
};

export { LoaderContext, LoaderProvider };
