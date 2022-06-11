import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import HomeScreen from '../screens/enrolments/HomeScreen';
import SettingScreen from '../screens/enrolments/SettingScreen';
import MoreScreen from '../screens/enrolments/MoreScreen';

import PersonScreen from '../screens/person/PersonScreen';
import FamilyScreen from '../screens/person/FamilyScreen';
import colors from '../config/colors';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// Create the Navigator
const Tab = createBottomTabNavigator();
const Stack=createNativeStackNavigator();

const MyStack=()=>{
    return (
    <Stack.Navigator
    screenOptions={screenOptionStyle}
    >
    
      <Stack.Screen name='Home' component={HomeScreen} options={{ title:"Home"}}/>     
      <Stack.Screen name='Person' component={PersonScreen} options={{ title:"Profile"}} /> 
      <Stack.Screen name='Family' component={FamilyScreen} options={{ title:"Family Profile"}} />          
     </Stack.Navigator>);
   }
  
   const screenOptionStyle = {
    headerStyle: {
      backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
  };

const TabNavigation = () => {
  return (
    <Tab.Navigator
    initialRouteName="HomeTab"
    screenOptions={{
        tabBarActiveBackgroundColor: colors.primary,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveBackgroundColor: colors.white,
        tabBarInactiveTintColor: colors.dark,
        headerShown: false,
    }}>
    <Tab.Screen
        name="HomeTab"
        component={MyStack}
        options={{
            tabBarLabel: "Home",
            tabBarIcon: ({size, color}) => (
                <FontAwesome name="calendar" size={size} color={color}/>
            ),
        }}
    />
    <Tab.Screen
        name="SettingTab"
        component={SettingScreen}
        options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({size, color}) => (
                <FontAwesome name="globe" size={size} color={color}/>
            ),
        }}
    />

    
    <Tab.Screen
        name="MoreTab"
        component={MoreScreen}
        options={{
            tabBarLabel: "More",
            tabBarIcon: ({size, color}) => (
                <FontAwesome name="th-large" size={size} color={color}/>
            ),
        }}
    />
 </Tab.Navigator>
    
  );
}

export default TabNavigation;