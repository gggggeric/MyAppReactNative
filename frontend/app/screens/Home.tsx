// app/screens/HomeScreen.tsx
import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World!</Text>
      <Button
        title="Get Started"
        onPress={() => navigation.navigate('Login')}
        color="#1DA1F2" // Twitter blue for the button
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#15202B', // Dark Twitter background
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#8899A6', // Gray text for a subtler tone
    marginTop: 10,
  },
});
