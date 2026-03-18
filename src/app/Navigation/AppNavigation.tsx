// ---APP NAVIGATION---
// This is the primary/outermost  Bottom Tabs Navigation logic for the app. All other navigators are to be nested inside of this one.

// Library Imports
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Custom Components
import { AppTheme } from '../../theme/theme';
import HomeScreen from '../../screens/HomeScreen';
import User from '../../screens/User';
import ItemStack from './ItemStack';

// Create BottomTab Navigator
const Tabs = createBottomTabNavigator();

export function AppNavigation() : React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={AppTheme}>
        <Tabs.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: { borderTopWidth: 0, elevation: 0 },
            tabBarLabelStyle: { fontFamily: 'bender-bold' },
          }}
        >
          <Tabs.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
            }}
          />
          <Tabs.Screen
            name="ItemSearchStack"
            component={ItemStack}
            options={{
              title: 'Item Search',
              tabBarIcon: ({ color, size }) => <Ionicons name="search-circle" color={color} size={size} />,
            }}
          />
          <Tabs.Screen
            name="User"
            component={User}
            options={{
              tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
            }}
          />
        </Tabs.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
