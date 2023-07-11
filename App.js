//Imports
import React, { useState } from 'react';
import { View } from 'react-native';
import LoginScreen from './Screens/Login';
import HomeScreen from './Screens/Home';

//Defining App module
const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <HomeScreen onLogout={handleLogout} />
      )}
    </View>
  );
};

//Exporting App module
export default App;
