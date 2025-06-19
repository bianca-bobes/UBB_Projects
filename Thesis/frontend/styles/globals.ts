import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const globals = {
  screen: {
    width,
    height,
    isSmallDevice: width < 375,
  },

  layout: {
    maxContentWidth: 500,
    defaultBorderRadius: Platform.OS === 'ios' ? 16 : 12,
  },

  platform: {
    isIOS: Platform.OS === 'ios',
    isAndroid: Platform.OS === 'android',
  },
};
