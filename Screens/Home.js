//Imports
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

//Temp logout logic
const HomeScreen = ({ onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  //Home screen text and button design
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home Screen</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

//Style Sheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 30,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#00853E',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

//Exporting to be used in App.js file
export default HomeScreen;
