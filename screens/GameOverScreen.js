import React from 'react'
import { Text, View, StyleSheet, Button, Image } from 'react-native'
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>The game is over!</Text>
            <Image source={require('../assets/success.png')} style={styles.image} />
            <Text>The app needed <Text style={styles.highlight}>{props.numOfRounds}</Text> rounds to guess your number <Text style={styles.highlight}>{props.userNumber}</Text></Text>
            <View style={styles.button}>
                <MainButton onPress={props.onRestart}>New Game</MainButton>
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
        height: 300,
        borderRadius: 20
    },
    highlight: {
        color: Colors.accent
    }
})

export default GameOverScreen;