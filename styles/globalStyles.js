import { StyleSheet } from 'react-native';
import { THEME } from './theme';

// Global styles that can be used throughout the app
export const GLOBAL_STYLES = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: THEME.colors.BACKGROUND.PRIMARY,
  },
  
  // Safe area container
  safeArea: {
    flex: 1,
    backgroundColor: THEME.colors.BACKGROUND.PRIMARY,
  },
  
  // Screen container
  screen: {
    flex: 1,
    backgroundColor: THEME.colors.BACKGROUND.PRIMARY,
    padding: THEME.spacing.MD,
  },
  
  // Content container
  content: {
    flex: 1,
    paddingHorizontal: THEME.spacing.MD,
  },
  
  // Scroll content
  scrollContent: {
    flexGrow: 1,
    paddingBottom: THEME.spacing.XL,
  },
  
  // Row layouts
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  rowSpaceAround: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  
  // Column layouts
  column: {
    flexDirection: 'column',
  },
  
  columnCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Center alignments
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  centerHorizontal: {
    alignItems: 'center',
  },
  
  centerVertical: {
    justifyContent: 'center',
  },
  
  // Flex utilities
  flex1: {
    flex: 1,
  },
  
  flex2: {
    flex: 2,
  },
  
  flex3: {
    flex: 3,
  },
  
  flexGrow: {
    flexGrow: 1,
  },
  
  flexShrink: {
    flexShrink: 1,
  },
  
  // Position utilities
  absolute: {
    position: 'absolute',
  },
  
  relative: {
    position: 'relative',
  },
  
  // Card styles
  card: {
    backgroundColor: THEME.colors.SURFACE.PRIMARY,
    borderRadius: THEME.borderRadius.MD,
    padding: THEME.spacing.MD,
    marginVertical: THEME.spacing.SM,
    ...THEME.shadows.SM,
  },
  
  cardElevated: {
    backgroundColor: THEME.colors.SURFACE.PRIMARY,
    borderRadius: THEME.borderRadius.MD,
    padding: THEME.spacing.MD,
    marginVertical: THEME.spacing.SM,
    ...THEME.shadows.MD,
  },
  
  // Section styles
  section: {
    marginVertical: THEME.spacing.MD,
  },
  
  sectionHeader: {
    marginBottom: THEME.spacing.MD,
  },
  
  // Divider styles
  divider: {
    height: 1,
    backgroundColor: THEME.colors.BORDER.PRIMARY,
    marginVertical: THEME.spacing.MD,
  },
  
  dividerVertical: {
    width: 1,
    backgroundColor: THEME.colors.BORDER.PRIMARY,
    marginHorizontal: THEME.spacing.MD,
  },
  
  // Spacing utilities
  marginTop: {
    marginTop: THEME.spacing.MD,
  },
  
  marginBottom: {
    marginBottom: THEME.spacing.MD,
  },
  
  marginLeft: {
    marginLeft: THEME.spacing.MD,
  },
  
  marginRight: {
    marginRight: THEME.spacing.MD,
  },
  
  marginHorizontal: {
    marginHorizontal: THEME.spacing.MD,
  },
  
  marginVertical: {
    marginVertical: THEME.spacing.MD,
  },
  
  paddingTop: {
    paddingTop: THEME.spacing.MD,
  },
  
  paddingBottom: {
    paddingBottom: THEME.spacing.MD,
  },
  
  paddingLeft: {
    paddingLeft: THEME.spacing.MD,
  },
  
  paddingRight: {
    paddingRight: THEME.spacing.MD,
  },
  
  paddingHorizontal: {
    paddingHorizontal: THEME.spacing.MD,
  },
  
  paddingVertical: {
    paddingVertical: THEME.spacing.MD,
  },
  
  // Text alignments
  textLeft: {
    textAlign: 'left',
  },
  
  textCenter: {
    textAlign: 'center',
  },
  
  textRight: {
    textAlign: 'right',
  },
  
  // Border utilities
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: THEME.colors.BORDER.PRIMARY,
  },
  
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.BORDER.PRIMARY,
  },
  
  borderLeft: {
    borderLeftWidth: 1,
    borderLeftColor: THEME.colors.BORDER.PRIMARY,
  },
  
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: THEME.colors.BORDER.PRIMARY,
  },
  
  // Background utilities
  bgPrimary: {
    backgroundColor: THEME.colors.BACKGROUND.PRIMARY,
  },
  
  bgSecondary: {
    backgroundColor: THEME.colors.BACKGROUND.SECONDARY,
  },
  
  bgSurface: {
    backgroundColor: THEME.colors.SURFACE.PRIMARY,
  },
  
  // Shadow utilities
  shadowSm: {
    ...THEME.shadows.SM,
  },
  
  shadowMd: {
    ...THEME.shadows.MD,
  },
  
  shadowLg: {
    ...THEME.shadows.LG,
  },
  
  // Border radius utilities
  roundedSm: {
    borderRadius: THEME.borderRadius.SM,
  },
  
  roundedMd: {
    borderRadius: THEME.borderRadius.MD,
  },
  
  roundedLg: {
    borderRadius: THEME.borderRadius.LG,
  },
  
  roundedFull: {
    borderRadius: THEME.borderRadius.ROUND,
  },
  
  // Width and height utilities
  wFull: {
    width: '100%',
  },
  
  hFull: {
    height: '100%',
  },
  
  wAuto: {
    width: 'auto',
  },
  
  hAuto: {
    height: 'auto',
  },
  
  // Overflow utilities
  overflowHidden: {
    overflow: 'hidden',
  },
  
  overflowScroll: {
    overflow: 'scroll',
  },
  
  // Z-index utilities
  zIndex1: {
    zIndex: 1,
  },
  
  zIndex10: {
    zIndex: 10,
  },
  
  zIndex100: {
    zIndex: 100,
  },
  
  // Opacity utilities
  opacity50: {
    opacity: 0.5,
  },
  
  opacity75: {
    opacity: 0.75,
  },
  
  opacity90: {
    opacity: 0.9,
  },
  
  // Display utilities
  hidden: {
    display: 'none',
  },
  
  visible: {
    display: 'flex',
  },
  
  // Loading overlay
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: THEME.colors.BACKGROUND.OVERLAY,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: THEME.zIndex.OVERLAY,
  },
  
  // Modal overlay
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: THEME.colors.BACKGROUND.MODAL,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: THEME.zIndex.MODAL_OVERLAY,
  },
  
  // Toast container
  toastContainer: {
    position: 'absolute',
    top: 50,
    left: THEME.spacing.MD,
    right: THEME.spacing.MD,
    zIndex: THEME.zIndex.TOAST,
  },
  
  // Empty state container
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: THEME.spacing.XL,
  },
  
  // Error state container
  errorStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: THEME.spacing.XL,
  },
  
  // List item styles
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: THEME.spacing.MD,
    paddingHorizontal: THEME.spacing.MD,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.BORDER.PRIMARY,
  },
  
  listItemLast: {
    borderBottomWidth: 0,
  },
  
  // Form styles
  formGroup: {
    marginBottom: THEME.spacing.MD,
  },
  
  formLabel: {
    marginBottom: THEME.spacing.SM,
  },
  
  formError: {
    marginTop: THEME.spacing.XS,
  },
  
  // Button group styles
  buttonGroup: {
    flexDirection: 'row',
    gap: THEME.spacing.SM,
  },
  
  buttonGroupVertical: {
    flexDirection: 'column',
    gap: THEME.spacing.SM,
  },
  
  // Grid styles
  grid2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: THEME.spacing.MD,
  },
  
  grid3: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: THEME.spacing.MD,
  },
  
  gridItem2: {
    width: '48%',
  },
  
  gridItem3: {
    width: '31%',
  },
  
  // Status indicator styles
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  
  // Badge container
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: THEME.spacing.XS,
  },
  
  // Chip container
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: THEME.spacing.SM,
  },
  
  // Avatar group
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  // Icon with text
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.SM,
  },
  
  // Price display
  priceDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.XS,
  },
  
  // Rating display
  ratingDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.XS,
  },
  
  // Time display
  timeDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.XS,
  },
  
  // Location display
  locationDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.XS,
  },
  
  // Phone display
  phoneDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.XS,
  },
  
  // Email display
  emailDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.XS,
  },
});

export default GLOBAL_STYLES; 