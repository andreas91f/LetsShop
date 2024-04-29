import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from "./screens/Home"; // Import the HomeScreen component
import { ItemDetails } from './screens/ItemDetails';
import { ListDetails } from './screens/ListDetails';
import { Help } from './screens/Help';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="ListDetails" component={ListDetails} />
        <Stack.Screen name="ItemsDetails" component={ItemDetails} />
        <Stack.Screen name="Help" component={Help} />
      </Stack.Navigator >
    </NavigationContainer>

  );
};

export default App;

