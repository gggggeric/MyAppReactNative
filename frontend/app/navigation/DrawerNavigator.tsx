import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'; // import Ionicons for icons
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          width: 270, // Adjust drawer width if necessary
        },
        drawerItemStyle: {
          height: 70,  // Increase height to make the entire item larger and easier to click
          justifyContent: 'center', // Ensure the icon is vertically centered
          paddingHorizontal: 1,  // Increase horizontal padding for more touchable area around the icon
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Login"
        component={LoginScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-in-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-add-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
