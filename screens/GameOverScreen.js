import React from 'react'
import { Text, View, StyleSheet, Button, Image } from 'react-native'
import Colors from '../constants/colors';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>The game is over!</Text>
            <Image source={require('../assets/success.png')} style={styles.image} />
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
    },
    image: {
        width: '80%',
        height: 300
    }
})

export default GameOverScreen;