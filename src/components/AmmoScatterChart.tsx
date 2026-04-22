import React, { useState } from 'react';
import {
  View,
  Modal,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';
import { AppTheme } from 'src/theme/theme';
import { ScatterDataPoint } from 'src/types/ammo';

interface AmmoScatterChartProps {
  data: ScatterDataPoint[];
  caliber: string;
}

interface SelectedPoint extends ScatterDataPoint {
  index?: number;
}

/* Chart dimensions */
const CHART_WIDTH = 320;
const CHART_HEIGHT = 360;
const PADDING = 40;
const INNER_WIDTH = CHART_WIDTH - PADDING * 2;
const INNER_HEIGHT = CHART_HEIGHT - PADDING * 2;

/* Fixed axis ranges */
const MIN_X = 0;
const MAX_X = 100;
const MIN_Y = 0;
const MAX_Y = 70;

/* Tick definitions */
const X_TICKS = [0, 20, 40, 60, 80, 100];
const Y_TICKS = [0, 10, 20, 30, 40, 50, 60, 70];

export default function AmmoScatterChart({
  data,
  caliber,
}: AmmoScatterChartProps): React.JSX.Element {
  const [selectedPoint, setSelectedPoint] = useState<SelectedPoint | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const scaleX = (value: number) =>
    PADDING + ((value - MIN_X) / (MAX_X - MIN_X)) * INNER_WIDTH;

  const scaleY = (value: number) =>
    CHART_HEIGHT -
    PADDING -
    ((value - MIN_Y) / (MAX_Y - MIN_Y)) * INNER_HEIGHT;

  const handlePointPress = (point: ScatterDataPoint) => {
    setSelectedPoint(point);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Chart title */}
      <Text style={styles.chartTitle}>{caliber}</Text>

      {/* Chart canvas */}
      <View style={styles.chart}>
        <Text style={styles.yAxisLabel}>Penetration Power</Text>
        <View style={styles.gridBackground} />

        {/* Data points */}
        {data.map((point, index) => {
          const x = scaleX(point.x);
          const y = scaleY(point.y);

          return (
            <View
              key={index}
              style={[styles.pointWrapper, { left: x, top: y }]}
            >
              <Pressable
                style={styles.dataPoint}
                onPress={() => handlePointPress(point)}
              >
                <View style={styles.pointDot} />
              </Pressable>

              <Text style={styles.pointLabel}>{point.label}</Text>
            </View>
          );
        })}

        {/* Axes */}
        <View style={styles.xAxis} />
        <View style={styles.yAxis} />
        <Text style={styles.xAxisLabel}>Damage</Text>

        {/* X-axis ticks */}
        {X_TICKS.map(value => {
          const x = scaleX(value);
          return (
            <View key={`x-${value}`}>
              <View style={[styles.tick, styles.xTick, { left: x }]} />
              <Text style={[styles.tickLabel, styles.xTickLabel, { left: x }]}>
                {value}
              </Text>
            </View>
          );
        })}

        {/* Y-axis ticks */}
        {Y_TICKS.map(value => {
          const y = scaleY(value);
          return (
            <View key={`y-${value}`}>
              <View style={[styles.tick, styles.yTick, { top: y }]} />
              <Text style={[styles.tickLabel, styles.yTickLabel, { top: y }]}>
                {value}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Info text */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Tap any point to view recoil modifier
        </Text>
      </View>

      {/* Modal */}
      <Modal transparent animationType="fade" visible={modalVisible}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedPoint?.label}</Text>

            <View style={styles.modalInfoContainer}>
              <InfoRow label="Damage" value={selectedPoint?.x} />
              <InfoRow label="Penetration" value={selectedPoint?.y} />
              <InfoRow
                label="Recoil Modifier"
                value={selectedPoint?.recoilModifier?.toFixed(2)}
              />
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
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value?: number | string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}:</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

/* =======================
   Styles
======================= */

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  chartTitle: {
    fontFamily: 'bender-bold',
    fontSize: 16,
    color: AppTheme.colors.text,
    marginBottom: 12,
  },
  chart: {
    width: CHART_WIDTH,
    height: CHART_HEIGHT,
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
    borderColor: 'rgba(255,255,255,0.1)',
    pointerEvents: 'none',
  },

  xAxis: {
    position: 'absolute',
    left: PADDING,
    top: CHART_HEIGHT - PADDING,
    width: INNER_WIDTH,
    height: 1,
    backgroundColor: AppTheme.colors.border,
    pointerEvents: 'none',
  },
  yAxis: {
    position: 'absolute',
    left: PADDING,
    top: PADDING,
    width: 1,
    height: INNER_HEIGHT,
    backgroundColor: AppTheme.colors.border,
    pointerEvents: 'none',
  },

  xAxisLabel: {
    position: 'absolute',
    bottom: 4,
    right: 8,
    fontFamily: 'bender-bold',
    fontSize: 12,
    color: AppTheme.colors.text,
    pointerEvents: 'none',
  },
  yAxisLabel: {
    position: 'absolute',
    top: 8,
    left: 4,
    fontFamily: 'bender-bold',
    fontSize: 12,
    color: AppTheme.colors.text,
    pointerEvents: 'none',
  },

  tick: {
    position: 'absolute',
    width: 4,
    height: 1,
    backgroundColor: AppTheme.colors.border,
    pointerEvents: 'none',
  },
  xTick: {
    top: CHART_HEIGHT - PADDING + 4,
  },
  yTick: {
    left: PADDING - 8,
  },
  tickLabel: {
    position: 'absolute',
    fontFamily: 'bender',
    fontSize: 10,
    color: AppTheme.colors.text,
    pointerEvents: 'none',
  },
  xTickLabel: {
    top: CHART_HEIGHT - PADDING + 12,
    marginLeft: -12,
  },
  yTickLabel: {
    left: 4,
    marginTop: -8,
  },

  pointWrapper: {
    position: 'absolute',
  },
  dataPoint: {
    width: 8,
    height: 8,
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
    left: 10,
    top: -6,
    fontFamily: 'bender',
    fontSize: 9,
    color: 'white',
    minWidth: 90,
    maxWidth: 120,
    pointerEvents: 'none',
  },

  infoContainer: {
    marginTop: 12,
  },
  infoText: {
    fontFamily: 'bender',
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderRadius: 12,
    padding: 20,
    minWidth: 280,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
  },
  modalTitle: {
    fontFamily: 'bender-bold',
    fontSize: 18,
    color: AppTheme.colors.text,
    marginBottom: 16,
  },
  modalInfoContainer: {
    gap: 10,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    borderRadius: 6,
    alignItems: 'center',
  },
  closeButtonText: {
    fontFamily: 'bender-bold',
    fontSize: 14,
    color: 'white',
  },
});