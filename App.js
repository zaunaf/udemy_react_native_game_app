import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {
  
  // User choiced number
  const [userNumber, setUserNumber ] = useState();
  
  // Number of rounds it takes to finish. Set this when the game is over
  // Starting state is 0, game hasn't started
  // If the state changes to anything above 0 (depends on how many rounds it took for the game to finish), it's game over
  const [guessRounds, setGuessRounds] = useState(0);

  // Loading
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  if (!assetsLoaded) {
    return (
      <AppLoading
          startAsync={fetchFonts} 
          onFinish={() => setAssetsLoaded(true)} 
          onError={()=> console.log(err)}
      />
    );
  }


  // To enable game reset
  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);

    // Reset number of guessRounds on start
    setGuessRounds(0);
  }

  // Handler yg menyediakan akses pada state guessRonds
  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };
  
  // Forward the startGameHandler so the StartGameScreen can send the selected Number
  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    // Passing gameOverHandler, terima number of roundsnya
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
  } else if (guessRounds > 0) {
    
    // The game over screen, passes the game's choosen number, number of rounds 
    // and handler for restarting the game
    content = <GameOverScreen userNumber={userNumber} numOfRounds={guessRounds} onRestart={configureNewGameHandler} />
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
