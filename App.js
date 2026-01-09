// React / R Native and Expo Imports
import { StyleSheet, View, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
// import { LinearGradient } from 'expo-linear-gradient';
// ----TODO: IMPORT LINEAR GRADIENT AND IMPROVE BACKGROUND----
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
      <ImageBackground source={require('./assets/images/background.jpg')} style={styles.bgImage} >
      <NavigationContainer theme={Theme}>
        <Tabs.Navigator>

          <Tabs.Screen name="Home" component={HomeScreen}
            options={{
              tabBarIcon: ({color, size}) => <Ionicons name="home" color={color} size={size} />
            }}
          />

        </Tabs.Navigator>
      </NavigationContainer>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
