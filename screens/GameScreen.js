import React, { useState } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
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

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER"/>
                <Button title="GREATER"/>
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