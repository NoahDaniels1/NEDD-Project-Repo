//Imports
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Switch } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

//Setting up the icons
const NavigationIcons = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

//Setting whatever page is currently active to highlighted UNT green
  const handleIconPress = (page) => {
    setCurrentPage(page);
  };

//Setting up the login page to only login if both the username and password fields are not blank
  const handleLogin = () => {
    if (username !== '' && password !== '') {
      setIsLoggedIn(true);
    }
  };

//Sets default page after login to the Home page
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
  };
//Setting up the Login Page with username and password
  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Login</Text>
        <View style={styles.loginContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

//Styling the Pages
  return (
    <View style={styles.container}>
      {currentPage !== 'userProfile' && (
        <Text style={styles.pageTitle}>{currentPage === 'calendar' ? 'Appointments' : currentPage}</Text>
      )}
      {currentPage === 'userProfile' && (
        <View style={styles.userProfileContainer}>
          <Text style={styles.usernameText}>{username}</Text>
          <View style={styles.notificationContainer}>
            <Text style={styles.notificationText}>Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={(value) => setNotificationsEnabled(value)}
            />
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.navigation}>
        <TouchableOpacity
          style={currentPage === 'calendar' ? styles.activeNavigationIcon : styles.navigationIcon}
          onPress={() => handleIconPress('calendar')}
        >
          <FontAwesome name="calendar" size={24} color={currentPage === 'calendar' ? '#00853E' : '#000'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={currentPage === 'home' ? styles.activeNavigationIcon : styles.navigationIcon}
          onPress={() => handleIconPress('home')}
        >
          <FontAwesome name="home" size={24} color={currentPage === 'home' ? '#00853E' : '#000'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={currentPage === 'notifications' ? styles.activeNavigationIcon : styles.navigationIcon}
          onPress={() => handleIconPress('notifications')}
        >
          <FontAwesome name="bell" size={24} color={currentPage === 'notifications' ? '#00853E' : '#000'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={currentPage === 'userProfile' ? styles.activeNavigationIcon : styles.navigationIcon}
          onPress={() => handleIconPress('userProfile')}
        >
          <FontAwesome name="user" size={24} color={currentPage === 'userProfile' ? '#00853E' : '#000'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

//Creating StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navigationIcon: {
    alignItems: 'center',
    padding: 10,
  },
  activeNavigationIcon: {
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#00853E',
    padding: 10,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#00853E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userProfileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  usernameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 16,
    marginRight: 10,
  },
  logoutButton: {
    backgroundColor: '#00853E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NavigationIcons;
