// ---NAVIGATION BUTTON COMPONENT---
// This is a pressable component designed for areas where navigation is needed.

// Library imports
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

// props types
interface NavButtonProps {
    title: string;
    onPress: () => void;
}

export default function NavigationButton({title, onPress} : NavButtonProps) : React.JSX.Element {
    return (
        <Pressable style={({pressed}) => [styles.pressable, pressed && styles.pressed]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressable: {
        backgroundColor: 'rgba(0, 124, 43, 0.75)',
        padding: 12,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,

    },
    pressed: {
        opacity: 0.75,
    },
    text: {
        fontSize: 18,
        fontFamily: 'bender-bold',
        color: 'white',
        textAlign: 'center'
    },
});