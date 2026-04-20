// ---AMMO CHARTS SCREEN---
// Screen for displaying a scatter plot for each caliber of ammo. Data shown is the damage (x) and armor penetration (y) values for each type. 
// OPTIONAL - Could also add recoil modifier and other data separate from the x and y values (perhaps listed under the chart) when a certain ammo is selected.

// TODO!! --> First I need to get the ammo data from tarkov.dev API. Then I use that data to create charts for each caliber of ammunition. Also need to create a selector for users to choose which caliber of ammo they want to view. The chart library I am going with is react-native-gifted-charts, 'https://www.npmjs.com/package/react-native-gifted-charts'.

// Library Imports
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Custom Components
import Title from 'src/components/Title';

export default function AmmoCharts()
: React.JSX.Element {
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

                                {/* Y-axis tick labels */}
                                {chartData.yTicks.map((tick, idx) => (
                                    <Text
                                        key={`y-tick-${idx}`}
                                        style={[
                                            styles.axisTickLabel,
                                            {
                                                top: CHART_HEIGHT - PADDING - (idx / (chartData.yTicks.length - 1)) * (CHART_HEIGHT - PADDING) - 8,
                                                left: -45,
                                            },
                                        ]}
                                    >
                                        {Math.round(tick * 10) / 10}
                                    </Text>
                                ))}

                                {/* X-axis tick labels */}
                                {chartData.xTicks.map((tick, idx) => (
                                    <Text
                                        key={`x-tick-${idx}`}
                                        style={[
                                            styles.axisTickLabel,
                                            {
                                                left: PADDING + (idx / (chartData.xTicks.length - 1)) * (CHART_WIDTH - PADDING) - 12,
                                                top: CHART_HEIGHT - PADDING + 8,
                                            },
                                        ]}
                                    >
                                        {Math.round(tick * 10) / 10}
                                    </Text>
                                ))}

                                {/* Axes */}
                                <View style={[styles.axis, { left: PADDING, height: CHART_HEIGHT }]} />
                                <View style={[styles.axis, { top: CHART_HEIGHT - PADDING, width: CHART_WIDTH }]} />

                                {/* Data points with labels */}
                                {chartData.points.map((point, idx) => (
                                    <View key={idx}>
                                        <View
                                            style={[
                                                styles.dataPoint,
                                                {
                                                    left: point.x - 5,
                                                    top: point.y - 5,
                                                },
                                            ]}
                                        />
                                        <Text
                                            style={[
                                                styles.dataLabel,
                                                {
                                                    left: point.x + 8,
                                                    top: point.y - 8,
                                                },
                                            ]}
                                            numberOfLines={1}
                                        >
                                            {point.label}
                                        </Text>
                                    </View>
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
    axisTickLabel: {
        position: 'absolute',
        color: '#aaa',
        fontSize: 9,
        fontWeight: '400',
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
    dataLabel: {
        position: 'absolute',
        color: '#64c8ff',
        fontSize: 9,
        fontWeight: '500',
        backgroundColor: '#1a1a1a',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 3,
        maxWidth: 80,
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
