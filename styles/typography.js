import { Platform } from 'react-native';

// Font families
export const FONTS = {
  FAMILY: {
    REGULAR: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    MEDIUM: Platform.select({
      ios: 'System',
      android: 'Roboto-Medium',
    }),
    BOLD: Platform.select({
      ios: 'System',
      android: 'Roboto-Bold',
    }),
    LIGHT: Platform.select({
      ios: 'System',
      android: 'Roboto-Light',
    }),
    THIN: Platform.select({
      ios: 'System',
      android: 'Roboto-Thin',
    }),
  },
  
  // Font weights
  WEIGHT: {
    THIN: '100',
    LIGHT: '300',
    REGULAR: '400',
    MEDIUM: '500',
    SEMIBOLD: '600',
    BOLD: '700',
    EXTRABOLD: '800',
    BLACK: '900',
  },
  
  // Font sizes
  SIZE: {
    XS: 10,
    SM: 12,
    BASE: 14,
    LG: 16,
    XL: 18,
    XXL: 20,
    XXXL: 24,
    TITLE: 28,
    HEADING: 32,
    DISPLAY: 36,
  },
  
  // Line heights
  LINE_HEIGHT: {
    TIGHT: 1.2,
    NORMAL: 1.4,
    RELAXED: 1.6,
    LOOSE: 1.8,
  },
  
  // Letter spacing
  LETTER_SPACING: {
    TIGHT: -0.5,
    NORMAL: 0,
    WIDE: 0.5,
    WIDER: 1,
  },
};

