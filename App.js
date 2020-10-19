import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


import CreateDataScreen from './src/screens/CreateDataScreen';
import TodoScreen1 from './src/screens/TodoScreen1';
import TodoScreen2 from './src/screens/TodoScreen2';
import TodoScreen3 from './src/screens/TodoScreen3';
import QuitScreen from './src/screens/QuitScreen';
import StatusScreen from './src/screens/StatusScreen';


const Stack = createStackNavigator();


function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CreateData" component={CreateDataScreen} />
      <Stack.Screen name="Status" component={StatusScreen} options={{ gestureEnabled: false, headerShown: false }} />
      <Stack.Screen name="Heart" component={TodoScreen1} />
      <Stack.Screen name="Technique" component={TodoScreen2} />
      <Stack.Screen name="Body" component={TodoScreen3} />
      <Stack.Screen name="Quit" component={QuitScreen} />
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
