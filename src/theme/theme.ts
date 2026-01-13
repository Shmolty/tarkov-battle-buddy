import { DefaultTheme, Theme as NavTheme } from '@react-navigation/native';

export const AppTheme: NavTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(0, 124, 43)',
    background: 'transparent',
    card: 'rgba(32, 32, 32, 1)',
    text: 'white',
    border: 'white',
    notification: DefaultTheme.colors.notification,
  },
};
