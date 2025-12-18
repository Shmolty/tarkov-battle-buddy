// REACT NATIVE AND EXPO IMPORTS
import { StyleSheet, View, ImageBackground, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

// CUSTOM COMPONENT IMPORTS
import Title from './components/Title';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <>
    <StatusBar style="light" />
      <View style={styles.rootContainer}>

        <LinearGradient
          colors={['black', '#06180cff']}
          style={styles.rootContainer}
        >

          <ImageBackground
            source={require('./assets/images/background.jpg')}
            resizeMode="cover"
            style={styles.rootContainer}
            imageStyle={styles.backgroundImage}
          >

            <View style={styles.contentContainer}>

              <Title />

              <HomeScreen />
              
              <Text style={styles.navText}>At the bottom of every screen will be a navigation pane</Text>
            
            </View>

          </ImageBackground>
        </LinearGradient>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  screen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },

  // temp
    navText: {
        justifyContent: 'flex-end',
        marginBottom: 65,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
});
