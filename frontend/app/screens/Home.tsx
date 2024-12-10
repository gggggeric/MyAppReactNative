// app/screens/HomeScreen.tsx
import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Robot Hotel Booking</Text>
      <Text style={styles.subtitle}>Your automated hotel booking assistant</Text>

      <Button
        title="Get Started"
        onPress={() => navigation.navigate('Login')}
        color="#4CAF50"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#888',
    marginTop: 10,
  },
});
