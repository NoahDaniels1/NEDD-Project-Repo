// Import necessary modules, hooks, and components from React, React Native, Firebase Firestore
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Text,
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { getDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { addUser } from './firebase';

//Defining the LoginScreen component
const LoginScreen = ({ onLogin }) => {
  //Using useState hook to manage local state for input fields and modals
  const [username, setUsername] = useState(''); //For username input
  const [password, setPassword] = useState(''); //For password input
  const [isPasswordVisible, setPasswordVisible] = useState(false); //To toggle password visibility
  const [isCreateAccountVisible, setCreateAccountVisible] = useState(false); //To manage visibility of Create Account Modal
  const [isForgotPasswordVisible, setForgotPasswordVisible] = useState(false); //To manage visibility of Forgot Password Modal
  const [newUsername, setNewUsername] = useState(''); //For new username input in Create Account Modal
  const [newPassword, setNewPassword] = useState(''); //For new password input in Create Account Modal
  const [email, setEmail] = useState(''); //For email input in Create Account and Forgot Password Modal
  
  //Function to handle login button press, authenticating the user
  const handleLogin = async () => {
    try {
      const docRef = doc(db, 'users', username);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        if (userData.password === password) {
          Alert.alert('Success', 'Login successful', [], { cancelable: true });
          setTimeout(() => {
            onLogin();
          }, 1500); //Delay before switching to the home screen
          return;
        }
      }
      Alert.alert('Error', 'Invalid username or password');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  //Function to show the Create Account Modal
  const handleCreateAccount = () => {
    setCreateAccountVisible(true);
  };

  //Function to show the Forgot Password Modal
  const handleForgotPassword = () => {
    setForgotPasswordVisible(true);
  };

  //Function to handle submit button press in Create Account Modal
  const handleCreateAccountSubmit = () => {
    if (newUsername && newPassword && email) {
      addUser(newUsername, newPassword, email);
      Alert.alert('Success', 'Account created successfully');
      setCreateAccountVisible(false);
    } else {
      Alert.alert('Error', 'Please enter valid credentials');
    }
  };

  //Function to handle submit button press in Forgot Password Modal
  const handleForgotPasswordSubmit = () => {
    if (email) {
      Alert.alert('Success', 'Password reset email sent');
      setForgotPasswordVisible(false);
    } else {
      Alert.alert('Error', 'Please enter your email');
    }
  };

  //Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    //Login screen design, Header/Textboxes/Buttons...etc
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.header}>NEDD Med</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.passwordButton} onPress={togglePasswordVisibility}>
          <Text style={styles.buttonText}>
            {isPasswordVisible ? 'Hide Password' : 'Show Password'}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.linkButton}>Forgot Username/Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCreateAccount}>
        <Text style={styles.linkButton}>Create Account</Text>
      </TouchableOpacity>
      
      {/* Create Account Popup */}
      <Modal visible={isCreateAccountVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Account</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={newUsername}
              onChangeText={setNewUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity style={styles.button} onPress={handleCreateAccountSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setCreateAccountVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Forgot Password Popup */}
      <Modal visible={isForgotPasswordVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Recovery Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity style={styles.button} onPress={handleForgotPasswordSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setForgotPasswordVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

//Style Sheet
const styles = StyleSheet.create({
  //Defining the container style
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  //Defining header style
  header: {
    fontSize: 80,
    position: 'absolute',
    top: 125,
    alignSelf: 'center',
    color: '#00853E',
  },

  //Defining input style
  input: {
    width: '50%',
    height: 40,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },

  //Defining login button style
  loginButton: {
    backgroundColor: '#00853E',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  //Defining Button text style
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },

  //Defining link button style
  linkButton: {
    fontSize: 25,
    color: '#00853E',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  //Defining modal container style
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  //Defining modal content style
  modalContent: {
    backgroundColor: '#FFFFFF',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  //Defining title style on modal popups
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00853E',
  },

  //Defining password container style
  passwordContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },

  //Defining password button style
  passwordButton: {
    backgroundColor: '#00853E',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  //Defining modal button style
  button: {
    backgroundColor: '#00853E',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
});

//Exporting to be used in App.js file
export default LoginScreen;
