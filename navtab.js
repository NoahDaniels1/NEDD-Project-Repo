import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Screen names
const homeName = "Home";
const calendarName = "Calendar";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === calendarName) {
              iconName = focused ? 'list' : 'calendar-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#228c22',
          inactiveTintColor: '#007958',
          labelStyle: { paddingBottom: 1, fontSize: 15 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={homeName}/>
        <Tab.Screen name={calendarName}/>
        <Tab.Screen name={settingsName} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
