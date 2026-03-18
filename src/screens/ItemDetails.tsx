// --ITEM DETAILS SCREEN-- 
// This screen component functions as an expanded details page for an individual item selected from the ItemSearch screen.

// !!!TODO: FIX TYPE SAFETY (REPLACE 'any' WITH CORRECT TYPES)

// Library Imports
import React from 'react';
import { View, StyleSheet, ScrollView, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Custom Components
import Title from 'src/components/Title';
import ItemCard from 'src/components/ItemCard';
import NavigationButton from 'src/components/NavigationButton';



export default function ItemDetails(
    {navigation, route} : any
) : React.JSX.Element {

    return (
        <SafeAreaView style={{flex: 1}} edges={['top', 'left', 'right', 'bottom']}>
            <View style={styles.rootScreen}>
                
                    <NavigationButton title="BACK TO ITEM SEARCH" onPress={() => navigation.popTo('ItemSearch')} />
                

                <ScrollView 
                contentContainerStyle={{
                    alignItems: 'center',
                    paddingBottom: 35,
                }}>

                <ItemCard item={route.params} />

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