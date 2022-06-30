/* eslint-disable react/react-in-jsx-scope */
import { View } from 'react-native';
import { AuthenticationProvider } from './src/context/AuthenticationContext';
import { LoaderProvider } from './src/context/LoaderContext';
import { LocalizeProvider } from './src/context/LocalizeContext';
import { NetworkInfoProvider } from './src/context/NetworkInfoContext';
import { CameraProvider } from './src/context/CameraSettingsContext';

import { Main } from './src/navigations';

export default function App() {
  return (
    <LocalizeProvider>
      <LoaderProvider>
        <AuthenticationProvider>
          <NetworkInfoProvider>
            <CameraProvider>
              <View style={{ flex: 1 }}>
                <Main />
              </View>
            </CameraProvider>
          </NetworkInfoProvider>
        </AuthenticationProvider>
      </LoaderProvider>
    </LocalizeProvider>
  );
}
