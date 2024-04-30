import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from './pages/login';
import Register from './pages/register';
import Main from './pages/home';
import Photo from './pages/photo';
import Video from './pages/video'
const Stack = createNativeStackNavigator();
import store from "./store";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Photo" component={Photo} />
        <Stack.Screen name="Video" component={Video} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;
