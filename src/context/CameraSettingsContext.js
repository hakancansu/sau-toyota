import React, { createContext, useState } from 'react';

const CameraContext = createContext();

const CameraProvider = ({ children }) => {
  const [quality, setQuality] = useState(1);

  const value = React.useMemo(() => ({
    setQuality, quality,
  }), [quality]);
  return (
    <CameraContext.Provider value={value}>
      {children}
    </CameraContext.Provider>
  );
};

export { CameraContext, CameraProvider };
