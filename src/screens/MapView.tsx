import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';

import NavigationButton from 'src/components/NavigationButton';

const { width, height } = Dimensions.get('window');

export default function MapView({navigation, route} : any)
: React.JSX.Element {

    useEffect(() => {
        // Allow ALL orientations on this screen
        ScreenOrientation.unlockAsync();

        return () => {
            // Restore default (portrait) when leaving
            ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT
            );
        };
    }, []);


    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right', 'bottom']}>
            <View style={{flex: 1, alignItems: 'center'}}>
                <NavigationButton title="BACK TO MAP SELECT" onPress={() => navigation.popTo('MapSelect')}/>
                <View style={styles.mapContainer}>
                    <Image
                      source={require('../assets/images/groundzeroMap.png')}
                      style={styles.map}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    mapContainer: {
        width: width,
        height: 'auto',
    },
    map: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    }
});