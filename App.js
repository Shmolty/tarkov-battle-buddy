// React / R Native and Expo Imports
import { StyleSheet, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

// Screen Imports
import HomeScreen from './screens/HomeScreen';
import User from './screens/User';



// Create Navigation Container
const Tabs = createBottomTabNavigator();

// Create Default Theme for Colors and Background
const Theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(0, 124, 43)',
    background: 'transparent',
    card: 'rgba(32, 32, 32, 1)',
    text: 'white',
    border: 'white',
  }
}

export default function App() {
  
  useFonts({
    'bender': require('./assets/fonts/Bender.otf'),
    'bender-bold': require('./assets/fonts/Bender-Bold.otf')
  });

  return (
    <>
    <StatusBar style="light" />
      <ImageBackground source={require('./assets/images/background.jpg')} style={styles.bgImage} >
      <LinearGradient style={styles.gradient} colors={['rgba(32, 32, 32, 0.75)', 'rgba(0, 65, 23, 0.75)']}>
      
      <NavigationContainer theme={Theme}>
          <Tabs.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: {
              borderTopWidth: 0,
              elevation: 0,
            },
            tabBarLabelStyle: {
              fontFamily: 'bender-bold'
            },
        }}>

          <Tabs.Screen name="Home" component={HomeScreen}
            options={{
              tabBarIcon: ({color, size}) => <Ionicons name="home" color={color} size={size} />
            }}
          />

          <Tabs.Screen name="User" component={User}
            options={{
              tabBarIcon: ({color, size}) => <Ionicons name="person" color={color} size={size} />
            }}
          />

        </Tabs.Navigator>
      </NavigationContainer>
      </LinearGradient>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
