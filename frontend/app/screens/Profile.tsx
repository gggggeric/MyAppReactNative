import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Modal, TouchableOpacity } from 'react-native';
import { TextInput, Button, Avatar, Snackbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const pickImage = async () => {
    closeModal();
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission Denied', 'You need to allow media permissions to select an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setProfileImage(imageUri);
    }
  };

  const takePhoto = async () => {
    closeModal();
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission Denied', 'You need to allow camera permissions to take a photo.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setProfileImage(imageUri);
    }
  };

  const removeProfileImage = () => {
    closeModal();
    setProfileImage(null);
  };

  const handleSaveProfile = async () => {
    if (!name) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    if (newPassword) formData.append('password', newPassword);

    if (profileImage) {
      const imageResponse = await fetch(profileImage);
      const imageBlob = await imageResponse.blob();
      const uriParts = profileImage.split('.');
      const fileType = uriParts[uriParts.length - 1];
      formData.append('profileImage', imageBlob, `profileImage.${fileType}`);
    }

    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await axios.put(
        `http://192.168.15.28:5000/api/user/profile/${userId}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.status === 200) {
        setSnackBarMessage('Profile updated successfully.');
        setSnackBarVisible(true);
      } else {
        setSnackBarMessage('There was an issue updating your profile.');
        setSnackBarVisible(true);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'There was an error updating your profile. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <View style={styles.imageContainer}>
        <Avatar.Image
          size={150}
          source={profileImage ? { uri: profileImage } : require('../assets/default-avatar-2.png')}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.iconButton} onPress={openModal}>
          <MaterialIcons name="camera-alt" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Button onPress={takePhoto} style={styles.modalButton}>Take a Photo</Button>
            <Button onPress={pickImage} style={styles.modalButton}>Upload a Photo</Button>
            {profileImage && (
              <Button onPress={removeProfileImage} style={styles.modalButton}>Remove Photo</Button>
            )}
            <Button onPress={closeModal} style={styles.modalButton}>Cancel</Button>
          </View>
        </View>
      </Modal>

      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        label="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button mode="contained" onPress={handleSaveProfile} style={styles.button}>
        Save Profile
      </Button>

      <Snackbar
        visible={snackBarVisible}
        onDismiss={() => setSnackBarVisible(false)}
        duration={Snackbar.DURATION_SHORT}
      >
        {snackBarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#15202B', // Twitter blue for the background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // White color for the title text
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    marginBottom: 10,
  },
  iconButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    elevation: 2,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for the modal background
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#15202B', // Twitter blue background for modal
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalButton: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#fff', // White buttons in the modal
    color: '#1DA1F2', // Twitter blue text on the button
  },
  input: {
    width: '100%',
    marginBottom: 20,
    borderColor: '#fff', // White border for the input fields
    borderWidth: 1,
    color: '#fff', // White text inside the input field
  },
  button: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff', // White button for saving profile
    color: '#1DA1F2', // Twitter blue text
  },
  buttonText: {
    color: '#1DA1F2', // Twitter blue text color for the button text
  },
});




export default ProfileScreen;
