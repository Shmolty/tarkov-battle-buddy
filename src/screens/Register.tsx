import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppTheme } from 'src/theme/theme';

export default function Register({navigation} : any) : React.JSX.Element {
    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <View style={styles.screen}>
            <View style={styles.card}>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Register</Text>
                </View>
                

                <Text style={styles.header}>Email:</Text>
                <TextInput style={styles.input} placeholder="example@domain.com" placeholderTextColor="#3b3b3b" />

                <Text style={styles.header}>Password:</Text>
                <TextInput style={styles.input} placeholder="6 characters minimum" placeholderTextColor="#3b3b3b" />

                <View style={styles.buttonContainer}>
                    <Button title="REGISTER" onPress={() => console.log('registered')} />
                </View>

                <Text style={styles.prompt}>Already have an account?</Text>

                <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Click here to log in</Text>
                                
            </View>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '80%',
        height: 'auto',
        backgroundColor: AppTheme.colors.card,
        borderRadius: 15,
        padding: 20,
    },
    titleContainer: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 24,
        fontFamily: 'bender-bold',
        color: AppTheme.colors.text,
        padding: 5,
        marginBottom: 5,
        alignSelf: 'center',
    },
    header: {
        fontSize: 18,
        fontFamily: 'bender',
        color: AppTheme.colors.text,
        marginTop: 15,
    },
    input: {
        width: 'auto',
        height: 35,
        color: 'black',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 5,
        marginVertical: 5,
        borderWidth: 2,
        borderColor: 'black',
    },
    buttonContainer: {
        marginTop: 20,
        width: '60%',
        alignSelf: 'center',
    },
    prompt: {
        fontSize: 16,
        fontFamily: 'bender',
        color: AppTheme.colors.text,
        marginTop: 20,
        alignSelf: 'center',
    },
    link: {
        fontSize: 16,
        fontFamily: 'bender-bold',
        color: '#00aeff',
        alignSelf: 'center',
    }
});