// ---AMMO CHARTS SCREEN---
// Screen for displaying scatter plots for each caliber of ammo. Data shown is the damage (x) and armor penetration (y) values.
// Uses a custom scatter plot implementation without external chart libraries.

import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client/react';

// Custom Components
import Title from 'src/components/Title';

// graphql
import { SEARCH_ALL_AMMO } from 'src/graphql/ammo';

// types
import { SearchAmmoData, Ammo } from '../types/ammo';

const CHART_WIDTH = Dimensions.get('window').width - 100;
const CHART_HEIGHT = 300;
const PADDING = 40;

export default function AmmoCharts()
: React.JSX.Element {
    const [selectedCaliber, setSelectedCaliber] = useState<string | null>(null);

    // query for all ammo data
    const { data, loading, error } = useQuery<SearchAmmoData>(SEARCH_ALL_AMMO, {
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
    });

    // break ammo down into categories by caliber
    const ammoByCaliber = useMemo(() => {
        if (!data?.ammo) return {};
        return data.ammo.reduce<Record<string, Ammo[]>>((acc, ammoItem) => {
            const caliber = ammoItem.caliber || 'Unknown';
            if (!acc[caliber]) acc[caliber] = [];
            acc[caliber].push(ammoItem);
            return acc;
        }, {});
    }, [data]);

    // set default caliber to first available if not selected
    const calibers = useMemo(() => Object.keys(ammoByCaliber).sort(), [ammoByCaliber]);
    const activeCalibber = selectedCaliber || calibers[0];

    // prepare scatter plot data for selected caliber
    const scatterData = useMemo(() => {
        if (!activeCalibber || !ammoByCaliber[activeCalibber]) {
            return [];
        }

        return ammoByCaliber[activeCalibber].map(ammo => ({
            x: ammo.damage,
            y: ammo.penetrationPower,
            label: ammo.item.name,
        }));
    }, [activeCalibber, ammoByCaliber]);

    // Calculate scale and positions for data points
    const chartData = useMemo(() => {
        if (scatterData.length === 0) return null;

        const damages = scatterData.map(d => d.x);
        const penetrations = scatterData.map(d => d.y);

        const minDamage = Math.min(...damages);
        const maxDamage = Math.max(...damages);
        const minPenetration = Math.min(...penetrations);
        const maxPenetration = Math.max(...penetrations);

        // Add 10% padding to ranges
        const damageRange = maxDamage - minDamage || 1;
        const penetrationRange = maxPenetration - minPenetration || 1;

        const xMin = minDamage - damageRange * 0.1;
        const xMax = maxDamage + damageRange * 0.1;
        const yMin = minPenetration - penetrationRange * 0.1;
        const yMax = maxPenetration + penetrationRange * 0.1;

        // Scale functions
        const scaleX = (value: number) => {
            return PADDING + ((value - xMin) / (xMax - xMin)) * (CHART_WIDTH - PADDING);
        };

        const scaleY = (value: number) => {
            return CHART_HEIGHT - PADDING - ((value - yMin) / (yMax - yMin)) * (CHART_HEIGHT - PADDING);
        };

        const points = scatterData.map(d => ({
            x: scaleX(d.x),
            y: scaleY(d.y),
            label: d.label,
            dataX: d.x,
            dataY: d.y,
        }));

        return {
            points,
            xMin,
            xMax,
            yMin,
            yMax,
            scaleX,
            scaleY,
        };
    }, [scatterData]);

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right', 'bottom']}>
                <View style={styles.screen}>
                    <Title>Ammo Charts</Title>
                    <Text style={{ fontSize: 18, color: 'white' }}>Loading ammo data...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right', 'bottom']}>
                <View style={styles.screen}>
                    <Title>Ammo Charts</Title>
                    <Text style={{ fontSize: 18, color: 'white' }}>Error loading ammo: {error.message}</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right', 'bottom']}>
            <View style={styles.screen}>
                <Title>Ammo Charts</Title>

                {/* Caliber Selector */}
                {calibers.length > 0 && (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectorContainer}>
                        {calibers.map(caliber => (
                            <TouchableOpacity
                                key={caliber}
                                onPress={() => setSelectedCaliber(caliber)}
                                style={[
                                    styles.caliberButton,
                                    activeCalibber === caliber && styles.caliberButtonActive,
                                ]}
                            >
                                <Text style={[
                                    styles.caliberButtonText,
                                    activeCalibber === caliber && styles.caliberButtonTextActive,
                                ]}>
                                    {caliber}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}

                {/* Custom Scatter Chart */}
                {chartData && chartData.points.length > 0 && (
                    <View style={styles.chartContainer}>
                        <View style={[styles.chart, { width: CHART_WIDTH + 20, height: CHART_HEIGHT + 20 }]}>
                            {/* Y-axis label */}
                            <Text style={styles.yAxisLabel}>Penetration Power</Text>

                            {/* Chart area */}
                            <View style={styles.chartArea}>
                                {/* Grid lines - horizontal */}
                                {[0, 0.25, 0.5, 0.75, 1].map((i) => (
                                    <View
                                        key={`h-${i}`}
                                        style={[
                                            styles.gridLine,
                                            {
                                                top: PADDING + i * (CHART_HEIGHT - PADDING),
                                                width: CHART_WIDTH,
                                            },
                                        ]}
                                    />
                                ))}

                                {/* Grid lines - vertical */}
                                {[0, 0.25, 0.5, 0.75, 1].map((i) => (
                                    <View
                                        key={`v-${i}`}
                                        style={[
                                            styles.gridLine,
                                            {
                                                left: PADDING + i * (CHART_WIDTH - PADDING),
                                                height: CHART_HEIGHT,
                                            },
                                        ]}
                                    />
                                ))}

                                {/* Axes */}
                                <View style={[styles.axis, { left: PADDING, height: CHART_HEIGHT }]} />
                                <View style={[styles.axis, { top: CHART_HEIGHT - PADDING, width: CHART_WIDTH }]} />

                                {/* Data points */}
                                {chartData.points.map((point, idx) => (
                                    <View
                                        key={idx}
                                        style={[
                                            styles.dataPoint,
                                            {
                                                left: point.x - 5,
                                                top: point.y - 5,
                                            },
                                        ]}
                                    />
                                ))}
                            </View>

                            {/* X-axis label */}
                            <Text style={styles.xAxisLabel}>Damage</Text>
                        </View>
                    </View>
                )}

                {/* Item Names Legend */}
                {chartData && chartData.points.length > 0 && (
                    <ScrollView style={styles.legendContainer}>
                        <Text style={styles.legendTitle}>Items in {activeCalibber}:</Text>
                        {chartData.points.map((point, index) => (
                            <Text key={index} style={styles.legendItem}>
                                • {point.label} (DMG: {point.dataX}, PEN: {point.dataY})
                            </Text>
                        ))}
                    </ScrollView>
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
    selectorContainer: {
        maxHeight: 50,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    caliberButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginRight: 8,
        borderRadius: 20,
        backgroundColor: '#333',
        borderWidth: 1,
        borderColor: '#555',
    },
    caliberButtonActive: {
        backgroundColor: '#64c8ff',
        borderColor: '#64c8ff',
    },
    caliberButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
    },
    caliberButtonTextActive: {
        color: '#000',
    },
    chartContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    chart: {
        backgroundColor: '#1a1a1a',
        borderRadius: 8,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartArea: {
        width: CHART_WIDTH,
        height: CHART_HEIGHT,
        position: 'relative',
        backgroundColor: '#0a0a0a',
        marginVertical: 10,
    },
    gridLine: {
        position: 'absolute',
        backgroundColor: '#333',
        opacity: 0.5,
    },
    axis: {
        position: 'absolute',
        backgroundColor: '#888',
    },
    dataPoint: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#64c8ff',
        borderWidth: 1,
        borderColor: '#ffffff',
    },
    xAxisLabel: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
        marginTop: 8,
    },
    yAxisLabel: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
        position: 'absolute',
        left: -35,
        top: CHART_HEIGHT / 2,
    },
    legendContainer: {
        flex: 1,
        marginHorizontal: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#222',
        borderRadius: 8,
    },
    legendTitle: {
        color: '#64c8ff',
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    legendItem: {
        color: '#fff',
        fontSize: 11,
        marginBottom: 4,
    },
});
