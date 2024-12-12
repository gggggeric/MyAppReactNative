import React, { useState, useEffect } from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Alert, View, Text, StyleSheet } from 'react-native';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import ProfileScreen from '../screens/Profile';
import { useAuth } from '../context/AuthContext';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: any) => {
  const { isLoggedIn, handleLogout } = props;

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      {/* Profile Header */}
      {isLoggedIn && (
        <View style={styles.profileHeader}>
          <Ionicons name="person-circle-outline" size={60} color="#FFFFFF" />
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>johndoe@example.com</Text>
        </View>
      )}

      {/* Drawer Items */}
      <DrawerItemList {...props} />

      {/* Logout Button */}
    {isLoggedIn && (
  <DrawerItem
    label="Logout"
    labelStyle={styles.logoutText} // Apply red text style
    icon={({ color, size }) => (
      <Ionicons name="log-out-outline" size={size} color="red" /> // Set icon color to red
    )}
    onPress={handleLogout}
    style={styles.logoutItem}
  />
)}

    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setIsLoggedIn: setContextIsLoggedIn } = useAuth();

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    setIsLoggedIn(!!token);
    setContextIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkToken();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        onPress: async () => {
          await AsyncStorage.removeItem('token');
          setIsLoggedIn(false);
          setContextIsLoggedIn(false);
        },
      },
    ]);
  };

  return (
    <Drawer.Navigator
      initialRouteName={isLoggedIn ? 'Home' : 'Login'}
      drawerContent={(props) => (
        <CustomDrawerContent {...props} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      )}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#15202B', // Dark theme for the top navigation bar
        },
        headerTintColor: '#FFFFFF', // White text and icons in the header
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'bold',
        },
        drawerStyle: styles.drawerStyle, // Dark background for the drawer
        drawerLabelStyle: styles.drawerLabelStyle,
        drawerActiveTintColor: '#1DA1F2', // Twitter blue for active item
        drawerInactiveTintColor: '#8899A6', // Light gray for inactive items
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />

      {!isLoggedIn && (
        <>
          <Drawer.Screen
            name="Login"
            component={LoginScreen}
            options={{
              drawerIcon: ({ color, size }) => <Ionicons name="log-in-outline" size={size} color={color} />,
            }}
          />
          <Drawer.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              drawerIcon: ({ color, size }) => <Ionicons name="person-add-outline" size={size} color={color} />,
            }}
          />
        </>
      )}

      {isLoggedIn && (
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
          }}
        />
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#15202B', // Dark background
  },
  profileHeader: {
    padding: 20,
    backgroundColor: '#1DA1F2', // Twitter blue
    alignItems: 'center',
    marginBottom: 10,
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  profileEmail: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  drawerStyle: {
    backgroundColor: '#15202B', // Dark background
  },
  drawerLabelStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutItem: {
    marginTop: 'auto', // Push to the bottom
  },
  logoutText: {
    color: 'red', // Red text for the logout item
  },
  logoutIcon: {
    color: 'red', // Red icon for the logout item
  },
});
