import React, { useState, useEffect } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import ProfileScreen from '../screens/Profile';  // Add Profile Screen import
import { useAuth } from '../context/AuthContext'; 

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: any) => {
  const { isLoggedIn, handleLogout } = props;

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      
      {isLoggedIn && ( // Show logout and profile options only if the user is logged in
        <>
          <DrawerItem
            label="Logout"
            icon={({ color, size }) => (
              <Ionicons name="log-out-outline" size={size} color={color} />
            )}
            onPress={handleLogout}
            style={{
              marginTop: 'auto',
            }}
          />
        </>
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
      
    return () => clearInterval(intervalId); // Cleanup when the component unmounts
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            await AsyncStorage.removeItem('token'); 
            setIsLoggedIn(false); 
            setContextIsLoggedIn(false); 
          },
        },
      ]
    );
  };

  return (
    <Drawer.Navigator
      initialRouteName={isLoggedIn ? 'Home' : 'Login'} // Conditionally navigate based on login state
      drawerContent={(props) => <CustomDrawerContent {...props} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}
      screenOptions={{
        drawerStyle: {
          width: 270,
        },
        drawerItemStyle: {
          height: 70,
          justifyContent: 'center',
          paddingHorizontal: 1,
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
      
      {/* Conditionally show Login and Register screens if not logged in */}
      {!isLoggedIn && (
        <>
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
        </>
      )}

      {/* Profile Screen, only accessible when logged in */}
      {isLoggedIn && (
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}  // Profile Screen component
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