// Typography styles
export const TYPOGRAPHY = {
  // Display styles
  DISPLAY: {
    LARGE: {
      fontFamily: FONTS.FAMILY.BOLD,
      fontSize: FONTS.SIZE.DISPLAY,
      fontWeight: FONTS.WEIGHT.BOLD,
      lineHeight: FONTS.SIZE.DISPLAY * FONTS.LINE_HEIGHT.TIGHT,
      letterSpacing: FONTS.LETTER_SPACING.TIGHT,
    },
    MEDIUM: {
      fontFamily: FONTS.FAMILY.BOLD,
      fontSize: FONTS.SIZE.HEADING,
      fontWeight: FONTS.WEIGHT.BOLD,
      lineHeight: FONTS.SIZE.HEADING * FONTS.LINE_HEIGHT.TIGHT,
      letterSpacing: FONTS.LETTER_SPACING.TIGHT,
    },
    SMALL: {
      fontFamily: FONTS.FAMILY.BOLD,
      fontSize: FONTS.SIZE.TITLE,
      fontWeight: FONTS.WEIGHT.BOLD,
      lineHeight: FONTS.SIZE.TITLE * FONTS.LINE_HEIGHT.TIGHT,
      letterSpacing: FONTS.LETTER_SPACING.NORMAL,
    },
  },
  
  // Heading styles
  HEADING: {
    H1: {
      fontFamily: FONTS.FAMILY.BOLD,
      fontSize: FONTS.SIZE.HEADING,
      fontWeight: FONTS.WEIGHT.BOLD,
      lineHeight: FONTS.SIZE.HEADING * FONTS.LINE_HEIGHT.TIGHT,
      letterSpacing: FONTS.LETTER_SPACING.TIGHT,
    },
    H2: {
      fontFamily: FONTS.FAMILY.BOLD,
      fontSize: FONTS.SIZE.TITLE,
      fontWeight: FONTS.WEIGHT.BOLD,
      lineHeight: FONTS.SIZE.TITLE * FONTS.LINE_HEIGHT.TIGHT,
      letterSpacing: FONTS.LETTER_SPACING.NORMAL,
    },
    H3: {
      fontFamily: FONTS.FAMILY.MEDIUM,
      fontSize: FONTS.SIZE.XXXL,
      fontWeight: FONTS.WEIGHT.MEDIUM,
      lineHeight: FONTS.SIZE.XXXL * FONTS.LINE_HEIGHT.NORMAL,
      letterSpacing: FONTS.LETTER_SPACING.NORMAL,
    },
    H4: {
      fontFamily: FONTS.FAMILY.MEDIUM,
      fontSize: FONTS.SIZE.XXL,
      fontWeight: FONTS.WEIGHT.MEDIUM,
      lineHeight: FONTS.SIZE.XXL * FONTS.LINE_HEIGHT.NORMAL,
      letterSpacing: FONTS.LETTER_SPACING.NORMAL,
    },
    H5: {
      fontFamily: FONTS.FAMILY.MEDIUM,
      fontSize: FONTS.SIZE.XL,
      fontWeight: FONTS.WEIGHT.MEDIUM,
      lineHeight: FONTS.SIZE.XL * FONTS.LINE_HEIGHT.NORMAL,
      letterSpacing: FONTS.LETTER_SPACING.NORMAL,
    },
    H6: {
      fontFamily: FONTS.FAMILY.MEDIUM,
      fontSize: FONTS.SIZE.LG,
      fontWeight: FONTS.WEIGHT.MEDIUM,
      lineHeight: FONTS.SIZE.LG * FONTS.LINE_HEIGHT.NORMAL,
      letterSpacing: FONTS.LETTER_SPACING.NORMAL,
    },
  },
  
  // Body text styles
  BODY: {
    LARGE: {
      fontFamily: FONTS.FAMILY.REGULAR,
      fontSize: FONTS.SIZE.LG,
      fontWeight: FONTS.WEIGHT.REGULAR,
      lineHeight: FONTS.SIZE.LG * FONTS.LINE_HEIGHT.RELAXED,
      letterSpacing: FONTS.LETTER_SPACING.NORMAL,
    },
    MEDIUM: {
      fontFamily: FONTS.FAMILY.REGULAR,
      fontSize: FONTS.SIZE.BASE,
      fontWeight: FONTS.WEIGHT.REGULAR,
      lineHeight: FONTS.SIZE.BASE * FONTS.LINE_HEIGHT.RELAXED,
      letterSpacing: FONTS.LETTER_SPACING.NORMAL,
    },
    SMALL: {
      fontFamily: FONTS.FAMILY.REGULAR,
      fontSize: FONTS.SIZE.SM,
      fontWeight: FONTS.WEIGHT.REGULAR,
      lineHeight: FONTS.SIZE.SM * FONTS.LINE_HEIGHT.RELAXED,
      letterSpacing: FONTS.LETTER_SPACING.NORMAL,
    },
    XSMALL: {
      fontFamily: FONTS.FAMILY.REGULAR,
      fontSize: FONTS.SIZE.XS,
      fontWeight: FONTS.WEIGHT.REGULAR,
      lineHeight: FONTS.SIZE.XS * FONTS.LINE_HEIGHT.RELAXED,
      letterSpacing: FONTS.LETTER_SPACING.NORMAL,
    },
  },
  
  // Button text styles
  BUTTON: {
    LARGE: {
      fontFamily: FONTS.FAMILY.MEDIUM,
      fontSize: FONTS.SIZE.LG,
      fontWeight: FONTS.WEIGHT.MEDIUM,
      lineHeight: FONTS.SIZE.LG * FONTS.LINE_HEIGHT.NORMAL,
      letterSpacing: FONTS.LETTER_SPACING.WIDE,
    },
    MEDIUM: {
      fontFamily: FONTS.FAMILY.MEDIUM,
      fontSize: FONTS.SIZE.BASE,
      fontWeight: FONTS.WEIGHT.MEDIUM,
      lineHeight: FONTS.SIZE.BASE * FONTS.LINE_HEIGHT.NORMAL,
      letterSpacing: FONTS.LETTER_SPACING.WIDE,
    },
    SMALL: {
      fontFamily: FONTS.FAMILY.MEDIUM,
      fontSize: FONTS.SIZE.SM,
      fontWeight: FONTS.WEIGHT.MEDIUM,
      lineHeight: FONTS.SIZE.SM * FONTS.LINE_HEIGHT.NORMAL,
      letterSpacing: FONTS.LETTER_SPACING.WIDE,
    },
  },
  
  // Caption styles
  CAPTION: {
    LARGE: {
      fontFamily: FONTS.FAMILY.REGULAR,
      fontSize: FONTS.SIZE.SM,
      fontWeight: FONTS.WEIGHT.REGULAR,
      lineHeight: FONTS.SIZE.SM * FONTS.LINE_HEIGHT.NORMAL,
      letterSpacing: FONTS.LETTER_SPACING.NORMAL,
    },
    SMALL: {
      fontFamily: FONTS.FAMILY.REGULAR,
      fontSize: FONTS.SIZE.XS,
      fontWeight: FONTS.WEIGHT.REGULAR,
      lineHeight: FONTS.SIZE.XS * FONTS.LINE_HEIGHT.NORMAL,
      letterSpacing: FONTS.LETTER_SPACING.NORMAL,
    },
  },
  
  // Overline styles
  OVERLINE: {
    fontFamily: FONTS.FAMILY.MEDIUM,
    fontSize: FONTS.SIZE.XS,
    fontWeight: FONTS.WEIGHT.MEDIUM,
    lineHeight: FONTS.SIZE.XS * FONTS.LINE_HEIGHT.NORMAL,
    letterSpacing: FONTS.LETTER_SPACING.WIDER,
    textTransform: 'uppercase',
  },
  
  // Label styles
  LABEL: {
    LARGE: {
      fontFamily: FONTS.FAMILY.MEDIUM,
      fontSize: FONTS.SIZE.BASE,
      fontWeight: FONTS.WEIGHT.MEDIUM,
      lineHeight: FONTS.SIZE.BASE * FONTS.LINE_HEIGHT.NORMAL,
      letterSpacing: FONTS.LETTER_SPACING.NORMAL,
    },
    MEDIUM: {
      fontFamily: FONTS.FAMILY.MEDIUM,
      fontSize: FONTS.SIZE.SM,
      fontWeight: FONTS.WEIGHT.MEDIUM,
      lineHeight: FONTS.SIZE.SM * FONTS.LINE_HEIGHT.NORMAL,
      letterSpacing: FONTS.LETTER_SPACING.NORMAL,
    },
    SMALL: {
      fontFamily: FONTS.FAMILY.MEDIUM,
      fontSize: FONTS.SIZE.XS,
      fontWeight: FONTS.WEIGHT.MEDIUM,
      lineHeight: FONTS.SIZE.XS * FONTS.LINE_HEIGHT.NORMAL,
      letterSpacing: FONTS.LETTER_SPACING.NORMAL,
    },
  },
  
  // Input styles
  INPUT: {
    LARGE: {
      fontFamily: FONTS.FAMILY.REGULAR,
      fontSize: FONTS.SIZE.LG,
      fontWeight: FONTS.WEIGHT.REGULAR,
      lineHeight: FONTS.SIZE.LG * FONTS.LINE_HEIGHT.NORMAL,
      letterSpacing: FONTS.LETTER_SPACING.NORMAL,
    },
    MEDIUM: {
      fontFamily: FONTS.FAMILY.REGULAR,
      fontSize: FONTS.SIZE.BASE,
      fontWeight: FONTS.WEIGHT.REGULAR,
      lineHeight: FONTS.SIZE.BASE * FONTS.LINE_HEIGHT.NORMAL,
      letterSpacing: FONTS.LETTER_SPACING.NORMAL,
    },
    SMALL: {
      fontFamily: FONTS.FAMILY.REGULAR,
      fontSize: FONTS.SIZE.SM,
      fontWeight: FONTS.WEIGHT.REGULAR,
      lineHeight: FONTS.SIZE.SM * FONTS.LINE_HEIGHT.NORMAL,
      letterSpacing: FONTS.LETTER_SPACING.NORMAL,
    },
  },
  
  // Badge styles
  BADGE: {
    fontFamily: FONTS.FAMILY.MEDIUM,
    fontSize: FONTS.SIZE.XS,
    fontWeight: FONTS.WEIGHT.MEDIUM,
    lineHeight: FONTS.SIZE.XS * FONTS.LINE_HEIGHT.NORMAL,
    letterSpacing: FONTS.LETTER_SPACING.WIDE,
    textTransform: 'uppercase',
  },
  
  // Chip styles
  CHIP: {
    fontFamily: FONTS.FAMILY.MEDIUM,
    fontSize: FONTS.SIZE.SM,
    fontWeight: FONTS.WEIGHT.MEDIUM,
    lineHeight: FONTS.SIZE.SM * FONTS.LINE_HEIGHT.NORMAL,
    letterSpacing: FONTS.LETTER_SPACING.NORMAL,
  },
};

export default TYPOGRAPHY; 