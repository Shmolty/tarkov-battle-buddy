import React, { useState, useMemo } from 'react';
import { View, Modal, Pressable, Text, StyleSheet, ScrollView } from 'react-native';
import { AppTheme } from 'src/theme/theme';
import { ScatterDataPoint } from 'src/types/ammo';

interface AmmoScatterChartProps {
  data: ScatterDataPoint[];
  caliber: string;
}

interface SelectedPoint extends ScatterDataPoint {
  index?: number;
}

const CHART_WIDTH = 320;
const CHART_HEIGHT = 360;
const PADDING = 40;
const INNER_WIDTH = CHART_WIDTH - PADDING * 2;
const INNER_HEIGHT = CHART_HEIGHT - PADDING * 2;

export default function AmmoScatterChart({
  data,
  caliber,
}: AmmoScatterChartProps): React.JSX.Element {
  const [selectedPoint, setSelectedPoint] = useState<SelectedPoint | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { minX, maxX, minY, maxY } = useMemo(() => {
    if (data.length === 0) return { minX: 0, maxX: 1, minY: 0, maxY: 1 };

    const xValues = data.map(d => d.x);
    const yValues = data.map(d => d.y);

    return {
      minX: Math.min(...xValues),
      maxX: Math.max(...xValues) * 1.1,
      minY: Math.min(...yValues),
      maxY: Math.max(...yValues) * 1.1,
    };
  }, [data]);

  const scaleX = (value: number) => {
    return PADDING + ((value - minX) / (maxX - minX)) * INNER_WIDTH;
  };

  const scaleY = (value: number) => {
    return CHART_HEIGHT - PADDING - ((value - minY) / (maxY - minY)) * INNER_HEIGHT;
  };

  const handlePointPress = (point: ScatterDataPoint) => {
    setSelectedPoint(point);
    setModalVisible(true);
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Chart Title */}
          <Text style={styles.chartTitle}>{caliber}</Text>

          {/* Chart Canvas */}
          <View style={[styles.chart, { width: CHART_WIDTH, height: CHART_HEIGHT }]}>
            {/* Y-Axis Label */}
            <Text style={styles.yAxisLabel}>Penetration Power</Text>

            {/* Grid Background */}
            <View style={styles.gridBackground} />

            {/* Data Points */}
            
            {data.map((point, index) => {
              const x = scaleX(point.x);
              const y = scaleY(point.y);

              return (
                <View key={index} style={{ position: 'absolute', left: x, top: y }}>
                  <Pressable
                    style={styles.dataPoint}
                    onPress={() => handlePointPress(point)}
                  >
                    <View style={styles.pointDot} />
                  </Pressable>

                  <Text style={styles.pointLabel}>
                    {point.label}
                  </Text>
                </View>
              );
            })}


            {/* X-Axis */}
            <View style={styles.xAxis} />

            {/* Y-Axis */}
            <View style={styles.yAxis} />

            {/* X-Axis Label */}
            <Text style={styles.xAxisLabel}>Damage</Text>

            {/* Axis Ticks and Labels */}
            {/* X-Axis ticks */}
            {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
              const x = PADDING + tick * INNER_WIDTH;
              const value = Math.round(minX + tick * (maxX - minX));
              return (
                <View key={`x-tick-${tick}`}>
                  <View
                    style={[
                      styles.tick,
                      { left: x, top: CHART_HEIGHT - PADDING + 4 },
                    ]}
                  />
                  <Text
                    style={[
                      styles.tickLabel,
                      { left: x - 15, top: CHART_HEIGHT - PADDING + 12 },
                    ]}
                  >
                    {value}
                  </Text>
                </View>
              );
            })}

            {/* Y-Axis ticks */}
            {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
              const y = CHART_HEIGHT - PADDING - tick * INNER_HEIGHT;
              const value = Math.round(minY + tick * (maxY - minY));
              return (
                <View key={`y-tick-${tick}`}>
                  <View
                    style={[
                      styles.tick,
                      { left: PADDING - 8, top: y },
                    ]}
                  />
                  <Text
                    style={[
                      styles.tickLabel,
                      { left: 4, top: y - 10 },
                    ]}
                  >
                    {value}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Legend/Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Tap any point to view recoil modifier
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Modal for Point Details */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedPoint?.label}</Text>
            <View style={styles.modalInfoContainer}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Damage:</Text>
                <Text style={styles.infoValue}>{selectedPoint?.x}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Penetration Power:</Text>
                <Text style={styles.infoValue}>{selectedPoint?.y}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Recoil Modifier:</Text>
                <Text style={styles.infoValue}>
                  {selectedPoint?.recoilModifier.toFixed(2)}
                </Text>
              </View>
            </View>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  chartTitle: {
    fontFamily: 'bender-bold',
    fontSize: 16,
    color: AppTheme.colors.text,
    marginBottom: 12,
  },
  chart: {
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'relative',
  },
  gridBackground: {
    position: 'absolute',
    left: PADDING,
    top: PADDING,
    width: INNER_WIDTH,
    height: INNER_HEIGHT,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  xAxis: {
    position: 'absolute',
    left: PADDING,
    top: CHART_HEIGHT - PADDING,
    width: INNER_WIDTH,
    height: 1,
    backgroundColor: AppTheme.colors.border,
  },
  yAxis: {
    position: 'absolute',
    left: PADDING,
    top: PADDING,
    width: 1,
    height: INNER_HEIGHT,
    backgroundColor: AppTheme.colors.border,
  },
  xAxisLabel: {
    position: 'absolute',
    fontFamily: 'bender-bold',
    fontSize: 12,
    color: AppTheme.colors.text,
    bottom: 4,
    right: 8,
  },
  yAxisLabel: {
    position: 'absolute',
    fontFamily: 'bender-bold',
    fontSize: 12,
    color: AppTheme.colors.text,
    left: 4,
    top: 8,
  },
  tick: {
    position: 'absolute',
    width: 4,
    height: 1,
    backgroundColor: AppTheme.colors.border,
  },
  tickLabel: {
    position: 'absolute',
    fontFamily: 'bender',
    fontSize: 10,
    color: AppTheme.colors.text,
  },
  dataPoint: {
    position: 'absolute',
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: AppTheme.colors.primary,
    borderWidth: 1,
    borderColor: 'white',
  },
  pointLabel: {
    position: 'absolute',
    top: -14,
    left: 8,
    fontFamily: 'bender',
    fontSize: 10,
    color: 'white',
    maxWidth: 80,
  },
  infoContainer: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  infoText: {
    fontFamily: 'bender',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    minWidth: 280,
  },
  modalTitle: {
    fontFamily: 'bender-bold',
    fontSize: 18,
    color: AppTheme.colors.text,
    marginBottom: 16,
  },
  modalInfoContainer: {
    gap: 12,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontFamily: 'bender-bold',
    fontSize: 14,
    color: AppTheme.colors.text,
  },
  infoValue: {
    fontFamily: 'bender',
    fontSize: 14,
    color: AppTheme.colors.primary,
  },
  closeButton: {
    backgroundColor: AppTheme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  closeButtonText: {
    fontFamily: 'bender-bold',
    fontSize: 14,
    color: 'white',
  },
});
