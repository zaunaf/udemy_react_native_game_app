import React from 'react'
import { Text, View, StyleSheet, Button, Image, Dimensions } from 'react-native'
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>The game is over!</Text>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/success.png')} style={styles.image} />
            </View>
            <View style={styles.resultContainer}>
                <Text style={styles.resultText}>The app needed <Text style={styles.highlight}>{props.numOfRounds}</Text> rounds to guess your number <Text style={styles.highlight}>{props.userNumber}</Text></Text>
                <MainButton style={styles.button} onPress={props.onRestart}>New Game</MainButton>
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
        marginTop: 10,
        textAlign: 'center'
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 1,
        borderColor: 'grey',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 40
    },
    image: {
        width: '100%',
        height: '100%'        
    },
    resultContainer: {
        justifyContent: 'center',
        marginHorizontal: 30      
    },
    resultText: {
        textAlign: 'center'
    },
    highlight: {
        color: Colors.accent
    }
})

export default GameOverScreen;