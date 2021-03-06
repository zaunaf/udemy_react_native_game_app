import React, { useState, useRef, useEffect } from 'react'
import { Text, View, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native'
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons';
import { white } from 'ansi-colors';


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

    // Initial Guess, refreshed each time state changed
    const initalGuess = generateRandomBetween(1, 100, props.userChoice);
    
    // State management untuk currentGuess yang mengubah UI
    const [currentGuess, setcurrentGuess] = useState(initalGuess);
    
    // Record past guesses
    const [pastGuesses, setPastGuesses] = useState([initalGuess])

    // Game rounds, determining game over. Not needed anymore
    // const [rounds, setRounds] = useState(0);

    // State management untuk memantau high. Initialnya height yg sekarang
    const [height, setHeight] = useState(Dimensions.get('window').height);

    useEffect(() => {

        // The effect to be monitored
        const updateLayout = () => {
            setHeight(Dimensions.get('window').height);
        }
        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });


    // State management untuk memantau low dan high terbaru
    // Agar tidak mengakibatkan UI refresh, kita gunakan useRef
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    // Breaking down the props to vars
    // so we don't have to use props.userChoice etc
    const { userChoice , onGameOver } = props;

    // After the render,
    // Do the function (in the 1st argument) ...
    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, 
        // ... If any of the following list of vars (in the 2nd argument) changes on re-render
        [currentGuess, userChoice, onGameOver]
    );

    // Dipanggil oleh tombol setiap kita menjawab clue
    // Diberi parameter agar bisa di-reuse untuk kedua tombol
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
            currentHigh.current = currentGuess - 1; // Add this to avoid same upper number twice
        } else {
            currentLow.current = currentGuess + 1;  // Add this to avoid same lower number twice         
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        
        setcurrentGuess(nextNumber);

        // Not needed anymore since now we track all guesses each round
        // setRounds(curRounds => curRounds + 1);
        
        // Memasukkan nextNumber ke atas list currentPassGuess
        // Kenapa nextNumber? Karena currentGuess belum update statenya
        // dengan sendirinya kita harus membuat initalGuess di awal agar kerekam juga
        setPastGuesses(currentPassGuess => [nextNumber, ...currentPassGuess] )
    };

    const renderListItem = (value, numOfRound) => (
        <View key={value} style={styles.listItem}>
            <Text>#{numOfRound}</Text>
            <Text>{value}</Text>
        </View>
    );

    // Responsive if the height is small change layout
    if (height < 500) {
        return (
            <ScrollView>
                <View style={styles.screen}>
                    <Text>Opponent's Guess</Text>                    
                    <Card style={styles.buttonContainer}>
                        <MainButton title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} >
                            <Ionicons name="md-remove" size={24} color='white' />
                        </MainButton>
                        <NumberContainer>{currentGuess}</NumberContainer>
                        <MainButton title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')} >
                            <Ionicons name="md-add" size={24} color='white' />
                        </MainButton>
                    </Card>
                    <Card style={styles.list}>
                        <ScrollView>
                            {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                        </ScrollView>
                    </Card>
                </View>
            </ScrollView>
        )
    } else {
        return (
            <ScrollView>
                <View style={styles.screen}>
                    <Text>Opponent's Guess</Text>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <Card style={styles.buttonContainer}>
                        <MainButton title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} >
                            <Ionicons name="md-remove" size={24} color='white' />
                        </MainButton>
                        <MainButton title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')} >
                            <Ionicons name="md-add" size={24} color='white' />
                        </MainButton>
                    </Card>
                    <Card style={styles.list}>
                        <ScrollView>
                            {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                        </ScrollView>
                    </Card>
                </View>
            </ScrollView>
        ) 
    }
    
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
        // marginTop: 20,
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        alignItems: 'center',
        width: 300,
        maxWidth: "80%"        
    },
    list: {
        flex: 1,            // Mandatory in android to have the nested scrollview works as needed
        width: 300,
        maxWidth: "80%",
        marginVertical: 20
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})

export default GameScreen;