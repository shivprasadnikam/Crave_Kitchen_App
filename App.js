// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <HomeScreen />
    </AuthProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FF6B35',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//     marginBottom: 16,
//   },
//   subtitle: {
//     fontSize: 18,
//     color: '#FFFFFF',
//     opacity: 0.9,
//   },
// }); 