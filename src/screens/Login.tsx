// --LOGIN SCREEN--
// Basic email / password login screen to authenticate users and grant access to application

// !!TODO: --> CUSTOM BUTTON COMPONENT

// Library Imports
import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import { AppTheme } from 'src/theme/theme';
import LoadingScreen from 'src/components/LoadingScreen';

// context
import { AuthContext } from 'src/context/AuthContext';

// auth
import { login } from 'src/firebase/auth';
import PrimaryButton from 'src/components/PrimaryButton';

export default function Login({navigation} : any) : React.JSX.Element {
    // authentication context
    const authCtx = useContext(AuthContext);

    // state variables for entered text input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            default:
                break;
        }
    }

    // form submission handler when login button clicked
    function submitHandler() {
        // validate email
        if (email.length <= 0 || !email.includes('@')) {
            Alert.alert('INVALID EMAIL', 'Please enter a valid email address.');
            return;
        }
        // validate password length
        else if (password.length < 6) {
            Alert.alert('INVALID PASSWORD', 'Password must contain a minimum of 6 characters.');
            return;
        }
        // all data valid, submit form
        else {
            loginUser();
        }

    }

    // function to log user in based on input credentials
    async function loginUser() {
        setIsAuthenticating(true);
        try {
            const token = await login(email, password);
            authCtx.authenticate(token);
        } catch {
            Alert.alert('Login Failed', 'An error occurred while trying to log you in. Please check your credentials and try again.');
        } finally {
            setIsAuthenticating(false);
        }
        
    }

    // display loading screen while authenticating user
    if (isAuthenticating) {
        return <LoadingScreen message="Logging you in..." />;
    }

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <View style={styles.screen}>
            <View style={styles.card}>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>LOGIN</Text>
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

                <View style={styles.buttonContainer}>
                    <PrimaryButton title="LOGIN" onPress={submitHandler} />
                </View>

                <Text style={styles.prompt}>New to Tarkov Battle Buddy?</Text>

                <Text style={styles.link} onPress={() => navigation.navigate('Register')}>Click here to sign up!</Text>
                
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
        fontFamily: 'bender',
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
        color: 'rgba(0, 124, 43, 1)',
        alignSelf: 'center',
    }
});