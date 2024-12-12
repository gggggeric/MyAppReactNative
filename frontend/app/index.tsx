import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { AuthProvider } from './context/AuthContext'; 
import DrawerNavigator from './navigation/DrawerNavigator';

export default function Index() {
  return (
    <AuthProvider> 
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#15202B" /> {/* Dark status bar */}
        <DrawerNavigator />
      </View>
    </AuthProvider>
  );
}

export const screenOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: '#1DA1F2', // Twitter Blue for header background
  },
  headerTintColor: '#FFFFFF', // White text for headers
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15202B', // Dark mode background
  },
});
