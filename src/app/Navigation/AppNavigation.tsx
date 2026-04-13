// ---APP NAVIGATION---
// This is the primary/outermost  Bottom Tabs Navigation logic for the app. All other navigators are to be nested inside of this one.

// Library Imports
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons} from '@expo/vector-icons/';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useWindowDimensions, ViewStyle } from 'react-native';

// Custom Components
import { AppTheme } from '../../theme/theme';
import HomeScreen from '../../screens/HomeScreen';
import User from '../../screens/User';
import ItemStack from './ItemStack';
import MapStack from './MapStack';
import AmmoCharts from 'src/screens/AmmoCharts';

// Create BottomTab Navigator
const Tabs = createBottomTabNavigator();

export function AppNavigation() : React.JSX.Element {
  // calculate the screen dimensions to determine device orientation
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const [tabBarStyle, setTabBarStyle] = useState<ViewStyle>({ borderTopWidth: 0, elevation: 0 });

  // when the device switches to landscape, hide the navbar to give more screen space. this is currently only used in the mapVew screen though it would apply globally if other screens have orientation unlocked.
  useEffect(() => {
    setTabBarStyle(isLandscape ? { display: 'none' } : { borderTopWidth: 0, elevation: 0 });
  }, [isLandscape]);

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={AppTheme}>
        <Tabs.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle,
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
            name="MapStack"
            component={MapStack}
            options={{
              title: 'Maps',
              tabBarIcon: ({ color, size }) => <Ionicons name="map" color={color} size={size} />,
            }}
          />
          <Tabs.Screen 
            name="AmmoCharts"
            component={AmmoCharts}
            options={{
              title: 'Ammo Charts',
              tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="ammunition" color={color} size={size} />,
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
