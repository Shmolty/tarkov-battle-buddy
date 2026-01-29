// --IMPORTS--
// Library Imports
import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { ApolloProvider } from '@apollo/client/react';

// Custom components
import { usePreloadedAssets } from './src/assets/usePreloadedAssets';
import { AppProviders } from './src/app/AppProviders';
import { AppNavigation } from './src/app/Navigation';
import { apolloClient } from 'src/graphql/apolloClient';

SplashScreen.preventAutoHideAsync();

export default function App(): React.JSX.Element | null {
  const { ready, images } = usePreloadedAssets();

  // remove splash screen once assets are loaded
  useEffect(() => {
    if (ready || images) {
    SplashScreen.hideAsync();
  }
  }, [ready, images]);
  // return null while assets are loading
  if (!ready || !images) {
    return null;
  }

  return (
    <ApolloProvider client={apolloClient}>
      <AppProviders backgroundSource={images.background}>
        <AppNavigation />
      </AppProviders>
    </ApolloProvider>
  );
}