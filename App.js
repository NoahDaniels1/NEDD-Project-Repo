//Imports
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Switch,
  Button,
  ImageBackground,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


//Setting up the icons
const NavigationIcons = () => {
  const [currentPage, setCurrentPage] = useState('Home');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  //Setting whatever page is currently active to highlighted UNT green
  const handleIconPress = (page) => {
    setCurrentPage(page);
    if (page === 'calendar') {
      setSelectedDate('');
      setSelectedTime('');
    }
  };

  //Setting up the login page to only login if both the username and password fields are not blank
  const handleLogin = () => {
    if (username !== '' && password !== '') {
      setIsLoggedIn(true);
    }
  };

  //show password button
  const showPasswordButton = () => {
      setShowPassword (!showPassword);
  };

  //Sets default page after login to the Home page
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  // Show and hide date picker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
    hideDatePicker();
  };

  // Show and hide time picker
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    setSelectedTime(time.toLocaleTimeString());
    hideTimePicker();
  };

  //Setting up the Login Page with username and password and showpassword button
  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>NEDD MED</Text>
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
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
           <TouchableOpacity
          style={[styles.loginButton, styles.showPasswordButton]}
          onPress={showPasswordButton}
          >
          <Text style={styles.loginButtonText}>
            {showPassword ? 'Hide Password' : 'Show Password'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

  //Styling the Pages
  return (
    <View style={styles.container}>
      {currentPage !== 'userProfile' && currentPage !== 'calendar' && (
        <Text style={styles.pageTitle}>{currentPage}</Text>
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
      {currentPage === 'calendar' && (
        <View style={styles.calendarContainer}>
          <Text style={styles.pageTitle}>Calendar</Text>
          <TouchableOpacity style={styles.datePickerButton} onPress={showDatePicker}>
            <Text style={styles.datePickerButtonText}>
              {selectedDate ? selectedDate : 'Select Date'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.timePickerButton} onPress={showTimePicker}>
            <Text style={styles.timePickerButtonText}>
              {selectedTime ? selectedTime : 'Select Time'}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={hideTimePicker}
          />
          <Calendar />
        </View>
      )}
      <View style={styles.navigation}>
        <TouchableOpacity
          style={
            currentPage === 'calendar'
              ? styles.activeNavigationIcon
              : styles.navigationIcon
          }
          onPress={() => handleIconPress('calendar')}>
          <FontAwesome
            name="calendar"
            size={24}
            color={currentPage === 'calendar' ? '#00853E' : '#000'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={
            currentPage === 'home'
              ? styles.activeNavigationIcon
              : styles.navigationIcon
          }
          onPress={() => handleIconPress('home')}>
          <FontAwesome
            name="home"
            size={24}
            color={currentPage === 'home' ? '#00853E' : '#000'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={
            currentPage === 'notifications'
              ? styles.activeNavigationIcon
              : styles.navigationIcon
          }
          onPress={() => handleIconPress('notifications')}>
          <FontAwesome
            name="bell"
            size={24}
            color={currentPage === 'notifications' ? '#00853E' : '#000'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={
            currentPage === 'userProfile'
              ? styles.activeNavigationIcon
              : styles.navigationIcon
          }
          onPress={() => handleIconPress('userProfile')}>
          <FontAwesome
            name="user"
            size={24}
            color={currentPage === 'userProfile' ? '#00853E' : '#000'}
          />
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
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 100,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100, //Adjusted login container at a higher location
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'black', 
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 20,
  },
  loginButton: {
    backgroundColor: '#00853E',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  showPasswordButton: {
    backgroundColor: '#00853E',
    marginTop: 5,
    marginBottom: 5,
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
  calendarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendar: {
    marginBottom: 20,
  },
  datePickerButton: {
    backgroundColor: '#00853E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  datePickerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timePickerButton: {
    backgroundColor: '#00853E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  timePickerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NavigationIcons;