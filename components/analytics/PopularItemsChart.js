import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { THEME } from '../../styles/theme';

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
    THEME.colors.PRIMARY.MAIN,
    THEME.colors.SECONDARY.MAIN,
    THEME.colors.SUCCESS.MAIN,
    THEME.colors.WARNING.MAIN,
    THEME.colors.ERROR.MAIN,
    THEME.colors.INFO.MAIN,
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
                      ? THEME.colors.PRIMARY.MAIN 
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
                      ? THEME.colors.PRIMARY.MAIN 
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
    backgroundColor: THEME.colors.SURFACE.PRIMARY,
    borderRadius: THEME.borderRadius.MD,
    padding: THEME.spacing.MD,
    ...THEME.shadows.SM,
  },
  periodSelector: {
    flexDirection: 'row',
    marginBottom: THEME.spacing.MD,
    backgroundColor: THEME.colors.SURFACE.SECONDARY,
    borderRadius: THEME.borderRadius.SM,
    padding: THEME.spacing.XS,
  },
  periodButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: THEME.spacing.SM,
    paddingHorizontal: THEME.spacing.SM,
    borderRadius: THEME.borderRadius.SM,
  },
  activePeriodButton: {
    backgroundColor: THEME.colors.PRIMARY.MAIN,
  },
  periodIcon: {
    fontSize: 14,
    marginRight: THEME.spacing.XS,
  },
  periodLabel: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    fontWeight: '500',
    fontSize: 10,
  },
  activePeriodLabel: {
    color: THEME.colors.NEUTRAL.WHITE,
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: THEME.spacing.MD,
    backgroundColor: THEME.colors.SURFACE.SECONDARY,
    borderRadius: THEME.borderRadius.SM,
    padding: THEME.spacing.XS,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: THEME.spacing.SM,
    paddingHorizontal: THEME.spacing.MD,
    borderRadius: THEME.borderRadius.SM,
  },
  activeTypeButton: {
    backgroundColor: THEME.colors.SECONDARY.MAIN,
  },
  typeIcon: {
    fontSize: 16,
    marginRight: THEME.spacing.XS,
  },
  typeLabel: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    fontWeight: '500',
  },
  activeTypeLabel: {
    color: THEME.colors.NEUTRAL.WHITE,
  },
  summary: {
    flexDirection: 'row',
    marginBottom: THEME.spacing.MD,
    gap: THEME.spacing.MD,
  },
  summaryItem: {
    flex: 1,
    backgroundColor: THEME.colors.SURFACE.SECONDARY,
    borderRadius: THEME.borderRadius.SM,
    padding: THEME.spacing.MD,
    alignItems: 'center',
  },
  summaryLabel: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    marginBottom: THEME.spacing.XS,
  },
  summaryValue: {
    ...THEME.typography.BODY.MEDIUM,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '600',
  },
  chartContainer: {
    gap: THEME.spacing.SM,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: THEME.spacing.SM,
    paddingHorizontal: THEME.spacing.MD,
    borderRadius: THEME.borderRadius.SM,
    backgroundColor: THEME.colors.SURFACE.SECONDARY,
    position: 'relative',
  },
  selectedItemRow: {
    backgroundColor: THEME.colors.PRIMARY.MAIN + '20',
    borderWidth: 1,
    borderColor: THEME.colors.PRIMARY.MAIN,
  },
  rankingContainer: {
    width: 30,
    alignItems: 'center',
    marginRight: THEME.spacing.SM,
  },
  rankingText: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    fontWeight: '600',
  },
  topRankingText: {
    color: THEME.colors.WARNING.MAIN,
    fontWeight: '700',
  },
  imageContainer: {
    width: 40,
    height: 40,
    borderRadius: THEME.borderRadius.SM,
    overflow: 'hidden',
    marginRight: THEME.spacing.MD,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: THEME.colors.BORDER.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 20,
  },
  itemInfo: {
    flex: 1,
    marginRight: THEME.spacing.MD,
  },
  itemName: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '600',
    marginBottom: THEME.spacing.XS,
  },
  itemCategory: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 80,
  },
  bar: {
    height: 8,
    borderRadius: THEME.borderRadius.XS,
    marginRight: THEME.spacing.SM,
  },
  valueLabel: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    fontWeight: '600',
    minWidth: 60,
    textAlign: 'right',
  },
  selectedValueLabel: {
    color: THEME.colors.PRIMARY.MAIN,
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
    borderRadius: THEME.borderRadius.XS,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: THEME.spacing.XS,
  },
  barValue: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.NEUTRAL.WHITE,
    fontWeight: '600',
    fontSize: 10,
  },
  barItemName: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    textAlign: 'center',
    marginTop: THEME.spacing.SM,
    fontSize: 10,
  },
  tooltip: {
    position: 'absolute',
    top: -80,
    right: 0,
    backgroundColor: THEME.colors.TEXT.PRIMARY,
    padding: THEME.spacing.SM,
    borderRadius: THEME.borderRadius.SM,
    minWidth: 120,
    zIndex: 1000,
  },
  verticalTooltip: {
    position: 'absolute',
    top: -60,
    left: -40,
    backgroundColor: THEME.colors.TEXT.PRIMARY,
    padding: THEME.spacing.SM,
    borderRadius: THEME.borderRadius.SM,
    minWidth: 100,
    alignItems: 'center',
    zIndex: 1000,
  },
  tooltipTitle: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.NEUTRAL.WHITE,
    fontWeight: '600',
    marginBottom: THEME.spacing.XS,
  },
  tooltipValue: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.NEUTRAL.WHITE,
    marginBottom: THEME.spacing.XS,
  },
  tooltipSubValue: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.NEUTRAL.WHITE,
    opacity: 0.8,
    marginBottom: THEME.spacing.XS,
  },
  tooltipRank: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.NEUTRAL.WHITE,
    opacity: 0.6,
  },
  noDataText: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default PopularItemsChart; 