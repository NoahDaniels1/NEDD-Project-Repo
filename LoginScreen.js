import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const backgroundImage = require('./assets/UNT-Seal-White.jpg');

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();


  const handleLogin = () => {
    //login logic here
    if (username === 'Daniel' && password === 'TEST') {
      // Login successful
      Alert.alert('Success', 'Login successful');
      navigation.navigate('Home'); //This will navigtate to home page
    } else {
      // Login failed
      Alert.alert('Error', 'Invalid username or password');
    }
  };

  const showPasswordButton = () => {
    setShowPassword (!showPassword);
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.usernameContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          </View>
          <View style={styles.buttonContainer}>
            <Button title={showPassword ? 'Hide Password' : "Show Password"}onPress={showPasswordButton} />
          </View>
          <Button title="Login" onPress={handleLogin} />
        </View>
      </ImageBackground>
    );
  };

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  usernameContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  passwordContainer: {
    marginBottom: 12,
  },
  buttonContainer: {
    marginBottom: 12,
  },
});

export default LoginScreen;
