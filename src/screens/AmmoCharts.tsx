// ---AMMO CHARTS SCREEN---
// Screen for displaying a scatter plot for each caliber of ammo. Data shown is the damage (x) and armor penetration (y) values for each type. 
// OPTIONAL - Could also add recoil modifier and other data separate from the x and y values (perhaps listed under the chart) when a certain ammo is selected.

// TODO!! --> First I need to get the ammo data from tarkov.dev API. Then I use that data to create charts for each caliber of ammunition. Also need to create a selector for users to choose which caliber of ammo they want to view. The chart library I am going with is react-native-gifted-charts, 'https://www.npmjs.com/package/react-native-gifted-charts'.

// Library Imports
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLazyQuery } from '@apollo/client/react';

// Custom Components
import Title from 'src/components/Title';

// graphql
import { SEARCH_AMMO_BY_CALIBER } from 'src/graphql/ammo';

// types
import { SearchAmmoData, SearchAmmoVars } from '../types/ammo';

export default function AmmoCharts()
: React.JSX.Element {

    // QUERY FOR AMMO
    useEffect(() => {
        // on page load, query for first caliber of ammo
        
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right', 'bottom']}>
        <View style={styles.screen}>
            <Title>Ammo Charts</Title>
            <View style={styles.chartContainer}>
                <Text style={{fontSize: 24, color: 'white'}}>Scatter plot will go here</Text>
            </View>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    chartContainer: {
        flex: 1,
        margin: 20,
        justifyContent: 'center',
    }
});