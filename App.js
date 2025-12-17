import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

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
            <View style={styles.rootContainer}>
              
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
  backgroundImage: {
    opacity: 0.15,
  },
});
