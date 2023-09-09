import React, { memo, useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import styled from 'styled-components/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { configStore } from '@state/store';
import SplashScreen from 'react-native-splash-screen';
import Navigator from '@routes/Routes';
import storeRegistry from '@utils/redux/storeRegistry';

const { store, persistor } = configStore();
export { store };
storeRegistry.register(store);

const App = memo(() => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppSplashScreen />
        <ThemedApplication />
      </GestureHandlerRootView>
    </PersistGate>
  </Provider>
));

// We need ThemedApplication as separate entity to have access to user state
const ThemedApplication = memo(() => (
  <NavWrapper>
    <Navigator />
  </NavWrapper>
));

const AppSplashScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 100);
  });
  return <></>;
};

App.displayName = 'App';
ThemedApplication.displayName = 'ThemedApplication';

const NavWrapper = styled.View`
  background-color: white;
  flex: 1;
`;

export default App;
