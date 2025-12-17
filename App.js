// REACT NATIVE AND EXPO IMPORTS
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

// CUSTOM COMPONENT IMPORTS
import Title from './components/Title';

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
  backgroundImage: {
    opacity: 0.15,
  },
});
