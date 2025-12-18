// REACT NATIVE AND EXPO IMPORTS
import { useState } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

// CUSTOM COMPONENT IMPORTS
import Title from './components/Title';
import HomeScreen from './screens/HomeScreen';
import NavBar from './components/nav/NavBar';

export default function App() {
  const [title, setTitle] = useState('TARKOV BATTLE BUDDY');
  const [screen, setScreen] = useState(<HomeScreen />);

  function changeScreen (newScreen) {
    switch (newScreen) {
      // the case statements are directly tied to icon names passed from NavBar
      case 'home':
        console.log('screen changed to home');
        setTitle('TARKOV BATTLE BUDDY');
        setScreen(<HomeScreen />);
        break;

      case 'map-marked-alt':
        console.log('screen changed to map');
        setTitle ('MAP SCREEN');
        setScreen(<View><Title>Map stuff go here</Title></View>);
        break;

      case 'database':
        console.log('screen changed to item data');
        setTitle('Item Lookup');
        setScreen(<View><Title>Item lookup stuff go here</Title></View>);
        break;

      case 'account':
        console.log('screen changed to account');
        setTitle('Account');
        setScreen(<View><Title>Account info here</Title></View>);
        break;
    }
  }


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

              <View style={styles.title}>
                <Title>{title}</Title>
              </View>
              
              {screen}

              <NavBar onNavButtonPress={changeScreen} />

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
  contentContainer: {
    flex: 1,
  },
  title: {
    alignItems: 'center',
  },
});
