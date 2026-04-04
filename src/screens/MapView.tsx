// MapView screen - displays the map image with zoom and pan functionality
// screen orientation is unlocked so the user can switch to landscape

// !!!TODO --> The button is hard to press and must be pressed on the top half. I think this is caused by the image zoom component. Try to fix this and make the button more responsive.
// !!!TODO --> Add functionality to display the correct map based on the map selected on the previous screen. Currently it is hardcoded to display the ground zero map.

// Library Imports
import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';
import ImageZoom from 'react-native-image-pan-zoom';

// Custom Components
import NavigationButton from 'src/components/NavigationButton';

// get device dimensions for zoom calculations
const window = Dimensions.get('window');
const width = window.width;
const height = window.height;
// set your initial map size (drop-in initial dimensions)
const initialMapWidth = width * 0.95;
const initialMapHeight = initialMapWidth * (1300 / 900); // adjust aspect ratio for the map

export default function MapView(
    { navigation }: any
): React.JSX.Element {
    
  useEffect(() => {
    ScreenOrientation.unlockAsync();
    return () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    };
  }, []);

  return (
    <SafeAreaView style={styles.full} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.full}>
        
        <NavigationButton
          title="BACK TO MAP SELECT"
          onPress={() => navigation.popTo('MapSelect')}
        />

        <View style={styles.interactiveContainer}>
          <ImageZoom
            {...({
              cropWidth: width,
              cropHeight: height - 120, // leave space for button/safe area
              imageWidth: initialMapWidth,
              imageHeight: initialMapHeight,
              minScale: 1,
              maxScale: 4,
              enableCenterFocus: false,
              useNativeDriver: true,
            } as any)}
          >
            <Image
              source={require('../assets/images/groundzeroMap.png')}
              style={{ width: initialMapWidth, height: initialMapHeight }}
              resizeMode="contain"
            />
          </ImageZoom>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  full: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#181818'
  },
  interactiveContainer: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});