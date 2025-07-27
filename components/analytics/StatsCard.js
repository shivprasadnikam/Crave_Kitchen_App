import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { THEME } from '../../styles/theme';

const StatsCard = ({
  icon = '📊',
  label,
  value,
  unit = '',
  trend = null, // { direction: 'up' | 'down', value: number, color: string }
  backgroundColor = THEME.colors.SURFACE.PRIMARY,
  iconBackground = THEME.colors.PRIMARY.MAIN + '20',
  iconColor = THEME.colors.PRIMARY.MAIN,
  valueColor = THEME.colors.TEXT.PRIMARY,
  labelColor = THEME.colors.TEXT.SECONDARY,
  style = {},
  compact = false,
}) => {
  const renderTrend = () => {
    if (!trend) return null;
    const { direction, value: trendValue, color } = trend;
    return (
      <View style={styles.trendContainer}>
        <Text style={[styles.trendIcon, { color }]}>
          {direction === 'up' ? '▲' : '▼'}
        </Text>
        <Text style={[styles.trendValue, { color }]}> {trendValue}%</Text>
      </View>
    );
  };

  return (
    <View style={[styles.card, { backgroundColor }, style, compact && styles.compactCard]}>
      <View style={[styles.iconContainer, { backgroundColor: iconBackground }]}> 
        <Text style={[styles.icon, { color: iconColor }]}>{icon}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.label, { color: labelColor }]} numberOfLines={1}>{label}</Text>
        <View style={styles.valueRow}>
          <Text style={[styles.value, { color: valueColor }]} numberOfLines={1}>
            {value}{unit}
          </Text>
          {renderTrend()}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: THEME.borderRadius.MD,
    padding: THEME.spacing.MD,
    ...THEME.shadows.SM,
    marginBottom: THEME.spacing.MD,
    minWidth: 140,
    maxWidth: 220,
  },
  compactCard: {
    padding: THEME.spacing.SM,
    minWidth: 100,
    maxWidth: 140,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: THEME.spacing.MD,
  },
  icon: {
    fontSize: 24,
  },
  infoContainer: {
    flex: 1,
  },
  label: {
    ...THEME.typography.CAPTION.SMALL,
    fontWeight: '500',
    marginBottom: THEME.spacing.XS,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.SM,
  },
  value: {
    ...THEME.typography.HEADING.MEDIUM,
    fontWeight: '700',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: THEME.spacing.SM,
  },
  trendIcon: {
    fontSize: 14,
    fontWeight: '700',
  },
  trendValue: {
    ...THEME.typography.BODY.SMALL,
    fontWeight: '600',
    marginLeft: THEME.spacing.XS,
  },
});

export default StatsCard; 