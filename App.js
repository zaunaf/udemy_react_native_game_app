import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';

export default function App() {
  return (
    <View style={styles.screen}>
      <Header title="Tebak Angka" />
      <StartGameScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
