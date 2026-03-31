// --MAP TILE COMPONENT--
// This component is a tile for a map that users will select. It is used on the MapSelect screen

// Library Imports
import React from 'react';
import { Pressable, Text, ImageBackground, StyleSheet, ImageSourcePropType } from 'react-native';

// Props Interface
interface MapTileProps {
    mapName: string;
    imageSource: ImageSourcePropType;
    onPress: () => void;
}

export default function MapTile(
    { mapName, imageSource, onPress } : MapTileProps
) : React.JSX.Element {
    return (
        <Pressable
         style={({pressed}) => [styles.pressable, pressed && styles.pressed]}
         onPress={onPress}
        >

            <ImageBackground 
              style={styles.image} 
              source={imageSource}
            >

                <Text style={styles.text}>{mapName}</Text>

            </ImageBackground>

        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressable: {
        width: 175,
        height: 150,
        margin: 10,
        borderColor: 'black',
        borderWidth: 5,
    },
    pressed: {
        opacity: 0.75
    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'bender-bold',
        color: 'white',
        fontSize: 24,
        textShadowColor: 'black',
        textShadowRadius: 20
    }
});