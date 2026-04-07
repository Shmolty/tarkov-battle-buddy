// MapView screen - displays the map image with zoom and pan functionality
// screen orientation is unlocked so the user can switch to landscape

// !!!TODO --> Improve landscape zoom functionality. The zoom is based on the initial dimensions of the map going off of the device dimensions in portrait mode. This causes an awkward zoom when the device is rotated to landscape. Dimensions should be re-calculated on orientation change, and the button should be moved or removed in landscape to make room. Possibly remove the Navbar as well in landscape.

// Library Imports
import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, Image, useWindowDimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';
import ImageZoom from 'react-native-image-pan-zoom';

// Custom Components
import NavigationButton from 'src/components/NavigationButton';

export default function MapView(
  { navigation, route }: any
): React.JSX.Element {

  // get map name from route params
  const { mapName } = route.params || {};
  // state to determine the map image to use based on the mapName
  const [mapSource, setMapSource] = useState();
  // current screen dimensions, updates automatically on orientation change
  const { width, height } = useWindowDimensions();

  const imageWidth = useMemo(() => width * 0.95, [width]);
  const imageHeight = useMemo(() => imageWidth * (1300 / 900), [imageWidth]);
  const cropHeight = Math.max(height - 200, 200);

  // useEffect to update the map image source based on the mapName passed from MapSelect
  useEffect(() => {
    switch (mapName) {
      case 'GroundZero':
        setMapSource(require('../assets/images/groundzeroMap.png'));
        break;
      case 'Factory':
        setMapSource(require('../assets/images/factoryMap.jpg'));
        break;
      case 'Woods':
        setMapSource(require('../assets/images/woodsMap.webp'));
        break;
      case 'Customs':
        setMapSource(require('../assets/images/customsMap.png'));
        break;
      case 'Shoreline':
        setMapSource(require('../assets/images/shorelineMap.webp'));
        break;
      case 'Labyrinth':
        setMapSource(require('../assets/images/labyrinthMap.png'));
        break;
      case 'Interchange':
        setMapSource(require('../assets/images/interchangeMap.jpg'));
        break;
      case 'Reserve':
        setMapSource(require('../assets/images/reserveMap.webp'));
        break;
      case 'Lighthouse':
        setMapSource(require('../assets/images/lighthouseMap.png'));
        break;
      case 'Streets':
        setMapSource(require('../assets/images/streetsMap.png'));
        break;
      case 'TheLab':
        setMapSource(require('../assets/images/thelabMap.webp'));
        break;
      default:
        Alert.alert('Error', 'Map not found. Returning to map selection.');
        navigation.popTo('MapSelect');
        break;
    }
  }, [mapName]);

  // unlock screen orientation for this screen only, lock on exit of this screen
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

        <View style={[styles.interactiveContainer, { width }]}> 
          <ImageZoom
            {...({
              cropWidth: width,
              cropHeight,
              imageWidth,
              imageHeight,
              minScale: 1,
              maxScale: 4,
              enableCenterFocus: false,
              useNativeDriver: true,
            } as any)}
          >
            <Image
              source={mapSource}
              style={{ width: imageWidth, height: imageHeight }}
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
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});