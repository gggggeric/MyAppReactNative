import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Avatar, Snackbar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [name, setName] = useState(''); // Track the name
  const [newPassword, setNewPassword] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>(''); // To store image name
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');

  // Function to pick an image from the gallery or camera
  const pickImage = async () => {
    // Request permission to access media
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

    // Check if the image is selected (not canceled)
    if (!result.canceled) {
      const imageUri = result.assets[0].uri; // This is the local path of the image
      const imageName = result.assets[0].fileName || imageUri.split('/').pop() || 'profile-image'; // Derive name

      setProfileImage(imageUri); // Set the selected image URI
      setImageName(imageName);   // Set the image name
      console.log('Selected image:', imageName); // Log the selected image name
    }
  };

  // Function to remove the profile image
  const removeProfileImage = () => {
    setProfileImage(null); // Reset the profile image
    setImageName(''); // Reset the image name
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
      // Fetch the image as a blob
      const imageResponse = await fetch(profileImage);
      const imageBlob = await imageResponse.blob();

      // Get the image file type from the URI (e.g., .jpg, .png)
      const uriParts = profileImage.split('.');
      const fileType = uriParts[uriParts.length - 1];

      // Append the image to FormData
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
      <Text style={styles.title}>Profile Screen</Text>

      {/* Profile Image Section */}
      <View style={styles.imageContainer}>
        <Avatar.Image
          size={150}
          source={profileImage ? { uri: profileImage } : require('../assets/default-avatar.png')}
          style={styles.profileImage}
        />
        <Button mode="outlined" onPress={pickImage} style={styles.button}>
          Change Profile Image
        </Button>

        {/* Remove Profile Image Button */}
        {profileImage && (
          <Button mode="outlined" onPress={removeProfileImage} style={styles.button}>
            Remove Profile Image
          </Button>
        )}
      </View>

      {/* Image name and URI */}
      {profileImage && (
        <View style={styles.imageInfoContainer}>
          <Text style={styles.imageInfoText}>Image Name: {imageName}</Text>
          <Text style={styles.imageInfoText}>Image URI: {profileImage}</Text>
        </View>
      )}

      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      {/* New Password Section */}
      <TextInput
        label="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Save Button */}
      <Button mode="contained" onPress={handleSaveProfile} style={styles.button}>
        Save Profile
      </Button>

      {/* Snackbar for success message */}
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    marginBottom: 10,
  },
  imageInfoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageInfoText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    marginBottom: 20,
  },
});

export default ProfileScreen;
