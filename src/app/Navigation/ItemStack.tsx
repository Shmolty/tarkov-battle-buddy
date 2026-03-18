// --ITEMSTACK--
// Stack Navigator for Item Search --> Item Details
// Library Imports
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screen Imports
import ItemSearch from "src/screens/ItemSearch";
import ItemDetails from "src/screens/ItemDetails";

const Stack = createNativeStackNavigator();

export default function ItemStack() : React.JSX.Element {
    return (
        <Stack.Navigator 
            screenOptions={{
            headerShown: false,
          }}
        >
            <Stack.Screen name="ItemSearch" component={ItemSearch} />
            <Stack.Screen name="ItemDetails" component={ItemDetails} />
        </Stack.Navigator>
    );
}