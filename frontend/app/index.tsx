import React from 'react';
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider
import DrawerNavigator from './navigation/DrawerNavigator';

export default function Index() {
  return (
    <AuthProvider>  {/* Wrap the application with AuthProvider */}
      <DrawerNavigator />
    </AuthProvider>
  );
}

export const screenOptions = {
  headerShown: false, // Hides the header for this screen
};
