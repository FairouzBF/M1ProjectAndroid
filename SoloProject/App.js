import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import Routes from './src/config/routes';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const Navigation = gestureHandlerRootHOC(NavigationContainer);
  return (
    <SafeAreaProvider>
      <Navigation>
        <Routes />
      </Navigation>
    </SafeAreaProvider>
  );
};

export default App;
