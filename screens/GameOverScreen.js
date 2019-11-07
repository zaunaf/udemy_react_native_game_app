import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import Colors from '../constants/colors';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>The game is over!</Text>
            <Text>User chosen number: {props.userNumber}</Text>
            <Text>Number of rounds: {props.numOfRounds}</Text>            
            <View style={styles.button}>
                <Button title="New Game" onPress={props.onRestart} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        color: Colors.accent
    },
    button: {
        marginTop: 10
    }
})

export default GameOverScreen;