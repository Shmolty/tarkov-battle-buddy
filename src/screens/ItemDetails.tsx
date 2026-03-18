// --ITEM DETAILS-- 
// Library Imports
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Custom Components
import Title from 'src/components/Title';
import { Item } from 'src/types/item';

// TODO: FIX TYPE SAFETY (REPLACE 'any' WITH CORRECT TYPES)
// TODO: Wrap everything except title and button in scrollview
// TODO: Refine layout of item info 

export default function ItemDetails(
    {navigation, route} : any
) : React.JSX.Element {
    const item : Item = route.params;

    return (
        <SafeAreaView style={{flex: 1}} edges={['top', 'left', 'right', 'bottom']}>
            <View style={styles.rootScreen}>
                <Title>Item Details</Title>

                <Button title="Back to Search" onPress={() => navigation.popTo('ItemSearch')} />

                <ScrollView 
                contentContainerStyle={{
                    alignItems: 'center',
                    paddingBottom: 35,
                }}>
                <View style={styles.card}>

                    <Text style={styles.cardTitle}>{item.name}</Text>

                    

                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: item.image512pxLink }}
                            style={styles.image}
                        />
                    </View>

                    <View style={{alignSelf: 'center', marginVertical: 12}}>
                        <Text style={[styles.itemDetailText, {textAlign: 'center'}]}>Types: </Text>
                        {item.types.map((type) => {
                            return <Text key={type} style={[styles.itemDetailText, {textAlign: 'center'}]}>{type}</Text>
                        })}
                    </View>

                    <Text style={styles.itemDetailText}>Description: </Text>
                    <Text style={[styles.itemDetailText]}>{item.description}</Text>
                        
                        <View style={styles.priceInfo}>

                            <Text style={styles.itemDetailText}>Flea Market Price:</Text>
                            
                            <Text style={styles.itemDetailText}>24hr Avg: ₽{item.avg24hPrice}</Text>

                            <Text style={styles.itemDetailText}>24hr Low: ₽{item.low24hPrice}</Text>

                            <Text style={styles.itemDetailText}>24hr High: ₽{item.high24hPrice}</Text>

                        </View>
                </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
        alignItems: 'center',
    },
    
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
        color: 'white',
        fontSize: 24,
        fontFamily: 'bender-bold',
        borderBottomWidth: 1,
        borderBottomColor: 'white'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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
    priceInfo: {
        marginHorizontal: 10,
        marginVertical: 5,
        textAlign: 'left'
    },
    itemDetailText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'bender',
    },
});