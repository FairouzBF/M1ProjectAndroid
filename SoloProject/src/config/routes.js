import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TaskPage from '../screens/TaskPage/TaskPage';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator initialRouteName="Task">
      <Stack.Screen
        name="TaskPage"
        component={TaskPage}
        initialParams={{name: 'Task'}}
        options={{title: 'Task Page', headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Routes;
