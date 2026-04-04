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
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right', 'bottom']}>
        <View style={styles.screen}>

            <Title>Map Selection</Title>

            <ScrollView 
              contentContainerStyle={styles.mapList}
              alwaysBounceVertical={false}
            >

                <View style={styles.mapsContainer}>

                    <MapTile
                      mapName="GROUND ZERO"
                      imageSource={require('../assets/images/groundzeroImage.webp')}
                      onPress={() => mapSelectHandler('GroundZero')}
                    />

                    <MapTile 
                      mapName="FACTORY" 
                      imageSource={require('../assets/images/factoryImage.webp')} 
                      onPress={() => mapSelectHandler('Factory')} 
                    />

                    <MapTile
                      mapName="WOODS"
                      imageSource={require('../assets/images/woodsImage.webp')}
                      onPress={() => mapSelectHandler('Woods')}
                    />

                    <MapTile
                      mapName="CUSTOMS"
                      imageSource={require('../assets/images/customsImage.webp')}
                      onPress={() => mapSelectHandler('Customs')}
                    />

                    <MapTile
                      mapName="SHORELINE"
                      imageSource={require('../assets/images/shorelineImage.jpg')}
                      onPress={() => mapSelectHandler('Shoreline')}
                    />

                    <MapTile
                      mapName="LABYRINTH"
                      imageSource={require('../assets/images/thelabyrinthImage.webp')}
                      onPress={() => mapSelectHandler('Labyrinth')}
                    />

                    <MapTile
                      mapName="INTERCHANGE"
                      imageSource={require('../assets/images/interchangeImage.webp')}
                      onPress={() => mapSelectHandler('Interchange')}
                    />

                    <MapTile
                      mapName="RESERVE"
                      imageSource={require('../assets/images/reserveImage.webp')}
                      onPress={() => mapSelectHandler('Reserve')}
                    />

                    <MapTile
                      mapName="LIGHTHOUSE"
                      imageSource={require('../assets/images/lighthouseImage.jpg')}
                      onPress={() => mapSelectHandler('Lighthouse')}
                    />

                    <MapTile
                      mapName="STREETS"
                      imageSource={require('../assets/images/streetsImage.jpg')}
                      onPress={() => mapSelectHandler('Streets')}
                    />

                    <MapTile
                      mapName="THE LAB"
                      imageSource={require('../assets/images/thelabImage.webp')}
                      onPress={() => mapSelectHandler('TheLab')}
                    />

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
        paddingBottom: 20
    },
    mapsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
});