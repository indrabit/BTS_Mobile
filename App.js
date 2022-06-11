// import LogInScreen from './src/screens/authentication/LogInScreen';
// import { StatusBar } from 'expo-status-bar';
import AuthNavigator from './src/navigation/AuthNavigator';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
      <AuthNavigator />
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   {/* <StatusBar style="auto" /> */}
    // </View>
  );
}

