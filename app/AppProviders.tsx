import React, { PropsWithChildren } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, ImageSourcePropType } from 'react-native';

type ProvidersProps = PropsWithChildren<{
  backgroundSource: ImageSourcePropType;
}>;

export function AppProviders({ children, backgroundSource }: ProvidersProps) {
  return (
    <>
      <StatusBar style="light" />
      <ImageBackground source={backgroundSource} style={{ flex: 1 }}>
        <LinearGradient
          style={{ flex: 1 }}
          colors={['rgba(32, 32, 32, 0.75)', 'rgba(0, 65, 23, 0.75)']}
        >
          {children}
        </LinearGradient>
      </ImageBackground>
    </>
  );
}