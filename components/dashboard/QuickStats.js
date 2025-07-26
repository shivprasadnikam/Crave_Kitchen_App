import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { THEME } from '../../styles/theme';

const QuickStats = ({ 
  stats = [], 
  onStatPress,
  loading = false 
}) => {
  const defaultStats = [
    {
      id: 'orders',
      title: 'Today\'s Orders',
      value: '0',
      change: '+0%',
      changeType: 'positive',
      icon: '📦',
      color: THEME.colors.PRIMARY.MAIN,
    },
    {
      id: 'revenue',
      title: 'Today\'s Revenue',
      value: '$0',
      change: '+0%',
      changeType: 'positive',
      icon: '💰',
      color: THEME.colors.SUCCESS.MAIN,
    },
    {
      id: 'pending',
      title: 'Pending Orders',
      value: '0',
      change: '0',
      changeType: 'neutral',
      icon: '⏳',
      color: THEME.colors.WARNING.MAIN,
    },
    {
      id: 'rating',
      title: 'Avg Rating',
      value: '0.0',
      change: '+0.0',
      changeType: 'positive',
      icon: '⭐',
      color: THEME.colors.INFO.MAIN,
    },
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  const getChangeColor = (changeType) => {
    switch (changeType) {
      case 'positive':
        return THEME.colors.SUCCESS.MAIN;
      case 'negative':
        return THEME.colors.ERROR.MAIN;
      case 'neutral':
        return THEME.colors.TEXT.SECONDARY;
      default:
        return THEME.colors.TEXT.SECONDARY;
    }
  };

  const handleStatPress = (stat) => {
    if (onStatPress) {
      onStatPress(stat);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.grid}>
          {[1, 2, 3, 4].map((index) => (
            <View key={index} style={[styles.statCard, styles.loadingCard]}>
              <View style={styles.loadingShimmer} />
            </View>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Quick Stats</Text>
      <View style={styles.grid}>
        {displayStats.map((stat) => (
          <TouchableOpacity
            key={stat.id}
            style={[styles.statCard, { borderLeftColor: stat.color }]}
            onPress={() => handleStatPress(stat)}
            activeOpacity={0.7}
          >
            <View style={styles.statHeader}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={[styles.changeText, { color: getChangeColor(stat.changeType) }]}>
                {stat.change}
              </Text>
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statTitle}>{stat.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: THEME.spacing.MD,
  },
  sectionTitle: {
    ...THEME.typography.HEADING.SMALL,
    color: THEME.colors.TEXT.PRIMARY,
    marginBottom: THEME.spacing.MD,
    paddingHorizontal: THEME.spacing.MD,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: THEME.spacing.MD,
  },
  statCard: {
    width: '48%',
    backgroundColor: THEME.colors.SURFACE.PRIMARY,
    borderRadius: THEME.borderRadius.MD,
    padding: THEME.spacing.MD,
    marginBottom: THEME.spacing.MD,
    borderLeftWidth: 4,
    ...THEME.shadows.SM,
  },
  loadingCard: {
    borderLeftColor: THEME.colors.GRAY[300],
  },
  loadingShimmer: {
    height: 60,
    backgroundColor: THEME.colors.GRAY[200],
    borderRadius: THEME.borderRadius.SM,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.SM,
  },
  statIcon: {
    fontSize: 20,
  },
  changeText: {
    ...THEME.typography.CAPTION.SMALL,
    fontWeight: '600',
  },
  statValue: {
    ...THEME.typography.HEADING.MEDIUM,
    color: THEME.colors.TEXT.PRIMARY,
    marginBottom: THEME.spacing.XS,
  },
  statTitle: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
  },
});

export default QuickStats; 