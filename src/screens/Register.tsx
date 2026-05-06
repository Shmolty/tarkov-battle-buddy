import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingScreen from 'src/components/LoadingScreen';
import { AuthContext } from 'src/context/AuthContext';
import { createUser } from 'src/firebase/auth';

import { AppTheme } from 'src/theme/theme';

export default function Register({navigation} : any) : React.JSX.Element {
    // authentication context
    const authCtx = useContext(AuthContext);

    // state variables for entered text input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    // state boolean for authentication loading
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    // input handler to update state variables based on user input && input field
    function inputHandler(inputType: string, text: string) {
        switch (inputType) {
            case 'email':
                setEmail(text);
                break;
            case 'password':
                setPassword(text);
                break;
            case 'confirmedPassword':
                setConfirmedPassword(text);
                break;
            default:
                break;
        }
    }

    // form submission handler when register button clicked
    function submitHandler() {
        // validate email
        if (email.length <= 0 || !email.includes('@')) {
            Alert.alert('INVALID EMAIL', 'Please enter a valid email address.');
            return;
        }
        // validate password length
        else if (password.length < 6 ) {
            Alert.alert('INVALID PASSWORD', 'Password must contain a minimum of 6 characters.');
            return;
        }
        // validate password match
        else if (password !== confirmedPassword) {
            Alert.alert('INVALID PASSWORD', 'The passwords you entered to not match. Please double check your entries and try again.');
            return;
        }
        // all data valid, submit form
        else {
            registerUser();
        }

    }

    // function to register user with firebase auth
    async function registerUser() {
        setIsAuthenticating(true);
        try {
            // attempt to create user on firebase and retrieve token
            const token = await createUser(email, password);

            // check if token retreived --- NOTE: is this if check even necessary inside of try catch?
            if (token.length > 0) {
                // registration successful, authenticate user in context and grant access to app
                authCtx.authenticate(token);
                console.log('registration successful, token created ' + token);
            } else Alert.alert('Registration failed inside of if statement');

        } catch (error) {
            Alert.alert('REGISTRATION FAILED', 'An error occurred while registering. Please try again.');
        } finally {
            setIsAuthenticating(false);
        }
    }

    // LOADING SCREEN WHILE USER IS AUTHENTICATING
    if (isAuthenticating) {
        return (
            <LoadingScreen message="Creating Account..." />
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <View style={styles.screen}>
            <View style={styles.card}>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Register</Text>
                </View>
                

                <Text style={styles.header}>Email:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="example@domain.com"
                    placeholderTextColor="#3b3b3b"
                    keyboardType={'email-address'}
                    onChangeText={(text) => inputHandler('email', text)}
                />

                <Text style={styles.header}>Password:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="6 characters minimum"
                    placeholderTextColor="#3b3b3b"
                    secureTextEntry={true}
                    onChangeText={(text) => inputHandler('password', text)}
                />

                <Text style={styles.header}>Confirm Password:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="confirm password"
                    placeholderTextColor="#3b3b3b"
                    secureTextEntry={true}
                    onChangeText={(text) => inputHandler('confirmedPassword', text)}
                />

                <View style={styles.buttonContainer}>
                    <Button title="REGISTER" onPress={submitHandler} />
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