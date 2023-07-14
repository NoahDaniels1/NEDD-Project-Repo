//Imports
import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert, Modal } from 'react-native';
import { Avatar } from 'react-native-elements';

//Creating the SettingsScreen component for export
const SettingsScreen = ({ username, onLogout }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedColor, setSelectedColor] = useState('red');
  const [modalVisible, setModalVisible] = useState(false);
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'black'];

  //Function to handle the logout feature
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => onLogout() },
      ],
      { cancelable: false }
    );
  };

  //Designing the Settings screen 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Avatar
            rounded
            size="xlarge"
            overlayContainerStyle={{ backgroundColor: selectedColor }}
            containerStyle={styles.avatar}
          />
          <TouchableOpacity style={styles.avatarButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.avatarButtonText}>Change Avatar</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.username}>{username}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {colors.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.avatarOption, { backgroundColor: color }]}
                onPress={() => setSelectedColor(color)}
              />
            ))}
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

//StyleSheet for the Settings screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
  avatar: {
    width: 100,
    height: 100,
  },
  avatarButton: {
    marginTop: 10,
  },
  avatarButtonText: {
    color: '#00853E',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginRight: 8,
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#00853E',
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  buttonText: {
    color: 'blue',
  },
  confirmButtonText: {
    color: 'white',
  },
  logoutButtonText: {
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  avatarOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
  },
});

//exporting the component for use
export default SettingsScreen;
