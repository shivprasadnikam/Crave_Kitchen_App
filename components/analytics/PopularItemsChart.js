import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/globalStyles';
import { typography } from '../../styles/typography';

const { width: screenWidth } = Dimensions.get('window');

const PopularItemsChart = ({ 
  data, 
  type = 'sales', // 'sales', 'orders', 'revenue'
  period = 'week',
  onPeriodChange,
  onTypeChange,
  showImages = true,
  showRanking = true,
  maxItems = 10,
  height = 300,
  interactive = true 
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const periods = [
    { key: 'day', label: 'Day', icon: '📅' },
    { key: 'week', label: 'Week', icon: '📊' },
    { key: 'month', label: 'Month', icon: '📈' },
    { key: 'year', label: 'Year', icon: '📉' },
  ];

  const chartTypes = [
    { key: 'sales', label: 'Sales', icon: '💰' },
    { key: 'orders', label: 'Orders', icon: '📦' },
    { key: 'revenue', label: 'Revenue', icon: '💵' },
  ];

  const chartColors = [
    colors.primary,
    colors.secondary,
    colors.success,
    colors.warning,
    colors.error,
    colors.info,
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  const getMaxValue = () => {
    if (!data || data.length === 0) return 100;
    return Math.max(...data.map(item => item[type]));
  };

  const getBarWidth = (value) => {
    const max = getMaxValue();
    if (max === 0) return 0;
    const percentage = value / max;
    const maxWidth = screenWidth - 120; // Account for padding and labels
    return percentage * maxWidth;
  };

  const getItemValue = (item) => {
    switch (type) {
      case 'sales':
        return item.sales;
      case 'orders':
        return item.orders;
      case 'revenue':
        return item.revenue;
      default:
        return item.sales;
    }
  };

  const getItemLabel = (item) => {
    switch (type) {
      case 'sales':
        return `${formatNumber(item.sales)} sold`;
      case 'orders':
        return `${formatNumber(item.orders)} orders`;
      case 'revenue':
        return formatCurrency(item.revenue);
      default:
        return formatNumber(item.sales);
    }
  };

  const getItemSubLabel = (item) => {
    switch (type) {
      case 'sales':
        return `${formatCurrency(item.revenue)} revenue`;
      case 'orders':
        return `${formatNumber(item.sales)} sold`;
      case 'revenue':
        return `${formatNumber(item.sales)} sold`;
      default:
        return formatCurrency(item.revenue);
    }
  };

  const renderHorizontalBarChart = () => {
    if (!data || data.length === 0) {
      return (
        <View style={[styles.chartContainer, { height }]}>
          <Text style={styles.noDataText}>No popular items data available</Text>
        </View>
      );
    }

    const sortedData = [...data]
      .sort((a, b) => getItemValue(b) - getItemValue(a))
      .slice(0, maxItems);

    return (
      <View style={[styles.chartContainer, { height }]}>
        {sortedData.map((item, index) => {
          const value = getItemValue(item);
          const barWidth = getBarWidth(value);
          const barColor = chartColors[index % chartColors.length];
          const isSelected = selectedItem === item.id;
          const isHovered = hoveredItem === item.id;

          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.itemRow,
                isSelected && styles.selectedItemRow,
              ]}
              onPress={() => {
                if (interactive) {
                  setSelectedItem(isSelected ? null : item.id);
                }
              }}
              onPressIn={() => {
                if (interactive) {
                  setHoveredItem(item.id);
                }
              }}
              onPressOut={() => {
                if (interactive) {
                  setHoveredItem(null);
                }
              }}
              activeOpacity={0.7}
            >
              {/* Ranking */}
              {showRanking && (
                <View style={styles.rankingContainer}>
                  <Text style={[
                    styles.rankingText,
                    index < 3 && styles.topRankingText,
                  ]}>
                    #{index + 1}
                  </Text>
                </View>
              )}

              {/* Item Image */}
              {showImages && (
                <View style={styles.imageContainer}>
                  {item.image ? (
                    <Image source={{ uri: item.image }} style={styles.itemImage} />
                  ) : (
                    <View style={styles.imagePlaceholder}>
                      <Text style={styles.imagePlaceholderText}>🍽️</Text>
                    </View>
                  )}
                </View>
              )}

              {/* Item Info */}
              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.itemCategory}>
                  {item.category}
                </Text>
              </View>

              {/* Bar Chart */}
              <View style={styles.barContainer}>
                <View style={[
                  styles.bar,
                  {
                    width: barWidth,
                    backgroundColor: isSelected || isHovered 
                      ? colors.primary 
                      : barColor,
                    opacity: isSelected || isHovered ? 1 : 0.8,
                  }
                ]} />
                
                {/* Value Label */}
                <Text style={[
                  styles.valueLabel,
                  isSelected && styles.selectedValueLabel,
                ]}>
                  {getItemLabel(item)}
                </Text>
              </View>

              {/* Tooltip */}
              {(isSelected || isHovered) && (
                <View style={styles.tooltip}>
                  <Text style={styles.tooltipTitle}>{item.name}</Text>
                  <Text style={styles.tooltipValue}>
                    {getItemLabel(item)}
                  </Text>
                  <Text style={styles.tooltipSubValue}>
                    {getItemSubLabel(item)}
                  </Text>
                  <Text style={styles.tooltipRank}>
                    Rank #{index + 1}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderVerticalBarChart = () => {
    if (!data || data.length === 0) {
      return (
        <View style={[styles.chartContainer, { height }]}>
          <Text style={styles.noDataText}>No popular items data available</Text>
        </View>
      );
    }

    const sortedData = [...data]
      .sort((a, b) => getItemValue(b) - getItemValue(a))
      .slice(0, 5); // Show top 5 for vertical chart

    const maxValue = getMaxValue();
    const barWidth = (screenWidth - 100) / sortedData.length;

    return (
      <View style={[styles.chartContainer, { height }]}>
        <View style={styles.verticalBarsContainer}>
          {sortedData.map((item, index) => {
            const value = getItemValue(item);
            const barHeight = (value / maxValue) * (height - 80);
            const barColor = chartColors[index % chartColors.length];
            const isSelected = selectedItem === item.id;
            const isHovered = hoveredItem === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                style={styles.verticalBarContainer}
                onPress={() => {
                  if (interactive) {
                    setSelectedItem(isSelected ? null : item.id);
                  }
                }}
                onPressIn={() => {
                  if (interactive) {
                    setHoveredItem(item.id);
                  }
                }}
                onPressOut={() => {
                  if (interactive) {
                    setHoveredItem(null);
                  }
                }}
                activeOpacity={0.7}
              >
                {/* Bar */}
                <View style={[
                  styles.verticalBar,
                  {
                    width: barWidth - 8,
                    height: Math.max(20, barHeight),
                    backgroundColor: isSelected || isHovered 
                      ? colors.primary 
                      : barColor,
                    opacity: isSelected || isHovered ? 1 : 0.8,
                  }
                ]}>
                  {/* Value on bar */}
                  <Text style={styles.barValue}>
                    {formatNumber(value)}
                  </Text>
                </View>

                {/* Item name */}
                <Text style={styles.barItemName} numberOfLines={2}>
                  {item.name}
                </Text>

                {/* Tooltip */}
                {(isSelected || isHovered) && (
                  <View style={styles.verticalTooltip}>
                    <Text style={styles.tooltipTitle}>{item.name}</Text>
                    <Text style={styles.tooltipValue}>
                      {getItemLabel(item)}
                    </Text>
                    <Text style={styles.tooltipRank}>
                      Rank #{index + 1}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const renderPeriodSelector = () => (
    <View style={styles.periodSelector}>
      {periods.map((periodOption) => (
        <TouchableOpacity
          key={periodOption.key}
          style={[
            styles.periodButton,
            period === periodOption.key && styles.activePeriodButton,
          ]}
          onPress={() => onPeriodChange && onPeriodChange(periodOption.key)}
        >
          <Text style={styles.periodIcon}>{periodOption.icon}</Text>
          <Text style={[
            styles.periodLabel,
            period === periodOption.key && styles.activePeriodLabel,
          ]}>
            {periodOption.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderTypeSelector = () => (
    <View style={styles.typeSelector}>
      {chartTypes.map((typeOption) => (
        <TouchableOpacity
          key={typeOption.key}
          style={[
            styles.typeButton,
            type === typeOption.key && styles.activeTypeButton,
          ]}
          onPress={() => onTypeChange && onTypeChange(typeOption.key)}
        >
          <Text style={styles.typeIcon}>{typeOption.icon}</Text>
          <Text style={[
            styles.typeLabel,
            type === typeOption.key && styles.activeTypeLabel,
          ]}>
            {typeOption.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderSummary = () => {
    if (!data || data.length === 0) return null;

    const totalValue = data.reduce((sum, item) => sum + getItemValue(item), 0);
    const topItem = data.reduce((max, item) => 
      getItemValue(item) > getItemValue(max) ? item : max
    );

    return (
      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total {type}</Text>
          <Text style={styles.summaryValue}>
            {type === 'revenue' ? formatCurrency(totalValue) : formatNumber(totalValue)}
          </Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Top Item</Text>
          <Text style={styles.summaryValue} numberOfLines={1}>
            {topItem.name}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderPeriodSelector()}
      {renderTypeSelector()}
      {renderSummary()}
      {renderHorizontalBarChart()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    ...globalStyles.shadow,
  },
  periodSelector: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  activePeriodButton: {
    backgroundColor: colors.primary,
  },
  periodIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  periodLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
    fontSize: 10,
  },
  activePeriodLabel: {
    color: colors.white,
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 4,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  activeTypeButton: {
    backgroundColor: colors.secondary,
  },
  typeIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  typeLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeTypeLabel: {
    color: colors.white,
  },
  summary: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  summaryItem: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  summaryLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  summaryValue: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  chartContainer: {
    gap: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.background,
    position: 'relative',
  },
  selectedItemRow: {
    backgroundColor: colors.primary + '20',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  rankingContainer: {
    width: 30,
    alignItems: 'center',
    marginRight: 8,
  },
  rankingText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  topRankingText: {
    color: colors.warning,
    fontWeight: '700',
  },
  imageContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 20,
  },
  itemInfo: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  itemCategory: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 80,
  },
  bar: {
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  valueLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
    minWidth: 60,
    textAlign: 'right',
  },
  selectedValueLabel: {
    color: colors.primary,
  },
  verticalBarsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
    paddingTop: 20,
    paddingBottom: 60,
  },
  verticalBarContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  verticalBar: {
    borderRadius: 4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 4,
  },
  barValue: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '600',
    fontSize: 10,
  },
  barItemName: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    fontSize: 10,
  },
  tooltip: {
    position: 'absolute',
    top: -80,
    right: 0,
    backgroundColor: colors.textPrimary,
    padding: 8,
    borderRadius: 6,
    minWidth: 120,
    zIndex: 1000,
  },
  verticalTooltip: {
    position: 'absolute',
    top: -60,
    left: -40,
    backgroundColor: colors.textPrimary,
    padding: 8,
    borderRadius: 6,
    minWidth: 100,
    alignItems: 'center',
    zIndex: 1000,
  },
  tooltipTitle: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '600',
    marginBottom: 2,
  },
  tooltipValue: {
    ...typography.caption,
    color: colors.white,
    marginBottom: 2,
  },
  tooltipSubValue: {
    ...typography.caption,
    color: colors.white,
    opacity: 0.8,
    marginBottom: 2,
  },
  tooltipRank: {
    ...typography.caption,
    color: colors.white,
    opacity: 0.6,
  },
  noDataText: {
    ...typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default PopularItemsChart; 