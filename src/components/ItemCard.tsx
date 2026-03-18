// ---ITEM CARD COMPONENT---

// Library Imports
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Custom Components
import { AppTheme } from 'src/theme/theme';

// Types
import { Item } from 'src/types/item';
interface ItemCardProps {
    item: Item;
}

export default function ItemCard(
    { item }: ItemCardProps
): React.JSX.Element {

    return (
        <View style={styles.card}>

            <Text style={styles.cardTitle}>{item.name}</Text>

            <View style={{ alignSelf: 'flex-start', marginVertical: 6 }}>
                {item.types.map((type) => {
                    return <Text key={type} style={styles.itemTypesText}>{type}</Text>
                })}
            </View>

            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: item.image512pxLink }}
                    style={styles.image}
                />
            </View>

            

            <Text style={styles.headerText}>Flea Pricing (24hrs):</Text>

            <View style={styles.priceInfo}>

                

                <Text style={styles.priceText}>AVERAGE: ₽{item.avg24hPrice}</Text>

                <Text style={styles.priceText}>LOWEST:  ₽{item.low24hPrice}</Text>

                <Text style={styles.priceText}>HIGHEST: ₽{item.high24hPrice}</Text>

            </View>

            <Text style={styles.headerText}>Description: </Text>
            <Text style={[styles.descriptionText]}>{item.description}</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        marginVertical: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        borderRadius: 15,
        width: '90%',
        height: 'auto',
        padding: 20,
    },
    cardTitle: {
        color: AppTheme.colors.text,
        fontSize: 24,
        fontFamily: 'bender-bold',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        paddingBottom: 4,
    },

    itemTypesText: {
        fontSize: 18,
        fontFamily: 'bender-bold',
        textAlign: 'left',
        color: AppTheme.colors.text,
        marginBottom: 4
    },

    imageContainer: {
        width: 206,
        height: 206,
        backgroundColor: 'transparent',
        marginVertical: 12,
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },

    headerText: {
        fontSize: 20,
        fontFamily: 'bender-bold',
        color: AppTheme.colors.text,
        borderBottomColor: AppTheme.colors.border,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 6,
    },
    
    priceInfo: {
        marginBottom: 10,
        textAlign: 'left'
    },
    priceText: {
        fontSize: 18,
        fontFamily: 'bender',
        color: AppTheme.colors.text,
        marginVertical: 4,
    },

    descriptionText: {
        color: AppTheme.colors.text,
        fontSize: 18,
        fontFamily: 'bender',
    },
});