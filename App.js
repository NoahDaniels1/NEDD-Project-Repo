//Imports
import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './Screens/HomeScreen';
import CalendarScreen from './Screens/CalendarScreen';
import SettingsScreen from './Screens/SettingsScreen';
import LoginScreen from './Screens/LoginScreen';


const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00853E',
    accent: '#00853E',
  },
};

//importing the assets for the home screen icon
const HomeIcon = ({ focused }) => {
  const iconSource = focused
    ? require('./assets/homeScreenColor.png')
    : require('./assets/homeScreen.png');
  return <Image source={iconSource} />;
};

//importing the assets for the calendar screen icon
const AppointmentsIcon = ({ focused }) => {
  const iconSource = focused
    ? require('./assets/calendarScreenColor.png')
    : require('./assets/calendarScreen.png');
  return <Image source={iconSource} />;
};

//importing the assets for the settings screen icon
const SettingsIcon = ({ focused }) => {
  const iconSource = focused
    ? require('./assets/settingsScreenColor.png')
    : require('./assets/settingsScreen.png');
  return <Image source={iconSource} />;
};

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [username, setUsername] = useState('');

  const handleScreenChange = (screen, username) => {
    setCurrentScreen(screen);
    setUsername(username);
  };

  const handleLogout = () => {
    setCurrentScreen('login');
  };

  //Settings for the bottomtab navigator
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <View style={styles.container}>
          {currentScreen === 'login' ? (
            <LoginScreen onLogin={(username) => handleScreenChange('home', username)} />
          ) : (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size, focused }) => {
                  if (route.name === 'Home') {
                    return <HomeIcon focused={focused} />;
                  } else if (route.name === 'Appointments') {
                    return <AppointmentsIcon focused={focused} />;
                  } else if (route.name === 'Settings') {
                    return <SettingsIcon focused={focused} />;
                  }
                },
              })}
            >
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Appointments" component={CalendarScreen} />
              <Tab.Screen
                name="Settings"
                options={{ tabBarLabel: 'Settings' }}
              >
                {() => <SettingsScreen username={username} onLogout={handleLogout} />}
              </Tab.Screen>
            </Tab.Navigator>
          )}
        </View>
      </NavigationContainer>
    </PaperProvider>
  );
};

//Style sheet for App.js
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
