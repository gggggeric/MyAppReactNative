import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { TextInput, Button, Snackbar, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';  // Import StackNavigationProp type
import { useAuth } from '../context/AuthContext';  // Import AuthContext

// Define the types for navigation params
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
};

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Type the navigation prop here
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { setIsLoggedIn } = useAuth();  // Access setIsLoggedIn from context

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.15.28:5000/api/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, userId } = response.data; // Extract token and userId from response

        // Store the token and userId
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('userId', userId); // Store the userId

        console.log('Stored token:', token); // Check if token is saved
        console.log('Stored userId:', userId); // Check if userId is saved

        setIsLoggedIn(true); // Update login state using context
        showSnackbar('Login successful!');
        navigation.navigate('Home'); // Navigate to Home screen after successful login
      } else {
        showSnackbar('Login failed: Unexpected response.');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        showSnackbar(`Login failed: ${error.message}`);
      } else {
        showSnackbar('Login failed: An unknown error occurred.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          mode="outlined"
          secureTextEntry={!passwordVisible}
          autoCapitalize="none"
        />
        <IconButton
          icon={passwordVisible ? 'eye-off' : 'eye'}
          size={20}
          onPress={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
          style={styles.eyeIcon}
        />
      </View>

      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        Login
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Don't have an account? Register here</Text>
      </TouchableOpacity>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 5,
  },
  passwordContainer: {
    width: '100%',
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 5,
    top: 8,
  },
  button: {
    marginTop: 20,
    width: '100%',
    padding: 12,
    backgroundColor: '#6200ee',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  registerText: {
    marginTop: 20,
    fontSize: 14,
    color: '#6200ee',
    textDecorationLine: 'underline',
  },
});
