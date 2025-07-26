import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/globalStyles';
import { typography } from '../../styles/typography';

const { width: screenWidth } = Dimensions.get('window');

const OrderChart = ({ 
  data, 
  type = 'count', // 'count', 'status', 'category'
  period = 'week',
  onPeriodChange,
  onTypeChange,
  showLegend = true,
  showGrid = true,
  height = 200,
  interactive = true 
}) => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const periods = [
    { key: 'day', label: 'Day', icon: '📅' },
    { key: 'week', label: 'Week', icon: '📊' },
    { key: 'month', label: 'Month', icon: '📈' },
    { key: 'year', label: 'Year', icon: '📉' },
  ];

  const chartTypes = [
    { key: 'count', label: 'Order Count', icon: '📦' },
    { key: 'status', label: 'Order Status', icon: '🔄' },
    { key: 'category', label: 'Category', icon: '🍽️' },
  ];

  const statusColors = {
    pending: colors.warning,
    accepted: colors.info,
    preparing: colors.primary,
    ready: colors.success,
    delivered: colors.success,
    completed: colors.success,
    cancelled: colors.error,
    rejected: colors.error,
  };

  const categoryColors = [
    colors.primary,
    colors.secondary,
    colors.success,
    colors.warning,
    colors.error,
    colors.info,
  ];

  const formatNumber = (num) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  const formatDate = (date, periodType) => {
    const dateObj = new Date(date);
    switch (periodType) {
      case 'day':
        return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      case 'week':
        return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      case 'month':
        return dateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      case 'year':
        return dateObj.getFullYear().toString();
      default:
        return dateObj.toLocaleDateString();
    }
  };

  const getMaxValue = () => {
    if (!data || data.length === 0) return 10;
    
    if (type === 'count') {
      return Math.max(...data.map(item => item.count));
    } else if (type === 'status') {
      return Math.max(...data.map(item => item.count));
    } else if (type === 'category') {
      return Math.max(...data.map(item => item.count));
    }
    return 10;
  };

  const getYAxisLabels = () => {
    const max = getMaxValue();
    const step = max / 4;
    
    return Array.from({ length: 5 }, (_, i) => {
      const value = Math.round(step * i);
      return formatNumber(value);
    });
  };

  const getBarWidth = () => {
    const chartWidth = screenWidth - 80;
    const barCount = data?.length || 1;
    const spacing = 8;
    return Math.max(20, (chartWidth - (spacing * (barCount - 1))) / barCount);
  };

  const getBarHeight = (value) => {
    const max = getMaxValue();
    if (max === 0) return 0;
    return (value / max) * (height - 60);
  };

  const getBarColor = (item, index) => {
    if (type === 'status') {
      return statusColors[item.status] || colors.primary;
    } else if (type === 'category') {
      return categoryColors[index % categoryColors.length];
    }
    return colors.primary;
  };

  const renderBarChart = () => {
    if (!data || data.length === 0) {
      return (
        <View style={[styles.chartContainer, { height }]}>
          <Text style={styles.noDataText}>No order data available</Text>
        </View>
      );
    }

    const barWidth = getBarWidth();

    return (
      <View style={[styles.chartContainer, { height }]}>
        {/* Y-Axis Labels */}
        <View style={styles.yAxis}>
          {getYAxisLabels().map((label, index) => (
            <Text key={index} style={styles.yAxisLabel}>
              {label}
            </Text>
          ))}
        </View>

        {/* Chart Area */}
        <View style={styles.chartArea}>
          {/* Grid Lines */}
          {showGrid && (
            <View style={styles.gridContainer}>
              {Array.from({ length: 5 }, (_, i) => (
                <View
                  key={i}
                  style={[
                    styles.gridLine,
                    {
                      top: (i * (height - 60)) / 4 + 30,
                    }
                  ]}
                />
              ))}
            </View>
          )}

          {/* Bars */}
          <View style={styles.barsContainer}>
            {data.map((item, index) => {
              const barHeight = getBarHeight(item.count);
              const barColor = getBarColor(item, index);
              const isSelected = selectedPoint === index;
              const isHovered = hoveredPoint === index;

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.bar,
                    {
                      width: barWidth,
                      height: Math.max(4, barHeight),
                      backgroundColor: isSelected || isHovered 
                        ? colors.primary 
                        : barColor,
                      opacity: isSelected || isHovered ? 1 : 0.8,
                    }
                  ]}
                  onPress={() => {
                    if (interactive) {
                      setSelectedPoint(isSelected ? null : index);
                    }
                  }}
                  onPressIn={() => {
                    if (interactive) {
                      setHoveredPoint(index);
                    }
                  }}
                  onPressOut={() => {
                    if (interactive) {
                      setHoveredPoint(null);
                    }
                  }}
                  activeOpacity={0.7}
                >
                  {/* Tooltip */}
                  {(isSelected || isHovered) && (
                    <View style={styles.tooltip}>
                      <Text style={styles.tooltipValue}>
                        {item.count} orders
                      </Text>
                      <Text style={styles.tooltipLabel}>
                        {type === 'status' ? item.status : 
                         type === 'category' ? item.category : 
                         formatDate(item.date, period)}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* X-Axis Labels */}
        <View style={styles.xAxis}>
          {data.map((item, index) => (
            <Text key={index} style={styles.xAxisLabel}>
              {type === 'status' ? item.status : 
               type === 'category' ? item.category : 
               formatDate(item.date, period)}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  const renderPieChart = () => {
    if (!data || data.length === 0) {
      return (
        <View style={[styles.chartContainer, { height }]}>
          <Text style={styles.noDataText}>No order data available</Text>
        </View>
      );
    }

    const total = data.reduce((sum, item) => sum + item.count, 0);
    const centerX = (screenWidth - 80) / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 40;

    let currentAngle = 0;

    return (
      <View style={[styles.chartContainer, { height }]}>
        <View style={styles.pieChartContainer}>
          {/* Pie Slices */}
          {data.map((item, index) => {
            const percentage = total > 0 ? item.count / total : 0;
            const sliceAngle = percentage * 2 * Math.PI;
            const barColor = getBarColor(item, index);
            const isSelected = selectedPoint === index;
            const isHovered = hoveredPoint === index;

            const startAngle = currentAngle;
            const endAngle = currentAngle + sliceAngle;
            currentAngle = endAngle;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.pieSlice,
                  {
                    position: 'absolute',
                    left: centerX - radius,
                    top: centerY - radius,
                    width: radius * 2,
                    height: radius * 2,
                    borderRadius: radius,
                    backgroundColor: isSelected || isHovered 
                      ? colors.primary 
                      : barColor,
                    opacity: isSelected || isHovered ? 1 : 0.8,
                  }
                ]}
                onPress={() => {
                  if (interactive) {
                    setSelectedPoint(isSelected ? null : index);
                  }
                }}
                onPressIn={() => {
                  if (interactive) {
                    setHoveredPoint(index);
                  }
                }}
                onPressOut={() => {
                  if (interactive) {
                    setHoveredPoint(null);
                  }
                }}
                activeOpacity={0.7}
              >
                {/* Tooltip */}
                {(isSelected || isHovered) && (
                  <View style={styles.pieTooltip}>
                    <Text style={styles.tooltipValue}>
                      {item.count} orders
                    </Text>
                    <Text style={styles.tooltipLabel}>
                      {type === 'status' ? item.status : 
                       type === 'category' ? item.category : 
                       formatDate(item.date, period)}
                    </Text>
                    <Text style={styles.tooltipPercentage}>
                      {Math.round(percentage * 100)}%
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}

          {/* Center Label */}
          <View style={styles.centerLabel}>
            <Text style={styles.centerLabelValue}>{total}</Text>
            <Text style={styles.centerLabelText}>Total Orders</Text>
          </View>
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

  const renderLegend = () => {
    if (!showLegend) return null;

    return (
      <View style={styles.legend}>
        {data.map((item, index) => {
          const barColor = getBarColor(item, index);
          const isSelected = selectedPoint === index;

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.legendItem,
                isSelected && styles.selectedLegendItem,
              ]}
              onPress={() => {
                if (interactive) {
                  setSelectedPoint(isSelected ? null : index);
                }
              }}
            >
              <View style={[
                styles.legendColor, 
                { 
                  backgroundColor: isSelected ? colors.primary : barColor 
                }
              ]} />
              <Text style={[
                styles.legendText,
                isSelected && styles.selectedLegendText,
              ]}>
                {type === 'status' ? item.status : 
                 type === 'category' ? item.category : 
                 formatDate(item.date, period)} ({item.count})
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderPeriodSelector()}
      {renderTypeSelector()}
      {type === 'category' ? renderPieChart() : renderBarChart()}
      {renderLegend()}
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
  chartContainer: {
    flexDirection: 'row',
    position: 'relative',
  },
  yAxis: {
    width: 40,
    justifyContent: 'space-between',
    paddingRight: 8,
  },
  yAxisLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'right',
    fontSize: 10,
  },
  chartArea: {
    flex: 1,
    position: 'relative',
  },
  gridContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colors.border,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
    paddingTop: 30,
    paddingBottom: 30,
  },
  bar: {
    borderRadius: 4,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  pieChartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  pieSlice: {
    position: 'absolute',
  },
  centerLabel: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerLabelValue: {
    ...typography.h2,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  centerLabelText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  tooltip: {
    position: 'absolute',
    bottom: 20,
    left: -30,
    backgroundColor: colors.textPrimary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  pieTooltip: {
    position: 'absolute',
    top: -60,
    left: -40,
    backgroundColor: colors.textPrimary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    minWidth: 100,
    alignItems: 'center',
  },
  tooltipValue: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '600',
  },
  tooltipLabel: {
    ...typography.caption,
    color: colors.white,
    opacity: 0.8,
  },
  tooltipPercentage: {
    ...typography.caption,
    color: colors.white,
    opacity: 0.6,
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  xAxisLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    flex: 1,
    fontSize: 10,
  },
  legend: {
    marginTop: 16,
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  selectedLegendItem: {
    backgroundColor: colors.primary + '20',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    ...typography.caption,
    color: colors.textSecondary,
    flex: 1,
  },
  selectedLegendText: {
    color: colors.primary,
    fontWeight: '600',
  },
  noDataText: {
    ...typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default OrderChart; 