import { COLORS } from './colors';
import { TYPOGRAPHY } from './typography';

// Spacing scale
export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 48,
  XXXL: 64,
};

// Border radius scale
export const BORDER_RADIUS = {
  NONE: 0,
  SM: 4,
  MD: 8,
  LG: 12,
  XL: 16,
  XXL: 24,
  ROUND: 50,
};

// Shadow styles
export const SHADOWS = {
  NONE: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  SM: {
    shadowColor: COLORS.SHADOW.PRIMARY,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  MD: {
    shadowColor: COLORS.SHADOW.PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  LG: {
    shadowColor: COLORS.SHADOW.PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  XL: {
    shadowColor: COLORS.SHADOW.ELEVATED,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
  },
};

// Animation durations
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 800,
};

// Z-index scale
export const Z_INDEX = {
  BASE: 0,
  CARD: 1,
  MODAL: 1000,
  TOOLTIP: 1100,
  DROPDOWN: 1200,
  STICKY: 1300,
  FIXED: 1400,
  OVERLAY: 1500,
  MODAL_OVERLAY: 1600,
  TOAST: 1700,
};

// Main theme object
export const THEME = {
  // Colors
  colors: COLORS,
  
  // Typography
  typography: TYPOGRAPHY,
  
  // Spacing
  spacing: SPACING,
  
  // Border radius
  borderRadius: BORDER_RADIUS,
  
  // Shadows
  shadows: SHADOWS,
  
  // Animation
  animation: ANIMATION,
  
  // Z-index
  zIndex: Z_INDEX,
  
  // Layout
  layout: {
    // Screen dimensions
    screen: {
      padding: SPACING.MD,
      margin: SPACING.SM,
    },
    
    // Container styles
    container: {
      flex: 1,
      backgroundColor: COLORS.BACKGROUND.PRIMARY,
    },
    
    // Card styles
    card: {
      backgroundColor: COLORS.SURFACE.PRIMARY,
      borderRadius: BORDER_RADIUS.MD,
      padding: SPACING.MD,
      marginVertical: SPACING.SM,
      ...SHADOWS.SM,
    },
    
    // Section styles
    section: {
      marginVertical: SPACING.MD,
    },
    
    // Row styles
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    
    // Column styles
    column: {
      flexDirection: 'column',
    },
    
    // Center styles
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    // Space between styles
    spaceBetween: {
      justifyContent: 'space-between',
    },
    
    // Space around styles
    spaceAround: {
      justifyContent: 'space-around',
    },
  },
  
  // Button styles
  button: {
    // Primary button
    primary: {
      backgroundColor: COLORS.PRIMARY.MAIN,
      borderRadius: BORDER_RADIUS.MD,
      paddingVertical: SPACING.MD,
      paddingHorizontal: SPACING.LG,
      ...SHADOWS.SM,
    },
    
    // Secondary button
    secondary: {
      backgroundColor: COLORS.SECONDARY.MAIN,
      borderRadius: BORDER_RADIUS.MD,
      paddingVertical: SPACING.MD,
      paddingHorizontal: SPACING.LG,
      ...SHADOWS.SM,
    },
    
    // Outline button
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: COLORS.PRIMARY.MAIN,
      borderRadius: BORDER_RADIUS.MD,
      paddingVertical: SPACING.MD,
      paddingHorizontal: SPACING.LG,
    },
    
    // Text button
    text: {
      backgroundColor: 'transparent',
      paddingVertical: SPACING.SM,
      paddingHorizontal: SPACING.MD,
    },
    
    // Disabled button
    disabled: {
      backgroundColor: COLORS.GRAY[300],
      opacity: 0.6,
    },
    
    // Small button
    small: {
      paddingVertical: SPACING.SM,
      paddingHorizontal: SPACING.MD,
    },
    
    // Large button
    large: {
      paddingVertical: SPACING.LG,
      paddingHorizontal: SPACING.XL,
    },
  },
  
  // Input styles
  input: {
    // Default input
    default: {
      backgroundColor: COLORS.SURFACE.PRIMARY,
      borderWidth: 1,
      borderColor: COLORS.BORDER.PRIMARY,
      borderRadius: BORDER_RADIUS.MD,
      paddingVertical: SPACING.MD,
      paddingHorizontal: SPACING.MD,
      ...TYPOGRAPHY.INPUT.MEDIUM,
    },
    
    // Focused input
    focused: {
      borderColor: COLORS.BORDER.FOCUS,
      ...SHADOWS.SM,
    },
    
    // Error input
    error: {
      borderColor: COLORS.BORDER.ERROR,
    },
    
    // Success input
    success: {
      borderColor: COLORS.BORDER.SUCCESS,
    },
    
    // Disabled input
    disabled: {
      backgroundColor: COLORS.GRAY[100],
      opacity: 0.6,
    },
  },
  
  // Badge styles
  badge: {
    // Default badge
    default: {
      backgroundColor: COLORS.PRIMARY.MAIN,
      borderRadius: BORDER_RADIUS.ROUND,
      paddingVertical: SPACING.XS,
      paddingHorizontal: SPACING.SM,
      ...TYPOGRAPHY.BADGE,
    },
    
    // Success badge
    success: {
      backgroundColor: COLORS.SUCCESS.MAIN,
    },
    
    // Warning badge
    warning: {
      backgroundColor: COLORS.WARNING.MAIN,
    },
    
    // Error badge
    error: {
      backgroundColor: COLORS.ERROR.MAIN,
    },
    
    // Info badge
    info: {
      backgroundColor: COLORS.INFO.MAIN,
    },
  },
  
  // Chip styles
  chip: {
    // Default chip
    default: {
      backgroundColor: COLORS.GRAY[100],
      borderRadius: BORDER_RADIUS.ROUND,
      paddingVertical: SPACING.SM,
      paddingHorizontal: SPACING.MD,
      ...TYPOGRAPHY.CHIP,
    },
    
    // Selected chip
    selected: {
      backgroundColor: COLORS.PRIMARY.MAIN,
    },
    
    // Outlined chip
    outlined: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: COLORS.BORDER.PRIMARY,
    },
  },
  
  // Divider styles
  divider: {
    // Horizontal divider
    horizontal: {
      height: 1,
      backgroundColor: COLORS.BORDER.PRIMARY,
      marginVertical: SPACING.MD,
    },
    
    // Vertical divider
    vertical: {
      width: 1,
      backgroundColor: COLORS.BORDER.PRIMARY,
      marginHorizontal: SPACING.MD,
    },
  },
  
  // Avatar styles
  avatar: {
    // Small avatar
    small: {
      width: 32,
      height: 32,
      borderRadius: BORDER_RADIUS.ROUND,
    },
    
    // Medium avatar
    medium: {
      width: 48,
      height: 48,
      borderRadius: BORDER_RADIUS.ROUND,
    },
    
    // Large avatar
    large: {
      width: 64,
      height: 64,
      borderRadius: BORDER_RADIUS.ROUND,
    },
    
    // Extra large avatar
    xlarge: {
      width: 96,
      height: 96,
      borderRadius: BORDER_RADIUS.ROUND,
    },
  },
  
  // Icon styles
  icon: {
    // Small icon
    small: {
      width: 16,
      height: 16,
    },
    
    // Medium icon
    medium: {
      width: 24,
      height: 24,
    },
    
    // Large icon
    large: {
      width: 32,
      height: 32,
    },
    
    // Extra large icon
    xlarge: {
      width: 48,
      height: 48,
    },
  },
};

export default THEME; 