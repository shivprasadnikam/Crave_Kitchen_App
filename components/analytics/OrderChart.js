import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { THEME } from '../../styles/theme';

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
    pending: THEME.colors.WARNING.MAIN,
    accepted: THEME.colors.INFO.MAIN,
    preparing: THEME.colors.PRIMARY.MAIN,
    ready: THEME.colors.SUCCESS.MAIN,
    delivered: THEME.colors.SUCCESS.MAIN,
    completed: THEME.colors.SUCCESS.MAIN,
    cancelled: THEME.colors.ERROR.MAIN,
    rejected: THEME.colors.ERROR.MAIN,
  };

  const categoryColors = [
    THEME.colors.PRIMARY.MAIN,
    THEME.colors.SECONDARY.MAIN,
    THEME.colors.SUCCESS.MAIN,
    THEME.colors.WARNING.MAIN,
    THEME.colors.ERROR.MAIN,
    THEME.colors.INFO.MAIN,
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
      return statusColors[item.status] || THEME.colors.PRIMARY.MAIN;
    } else if (type === 'category') {
      return categoryColors[index % categoryColors.length];
    }
    return THEME.colors.PRIMARY.MAIN;
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
                        ? THEME.colors.PRIMARY.MAIN 
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
                      ? THEME.colors.PRIMARY.MAIN 
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
                  backgroundColor: isSelected ? THEME.colors.PRIMARY.MAIN : barColor 
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
  chartContainer: {
    flexDirection: 'row',
    position: 'relative',
  },
  yAxis: {
    width: 40,
    justifyContent: 'space-between',
    paddingRight: THEME.spacing.SM,
  },
  yAxisLabel: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
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
    backgroundColor: THEME.colors.BORDER.PRIMARY,
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
    borderRadius: THEME.borderRadius.XS,
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
    ...THEME.typography.HEADING.MEDIUM,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '600',
  },
  centerLabelText: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
  },
  tooltip: {
    position: 'absolute',
    bottom: 20,
    left: -30,
    backgroundColor: THEME.colors.TEXT.PRIMARY,
    paddingHorizontal: THEME.spacing.SM,
    paddingVertical: THEME.spacing.XS,
    borderRadius: THEME.borderRadius.SM,
    minWidth: 80,
    alignItems: 'center',
  },
  pieTooltip: {
    position: 'absolute',
    top: -60,
    left: -40,
    backgroundColor: THEME.colors.TEXT.PRIMARY,
    paddingHorizontal: THEME.spacing.SM,
    paddingVertical: THEME.spacing.XS,
    borderRadius: THEME.borderRadius.SM,
    minWidth: 100,
    alignItems: 'center',
  },
  tooltipValue: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.NEUTRAL.WHITE,
    fontWeight: '600',
  },
  tooltipLabel: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.NEUTRAL.WHITE,
    opacity: 0.8,
  },
  tooltipPercentage: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.NEUTRAL.WHITE,
    opacity: 0.6,
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: THEME.spacing.SM,
  },
  xAxisLabel: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    textAlign: 'center',
    flex: 1,
    fontSize: 10,
  },
  legend: {
    marginTop: THEME.spacing.MD,
    gap: THEME.spacing.SM,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: THEME.spacing.XS,
    paddingHorizontal: THEME.spacing.SM,
    borderRadius: THEME.borderRadius.SM,
  },
  selectedLegendItem: {
    backgroundColor: THEME.colors.PRIMARY.MAIN + '20',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: THEME.spacing.SM,
  },
  legendText: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    flex: 1,
  },
  selectedLegendText: {
    color: THEME.colors.PRIMARY.MAIN,
    fontWeight: '600',
  },
  noDataText: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default OrderChart; 