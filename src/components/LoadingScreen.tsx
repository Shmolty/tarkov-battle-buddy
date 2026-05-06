// --LOADING SCREEN COMPONENT--
// This component is a basic loading screen to overlay over other screens during app loading states.
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppTheme } from 'src/theme/theme';

export default function LoadingScreen({message} : {message: string}) 
: React.JSX.Element {
    return (
        <View style={styles.screen}>
            <Text style={styles.message}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppTheme.colors.card,
    },
    message: {
        fontSize: 32,
        fontFamily: 'bender-bold',
        color: AppTheme.colors.text,
    },
});