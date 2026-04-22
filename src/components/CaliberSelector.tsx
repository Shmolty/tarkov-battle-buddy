import React from 'react';
import { View, ScrollView, Pressable, Text, StyleSheet } from 'react-native';
import { AppTheme } from 'src/theme/theme';

interface CaliberSelectorProps {
  calibers: string[];
  selectedCaliber: string;
  onSelect: (caliber: string) => void;
}

export default function CaliberSelector({
  calibers,
  selectedCaliber,
  onSelect,
}: CaliberSelectorProps): React.JSX.Element {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
      alwaysBounceHorizontal={false}
    >
      {calibers.map((caliber) => (
        <Pressable
          key={caliber}
          style={({ pressed }) => [
            styles.button,
            selectedCaliber === caliber && styles.buttonActive,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => onSelect(caliber)}
        >
          <Text
            style={[
              styles.buttonText,
              selectedCaliber === caliber && styles.buttonTextActive,
            ]}
          >
            {caliber}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
    height: 80,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
  },
  buttonActive: {
    backgroundColor: AppTheme.colors.primary,
    borderColor: AppTheme.colors.primary,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonText: {
    fontFamily: 'bender-bold',
    fontSize: 14,
    color: AppTheme.colors.text,
  },
  buttonTextActive: {
    color: 'white',
  },
});
