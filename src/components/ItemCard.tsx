import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type ItemCardProps = {
    imageUri: string;
    name: string;
    types: string[];
    price: number;
}

export default function ItemCard(
    {imageUri, name, types, price}: ItemCardProps
): React.JSX.Element {
    return (
        <View style={styles.cardContainer}>

            <View style={styles.card}>

                <Image
                    source={{ uri: imageUri }}
                    style={styles.image}
                />
                <View style={styles.column}>

                    <Text style={styles.name}>{name}</Text>



                    <View style={styles.row}>

                        <View style={styles.column}>
                            {types.map((type) => {
                                return <Text key={type} style={styles.types}>{type}</Text>
                            })}
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.price}>₽ {price}</Text>
                        </View>


                    </View>


                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        marginBottom: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        borderRadius: 10,
        marginHorizontal: 10,
    },
    card: {
        flexDirection: 'row',
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        height: 60,
        width: 60,
        marginRight: 12,
    },
    column: {
        flexDirection: 'column',
    },
    name: {
        fontFamily: 'bender-bold',
        fontSize: 16,
        color: 'white',
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
    }
});