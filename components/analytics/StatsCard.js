import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/globalStyles';
import { typography } from '../../styles/typography';

const StatsCard = ({
  icon = '📊',
  label,
  value,
  unit = '',
  trend = null, // { direction: 'up' | 'down', value: number, color: string }
  backgroundColor = colors.surface,
  iconBackground = colors.primary + '20',
  iconColor = colors.primary,
  valueColor = colors.textPrimary,
  labelColor = colors.textSecondary,
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
    borderRadius: 12,
    padding: 16,
    ...globalStyles.shadow,
    marginBottom: 12,
    minWidth: 140,
    maxWidth: 220,
  },
  compactCard: {
    padding: 10,
    minWidth: 100,
    maxWidth: 140,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 24,
  },
  infoContainer: {
    flex: 1,
  },
  label: {
    ...typography.caption,
    fontWeight: '500',
    marginBottom: 4,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  value: {
    ...typography.h2,
    fontWeight: '700',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  trendIcon: {
    fontSize: 14,
    fontWeight: '700',
  },
  trendValue: {
    ...typography.body2,
    fontWeight: '600',
    marginLeft: 2,
  },
});

export default StatsCard; 