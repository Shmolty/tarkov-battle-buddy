// --MAP SELECT SCREEN--
// Screen for selecting a map to view
// This screen component is the root of the map stack

// !!!TODO: --> Add all maps and create functionality to navigate to mapView passing the map name for selection of correct map.
// Create map view screen (placeholder for now which displays map name as text)

// Library Imports
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Custom Components
import Title from 'src/components/Title';
import MapTile from 'src/components/MapTile';

export default function MapSelect()
: React.JSX.Element {
    function mapSelectHandler(mapName : string) {
        console.log(mapName);
    }


    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <View style={styles.screen}>

            <Title>Map Selection</Title>

            <ScrollView contentContainerStyle={styles.mapList}>

                <View style={styles.mapsContainer}>

                    <MapTile 
                      mapName="FACTORY" 
                      imageSource={require('../assets/images/factoryImage.webp')} 
                      onPress={() => mapSelectHandler('Factory')} 
                    />

                    <View style={styles.tile}></View>
                    <View style={styles.tile}></View>

                </View>

            </ScrollView>

        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    mapList: {
        marginTop: 20,
    },
    mapsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },

    // delete when done
    tile: {
        margin: 10,
        width: 175,
        height: 150,
        backgroundColor: 'black',
    },
});