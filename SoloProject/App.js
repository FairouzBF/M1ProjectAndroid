//App.js
import React, {useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/config/routes';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import notifee, {EventType} from '@notifee/react-native';

import {configureBackgroundFetch} from './src/services/backgroudFetch';
import {
  createNotificationChannel,
  onBackgroundEvent,
  setNavigationRef,
} from './src/services/notificationHelper';

const App = () => {
  const navigationRef = useRef(null);

  useEffect(() => {
    createNotificationChannel();
    // Listen for when a notification is pressed
    const unsubscribe = notifee.onForegroundEvent(({type, detail}) => {
      if (type === EventType.PRESS) {
        // Navigate to the app when notification is pressed
        console.log('Notification pressed', detail.notification);
        navigationRef.current?.navigate('TodoPage');
      }
    });
    setNavigationRef(navigationRef);
    configureBackgroundFetch();
    return () => unsubscribe();
  }, []);

  notifee.onBackgroundEvent(onBackgroundEvent);
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <Routes />
        <Toast />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
