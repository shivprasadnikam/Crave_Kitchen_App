import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Standard mobile screen dimensions
export const screenDimensions = {
  width,
  height,
  isSmallDevice: width < 375,
  isMediumDevice: width >= 375 && width < 414,
  isLargeDevice: width >= 414,
  isTablet: width >= 768,
};

// Standard spacing values
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

// Standard padding values
export const padding = {
  screen: screenDimensions.isSmallDevice ? 12 : 16,
  card: 16,
  button: 12,
  input: 12,
};

// Standard margin values
export const margin = {
  screen: screenDimensions.isSmallDevice ? 12 : 16,
  card: 16,
  section: 20,
  item: 8,
};

// Standard border radius values
export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  round: 50,
};

// Standard font sizes
export const fontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
  title: 28,
};

// Platform-specific adjustments
export const platformSpecific = {
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  statusBarHeight: Platform.OS === 'ios' ? 44 : 24,
  bottomTabHeight: Platform.OS === 'ios' ? 83 : 70,
};

export default {
  screenDimensions,
  spacing,
  padding,
  margin,
  borderRadius,
  fontSize,
  platformSpecific,
}; 