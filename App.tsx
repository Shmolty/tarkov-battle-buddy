// ---APP COMPONENT--
// This component serves as the initialization of all navigation and assets for the application.

// Library Imports
import React, { useContext, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { ApolloProvider } from '@apollo/client/react';

// Custom components
import { usePreloadedAssets } from './src/assets/usePreloadedAssets';
import { AppProviders } from './src/app/AppProviders';
import { AppNavigation } from './src/app/Navigation/AppNavigation';
import { apolloClient } from 'src/graphql/apolloClient';

// context
import AuthContextProvider, { AuthContext } from "src/context/AuthContext";
import AuthenticationStack from 'src/app/Navigation/AuthenticationStack';

SplashScreen.preventAutoHideAsync();

export default function App(): React.JSX.Element | null {
  const { ready, images } = usePreloadedAssets();
  const authCtx = useContext(AuthContext);

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
        {!authCtx.isAuthenticated && <AuthenticationStack />}
        {authCtx.isAuthenticated && <AppNavigation />}
      </AppProviders>
    </ApolloProvider>
  );
}