// React / R Native and Expo Imports
import { StyleSheet, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screen Imports
import HomeScreen from './screens/HomeScreen';



// Create Navigation Container
const Tabs = createBottomTabNavigator();

// Create Default Theme for Colors and Background
const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  }
}

export default function App() {

  return (
    <>
    <StatusBar style="light" />
      <LinearGradient style={styles.gradient} colors={['#181818', '#003b05']}>
      <ImageBackground source={require('./assets/images/background.jpg')} style={styles.bgImage} >
      <NavigationContainer theme={Theme}>
        <Tabs.Navigator screenOptions={{
          sceneContainerStyle: { backgroundColor: 'transparent' },
          tabBarStyle: {
            backgroundColor: '#363636',
            borderTopWidth: 0,
            elevation: 0,
          }
        }}>

          <Tabs.Screen name="Home" component={HomeScreen}
            options={{
              tabBarIcon: ({color, size}) => <Ionicons name="home" color={color} size={size} />
            }}
          />

        </Tabs.Navigator>
      </NavigationContainer>
      </ImageBackground>
      </LinearGradient>
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
