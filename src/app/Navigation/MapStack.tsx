// --MAP STACK--
// Stack Navigator for MapSelect --> MapView

// Library Imports
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


// Screen Imports
import MapSelect from "src/screens/MapSelect";

// create stack navigator
const Stack = createNativeStackNavigator();

export default function MapStack() : React.JSX.Element {
    return (
        <Stack.Navigator 
            screenOptions={{
            headerShown: false,
          }}
        >
            <Stack.Screen name="MapSelect" component={MapSelect} />
        </Stack.Navigator>
    );
}