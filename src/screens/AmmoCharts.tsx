// ---AMMO CHARTS SCREEN---
// Screen for displaying a scatter plot for each caliber of ammo. Data shown is the damage (x) and armor penetration (y) values for each type. 
// OPTIONAL - Could also add recoil modifier and other data separate from the x and y values (perhaps listed under the chart) when a certain ammo is selected.

// Library Imports
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Custom Components
import Title from 'src/components/Title';

export default function AmmoCharts()
: React.JSX.Element {
    return (
        <View style={styles.screen}>
            <Title>Ammo Charts</Title>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
});