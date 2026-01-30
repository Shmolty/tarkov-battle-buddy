import { ImageSourcePropType } from 'react-native';

export const BACKGROUND: ImageSourcePropType = require('../../assets/images/background.jpg');
// Add others if needed:
// export const ICON: ImageSourcePropType = require('../../assets/icon.png');

export const images = {
  background: BACKGROUND,
} as const;