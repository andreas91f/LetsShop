import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from "./screens/Home"; // Import the HomeScreen component
import { ItemDetails } from './screens/ItemDetails';
import { ListDetails } from './screens/ListDetails';
import { Help } from './screens/Help';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const App = () => {

  const homeHeaderLeft = () => (
    <Image
      source={require('./assets/images/logo.jpg')}
      style={{
        height: 50,
        width: 50,
        marginRight: 10
      }}
    />
  );

  const homeHeaderRight = ({ navigation }) => (
    <Pressable onPress={() => navigation.navigate('Help')}>
      <AntDesign name="question" size={24} color="green" style={{ marginRight: 15 }} />
    </Pressable>
  );
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            headerShown: true,
            title: "Home",
            headerLeft: homeHeaderLeft,
            headerRight: () => homeHeaderRight({ navigation }),
          })}
        />
        <Stack.Screen name="ListDetails" component={ListDetails} title="List details" />
        <Stack.Screen
          name="ItemDetails"
          component={ItemDetails}
          options={({ route }) => ({ title: route.params.itemName })} // Dynamic title based on route params
        />
        <Stack.Screen name="Help" component={Help} />
      </Stack.Navigator >
    </NavigationContainer>

  );
};

export default App;

