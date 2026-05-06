// --AUTHENTICATION STACK--
// Stack Navigator for Login & Register screens

// Library Imports
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screen Imports
import Login from "src/screens/Login";
import Register from "src/screens/Register";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';

// use same theme? theme={AppTheme} inside navigationcontainer

// create stack navigator
const Stack = createNativeStackNavigator();

export default function AuthenticationStack() : React.JSX.Element {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        contentStyle: { backgroundColor: 'rgb(14, 14, 14)' },
                    }}
                >
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider >
    );
}