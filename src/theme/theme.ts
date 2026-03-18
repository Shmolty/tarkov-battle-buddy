// ---APP THEME---
// This theme is used to style elements such as the navbar, header, as well as text and icons therein.
// It can also be exported for use in other elements. So it acts as a primary color pallette for the application.

import { DefaultTheme, Theme as NavTheme } from '@react-navigation/native';

export const AppTheme: NavTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(0, 124, 43)',
    background: 'transparent',
    card: 'rgba(32, 32, 32, 1)',
    text: 'rgb(255, 255, 255)',
    border: 'rgb(255, 255, 255)',
    notification: DefaultTheme.colors.notification,
  },
};
