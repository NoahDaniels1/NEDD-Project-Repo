//Imports
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//Creating the HomeScreen component for export
const HomeScreen = ({ isFocused }) => {
  return (
    <View style={styles.container}>
      {isFocused && <Text>Welcome to the home screen</Text>}
      <Text>Home Screen Content</Text>
    </View>
  );
};

//StyleSHeet for Home screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//exporting the HomeScreen for use
export default HomeScreen;
