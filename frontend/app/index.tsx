import React from 'react';
import DrawerNavigator from './navigation/DrawerNavigator';

export default function Index() {
  return <DrawerNavigator />;  // Don't wrap DrawerNavigator in NavigationContainer here
}
