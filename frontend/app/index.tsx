import React from 'react';
import DrawerNavigator from './navigation/DrawerNavigator';

export default function Index() {
  return <DrawerNavigator />;
}

export const screenOptions = {
  headerShown: false, // Hides the header for this screen
};
