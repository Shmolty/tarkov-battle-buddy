import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

interface PrimaryButtonProps {
    title: string;
    onPress: () => void;
}

export default function PrimaryButton({title, onPress} : PrimaryButtonProps)
: React.JSX.Element {
    return (
        <Pressable 
            style={({pressed}) => [styles.pressable, pressed && styles.pressed]}
            onPress={onPress}
        >
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressable: {
        backgroundColor: 'rgba(0, 124, 43, 0.75)',
        padding: 10,
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