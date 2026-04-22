// ---AMMO CHARTS SCREEN---
// Screen for displaying a scatter plot for each caliber of ammo. Data shown is the damage (x) and armor penetration (y) values for each type.
// OPTIONAL - Could also add recoil modifier and other data separate from the x and y values (perhaps listed under the chart) when a certain ammo is selected.

// Library Imports
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client/react';

// Custom Components
import Title from 'src/components/Title';
import CaliberSelector from 'src/components/CaliberSelector';
import AmmoScatterChart from 'src/components/AmmoScatterChart';
import { SEARCH_ALL_AMMO } from '../graphql/ammo';
import { SearchAmmoData, Ammo, ScatterDataPoint } from 'src/types/ammo';

const groupAmmoByCaliber = (ammo: Ammo[]): Record<string, ScatterDataPoint[]> => {
  return ammo.reduce((grouped, ammoItem) => {
    const caliber = ammoItem.caliber;
    if (!grouped[caliber]) {
      grouped[caliber] = [];
    }
    grouped[caliber].push({
      x: ammoItem.damage,
      y: ammoItem.penetrationPower,
      label: ammoItem.item.name,
      recoilModifier: ammoItem.recoilModifier,
    });
    return grouped;
  }, {} as Record<string, ScatterDataPoint[]>);
};

export default function AmmoCharts()
: React.JSX.Element {

    const [selectedCaliber, setSelectedCaliber] = useState<string>('');

    const { loading, error, data } =
    useQuery<
        SearchAmmoData
    >(SEARCH_ALL_AMMO, {
        fetchPolicy: "cache-and-network",
        notifyOnNetworkStatusChange: true,
    });

    const ammo = data?.ammo;

    useEffect(() => {
        if (ammo && ammo.length > 0) {
            const groupedAmmo = groupAmmoByCaliber(ammo);
            const calibers = Object.keys(groupedAmmo);
            if (calibers.length > 0 && !selectedCaliber) {
                setSelectedCaliber(calibers[0]);
            }
        }
    }, [ammo, selectedCaliber]);

    const groupedAmmo = ammo ? groupAmmoByCaliber(ammo) : {};
    const calibers = Object.keys(groupedAmmo);

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right', 'bottom']}>
            <View style={styles.screen}>
                <Title>Ammo Charts</Title>

                {loading && (!ammo || ammo.length === 0) ? (
                    <Text style={styles.status}>Loading ...</Text>
                ) : error ? (
                    <Text style={styles.error}>Error: {error.message}</Text>
                ) : calibers.length === 0 ? (
                    <Text style={styles.status}>No ammo data available</Text>
                ) : (
                    <View style={styles.chartContainer}>
                        <CaliberSelector
                            calibers={calibers}
                            selectedCaliber={selectedCaliber}
                            onSelect={setSelectedCaliber}
                        />
                        {selectedCaliber && groupedAmmo[selectedCaliber] && (
                            <AmmoScatterChart
                                data={groupedAmmo[selectedCaliber]}
                                caliber={selectedCaliber}
                            />
                        )}
                    </View>
                )}

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    chartContainer: {
        flex: 1,
        width: '100%',
    },
    status: {
        fontFamily: 'bender-bold',
        fontSize: 18,
        marginTop: 12,
        color: 'white'
    },
    error: {
        fontFamily: 'bender-bold',
        fontSize: 18,
        marginTop: 12,
        color: "red",
    },
});