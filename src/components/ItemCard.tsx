import React from "react";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";

type ItemCardProps = {
    imageUri: string;
    name: string;
    types: string[];
    price: number;
}

export default function ItemCard(
    { imageUri, name, types, price }: ItemCardProps
): React.JSX.Element {

    function onPress() {} // send to item details

    return (
        <Pressable 
          onPress={onPress} 
          style={({ pressed }) => 
            [styles.pressable, pressed && styles.pressed]}
        >

            <Text style={styles.name}>{name}</Text>

            <View style={styles.row}>

                <Image
                    source={{ uri: imageUri }}
                    style={styles.image}
                />

                <View>
                    {types.map((type) => {
                        return <Text key={type} style={styles.types}>{type}</Text>
                    })}
                </View>

                {!!price ? <Text style={styles.price}>Avg Price: ₽{price}</Text> : <Text style={styles.noPrice}>Not on flea</Text>}
                
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressable: {
        marginBottom: 15,
        padding: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        borderRadius: 16,
        marginHorizontal: 20
    },
    pressed: {
        opacity: 0.75,
    },
    row: {
        flexDirection: 'row',
    },
    name: {
        fontFamily: 'bender-bold',
        fontSize: 16,
        color: 'white',
        marginBottom: 4,
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    image: {
        height: 60,
        width: 60,
        marginRight: 12,
    },
    types: {
        fontFamily: 'bender',
        color: 'white',
        opacity: 0.9,
    },
    price: {
        fontFamily: 'bender',
        fontSize: 16,
        color: 'white',
        marginLeft: 'auto',
    },
    noPrice: {
        fontFamily: 'bender',
        fontSize: 16,
        color: 'red',
        marginLeft: 'auto',
    }
});