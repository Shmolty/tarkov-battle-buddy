import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppTheme } from '../theme/theme';
import HomeScreen from '../screens/HomeScreen';
import User from '../screens/User';
import ItemSearch from 'src/screens/ItemSearch';

const Tabs = createBottomTabNavigator();

export function AppNavigation() {
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
            name="ItemSearch"
            component={ItemSearch}
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
