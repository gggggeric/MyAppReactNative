import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput, Button, Snackbar, IconButton } from 'react-native-paper';
import axios from 'axios';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); 


  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  // Handle form submission
  const handleRegister = async () => {
    try {
                                                //palitan ng localhost pag emulator
      const response = await axios.post('http://192.168.15.28:5000/api/auth/register', {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        showSnackbar('Registration successful! You can now log in.');
      } else {
        showSnackbar('Registration failed: Unexpected response.');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        showSnackbar(`Registration failed: ${error.message}`);
      } else {
        showSnackbar('Registration failed: An unknown error occurred.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
        keyboardType="email-address"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          mode="outlined"
          secureTextEntry={!passwordVisible} 
        />
        <IconButton
          icon={passwordVisible ? 'eye-off' : 'eye'}
          size={20}
          onPress={() => setPasswordVisible(!passwordVisible)} 
          style={styles.eyeIcon}
        />
      </View>
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Register
      </Button>
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
  },
  input: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    width: '100%',
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
});
