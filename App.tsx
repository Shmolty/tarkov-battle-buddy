import React from 'react';
import { usePreloadedAssets } from './assets/usePreloadedAssets';
import { AppProviders } from './app/AppProviders';
import { AppNavigation } from './app/Navigation';

// delete me when splash page is done
import { View } from 'react-native';

export default function App(): React.JSX.Element {
  const { ready, images } = usePreloadedAssets();

  if (!ready || !images) {
    // Replace with a splash or loader component
    return <View style={{backgroundColor: 'black'}}></View>;
  }

  return (
    <AppProviders backgroundSource={images.background}>
      <AppNavigation />
    </AppProviders>
  );
}