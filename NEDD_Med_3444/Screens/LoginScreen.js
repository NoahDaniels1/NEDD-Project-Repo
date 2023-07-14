//Imports
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Modal, Text, Alert, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { getDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { addUser } from './firebase';

//creating the LoginScreen component for exporting
const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isCreateAccountVisible, setCreateAccountVisible] = useState(false);
  const [isForgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');

  //function to handle the login feature
  const handleLogin = async () => {
    try {
      const docRef = doc(db, 'users', username);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        if (userData.password === password) {
          Alert.alert('Success', 'Login successful', [
            { text: 'OK', onPress: () => onLogin(username) },
          ]);
          return;
        }
      }
      Alert.alert('Error', 'Invalid username or password');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  
  //function for the create account button
  const handleCreateAccount = () => {
    setCreateAccountVisible(true);
  };

  //function for the forgot username/password button
  const handleForgotPassword = () => {
    setForgotPasswordVisible(true);
  };

  //function to handle the reat account feature
  const handleCreateAccountSubmit = () => {
    if (newUsername && newPassword && email) {
      addUser(newUsername, newPassword, email);
      Alert.alert('Success', 'Account created successfully');
      setCreateAccountVisible(false);
    } else {
      Alert.alert('Error', 'Please enter valid credentials');
    }
  };

  //function to handlke the fgorgot username/password feature
  const handleForgotPasswordSubmit = () => {
    if (email) {
      Alert.alert('Success', 'Password reset email sent');
      setForgotPasswordVisible(false);
    } else {
      Alert.alert('Error', 'Please enter your email');
    }
  };

  //function to toggle tthe password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  //Designing the login screen
  return (
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

//SttyleSheet for tthe Login screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 80,
    position: 'absolute',
    top: 125,
    alignSelf: 'center',
    color: '#00853E',
  },
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
  loginButton: {
    backgroundColor: '#00853E',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  linkButton: {
    fontSize: 25,
    color: '#00853E',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
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
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00853E',
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  passwordButton: {
    backgroundColor: '#00853E',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#00853E',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
});

//exporting the LoginScreen component for use
export default LoginScreen;
