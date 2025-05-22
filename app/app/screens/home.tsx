import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, Modal, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { ThemedButton } from '../components/ThemedButton';
import { ThemedTextInput } from '../components/ThemedTextInput';     

// API URL
const API_URL = 'http://192.168.5.34'; 

export default function HomeScreen() {

  // Initialize the router  
  const router = useRouter(); 

  // Handles Sign in Modal State
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!isModalVisible);

  // Handles Create Account Modal State
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const toggleCreateModal = () => setCreateModalVisible(!isCreateModalVisible);

  // User Inputs for Sign In and Create Account
  const [fullName, setFullName]= useState('');
  const [username, setUser] = useState(''); 
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  // Handles Success/Error Message Modal State
  const [isMessageModalVisible, setMessageModalVisible] = useState(false);
  const toggleMessageModal = () => setMessageModalVisible(!isMessageModalVisible);
  const [message, setMessage] = useState('');     

  // Sign In Logic
  const handleSignIn = async () => {

    // Check if username and password are provided
    if (!username) {
      setMessage('Missing Username!');
      toggleMessageModal();
      return;
    }
    else if (!password) {
      setMessage('Missing Password!');
      toggleMessageModal();
      return;
    }

    // Check if username and password match database
    else try {
      const response = await fetch(API_URL + ':3000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      // If user is found, save token and close modal
      if (response.ok) {
        await AsyncStorage.setItem('authToken', data.token); // Save token
        toggleModal();
        setMessage('Signed In!');

      // If user is not found, show error message
      } else {
        setMessage('Wrong Username or Password!');
      }
      toggleMessageModal();
    } catch (error) {  
      setMessage('Failed to Sign In. Please try again later.');
      toggleMessageModal();
    }
  };

  // Create Account Logic
const handleCreateAccount = async () => {

  // Check if all required fields are filled
  if (!fullName) {
    setMessage("Missing Full Name!");
    toggleMessageModal();
    return;
  }
  if (!username) {
    setMessage("Missing Username!");
    toggleMessageModal();
    return;
  }
  if (!email) {
    setMessage("Missing Email!");
    toggleMessageModal();
    return;
  }
  if (!password || !retypePassword) {
    setMessage("Missing Password!");
    toggleMessageModal();
    return;
  } else if (password !== retypePassword) {
    setMessage("Passwords Do Not Match!");
    toggleMessageModal();
    return;
  }

  // Check if username is already taken
  try {
    const response = await fetch(API_URL + ":3000/api/request/users");
    const users = await response.json();

    if (users && users.some((user: { username: string }) => user.username === username)) {
      setMessage("Username is already taken!");
      toggleMessageModal();
      return;
    }

    // Create new user
    const createResponse = await fetch(API_URL + ":3000/api/request/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        username,
        email,
        phoneNumber,
        password,
      }),
    });
    const data = await createResponse.json();

    // Check if user was created successfully
    if (createResponse.ok) {
      setMessage("New User Created!"); 
      toggleCreateModal();
    } else { 
      const errorMessage = data?.error || "Failed to create account!";
      setMessage(errorMessage); 
    }
    toggleMessageModal();  
  } catch (error) {
    setMessage("Failed to Create Account. Please try again later."); 
    toggleMessageModal();
  }
};

  return (
    
    // PLACE SCROLLVIEW AND THEMEDVIEW CONTAINER BY DEFAULT IN ALL SCREENS
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.container}>

        {/* Title of the Screen */}
        <ThemedText type="title">Golfbud</ThemedText>
        
        {/* Sign In and Create Account Buttons */}  
        <ThemedView style={styles.buttonsContainer}>
          <ThemedButton onPress={toggleModal} title="Sign In" /> 
          <ThemedButton onPress={toggleCreateModal} title="Create Account" /> 
        </ThemedView>

        {/* Sign In Modal */}
        <Modal visible={isModalVisible} transparent animationType="fade" 
                onRequestClose={toggleModal}>
          <ThemedView style={styles.modalOverlay}>
            <ThemedView style={styles.modalContainer}>

              {/* Sign In Modal Title */}
              <ThemedText type="request" style={styles.modalTitle}>Sign In</ThemedText>

              {/* Sign In Form Options */}
              <ThemedTextInput placeholder="Username" value={username}
                onChangeText={setUser} />
              <ThemedTextInput placeholder="Password" value={password}
                onChangeText={setPassword} secureTextEntry/>
              
              {/* Submit Sign In or Cancel Buttons for Modal*/}
              <ThemedView style={styles.buttonContainer}>
                <ThemedButton onPress={handleSignIn} title="Submit" />
                <ThemedButton onPress={toggleModal} title="Cancel" />
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </Modal> 

        {/* Create Account Modal */}
        <Modal visible={isCreateModalVisible} transparent animationType="fade" 
                onRequestClose={toggleCreateModal}>
          <ThemedView style={styles.modalOverlay}>
            <ThemedView style={styles.modalContainer}>

              {/* Create Account Modal Title */}
              <ThemedText type="request" style={styles.modalTitle}>Create Account</ThemedText>

              {/* Create Account Form Options */}
              <ThemedText style={styles.entryTitle}>Full Name *</ThemedText>
              <ThemedTextInput placeholder="Enter Your Full Name" value={fullName}
                onChangeText={setFullName} />
              <ThemedText style={styles.entryTitle}>Username *</ThemedText>
              <ThemedTextInput placeholder="Enter Your Username" value={username}
                onChangeText={setUser} />
              <ThemedText style={styles.entryTitle}>Email *</ThemedText>
              <ThemedTextInput placeholder="Enter Your Email" value={email}
                onChangeText={setEmail} />
              <ThemedText style={styles.entryTitle}>Phone Number</ThemedText>
              <ThemedTextInput placeholder="Phone" value={phoneNumber}
                onChangeText={setPhoneNumber} />
              <ThemedText style={styles.entryTitle}>Password *</ThemedText>
              <ThemedText style={styles.requirements}>Requirements</ThemedText>
              <ThemedText style={styles.requirements}>At least 8 characters long</ThemedText>
              <ThemedText style={styles.requirements}>Contains 1 uppercase letter (A-Z)</ThemedText>
              <ThemedText style={styles.requirements}>Contains 1 lowercase letter (a-z)</ThemedText>
              <ThemedText style={styles.requirements}>Contains 1 number (0-9)</ThemedText>
              <ThemedText style={styles.requirements}>Contains 1 special character (!@#$%^&*)</ThemedText>
              <ThemedTextInput placeholder="Enter Your Password" value={password}
                onChangeText={setPassword} secureTextEntry/> 
              <ThemedTextInput placeholder="Re-type Password" value={retypePassword}
                onChangeText={setRetypePassword} secureTextEntry/>
              <ThemedText style={styles.required}>*Required</ThemedText>
              
              {/* Submit Create Account or Cancel Buttons for Modal*/}
              <ThemedView style={styles.buttonContainer}>
                <ThemedButton onPress={handleCreateAccount} title="Submit" />
                <ThemedButton onPress={toggleCreateModal} title="Cancel" />
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </Modal> 

        {/* Message Modal */}
        <Modal visible={isMessageModalVisible} transparent animationType="fade" 
                onRequestClose={toggleMessageModal}>
          <ThemedView style={styles.modalOverlay}>
            <ThemedView style={styles.modalContainer}>
              <ThemedText type="request" style={styles.modalTitle}>{message}</ThemedText>
              <ThemedView style={styles.buttonContainer}>
                <ThemedButton onPress={toggleMessageModal} title="Ok" />
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </Modal> 
      </ThemedView>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    paddingLeft: 10, 
    paddingRight: 10,
  },
  buttonsContainer: { 
    marginTop: 400,
    marginBottom: 50,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 400,
    padding: 20,
    borderRadius: 10, 
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.8)',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  }, 
  entryTitle: {
    fontSize: 14, 
    marginBottom: 5,  
    textAlign: 'left',
  }, 
  requirements: {
    fontSize: 12,   
    marginBottom: 2, 
    textAlign: 'left',
    fontStyle: 'italic',
  }, 
  required: {
    fontSize: 12,  
    textAlign: 'left',
    fontStyle: 'italic',
    marginTop: 0,
  }, 
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',  
    marginTop: 20,  
  },
});