import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card  = props => {
    return (
        // This syntax is so that we can merge style from inner default and external from the enclosing view
        <View style={{...styles.card, ...props.style}}>{props.children}</View>  
    );
};

const styles = StyleSheet.create({
    card: {
        // Comment here because other implementation probably different
        // width: 300,
        // maxWidth: '80%',
        // alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        // Only for IOS
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        // Only for Android
        elevation: 5,
    }
});

export default Card;
