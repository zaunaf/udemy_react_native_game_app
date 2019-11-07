import React, { useState, useRef, useEffect } from 'react'
import { Text, View, StyleSheet, Button, Alert } from 'react-native'
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min) + min);
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude) ;
    } else {
        return rndNum;
    }
};

const  GameScreen = props => {

    const [currentGuess, setcurrentGuess] = useState(
        generateRandomBetween(1, 100, props.userChoice)
    );
    
    // Game rounds, determining game over
    const [rounds, setRounds] = useState(0);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    // Breaking down the props to vars
    // so we don't have to use props.userChoice etc
    const { userChoice , onGameOver } = props;

    // After the render,
    // Do the function (in the 1st argument) ...
    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(rounds);
        }
    }, 
        // ... If any of the following list of vars (in the 2nd argument) changes on re-render
        [currentGuess, userChoice, onGameOver]
    );

    const nextGuessHandler = direction => {
        if (
            (direction === 'lower' && currentGuess < props.userChoice) || 
            (direction === 'greater' && currentGuess > props.userChoice)
        ) 
        {
            Alert.alert(
                "Don't lie",
                "You know that this is wrong dude..",
                [{ text: 'Sorry', style: 'Cancel'}]                
            );
            return;
        }
        
        if (direction === 'lower') {
            currentHigh.current = currentGuess;            
        } else {
            currentLow.current = currentGuess;            
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        
        setcurrentGuess(nextNumber);
        setRounds(curRounds => curRounds + 1);
    };

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
                <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')}/>
            </Card>
        </View>
    )
    
};

const styles = StyleSheet.create({
    padding: 20,
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: "space-around",
        marginTop: 20,
        width: 300,
        maxWidth: "80%"
    }
})

export default GameScreen;