//route.js
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TodoPage from '../screens/TodoPage/TodoPage';
import LoadingScreen from '../screens/LoadingScreen/LoadingScreen';
const Stack = createStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoadingScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="TodoPage" component={TodoPage} />
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
    </Stack.Navigator>
  );
};

export default Routes;
