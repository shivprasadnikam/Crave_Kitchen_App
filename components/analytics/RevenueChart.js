import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { THEME } from '../../styles/theme';

const { width: screenWidth } = Dimensions.get('window');

const RevenueChart = ({ 
  data, 
  period = 'week',
  onPeriodChange,
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

  const chartColors = {
    primary: THEME.colors.PRIMARY.MAIN,
    secondary: THEME.colors.SECONDARY.MAIN,
    success: THEME.colors.SUCCESS.MAIN,
    warning: THEME.colors.WARNING.MAIN,
    error: THEME.colors.ERROR.MAIN,
  };

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
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
    if (!data || data.length === 0) return 100;
    return Math.max(...data.map(item => item.revenue));
  };

  const getMinValue = () => {
    if (!data || data.length === 0) return 0;
    return Math.min(...data.map(item => item.revenue));
  };

  const getYAxisLabels = () => {
    const max = getMaxValue();
    const min = getMinValue();
    const range = max - min;
    const step = range / 4;
    
    return Array.from({ length: 5 }, (_, i) => {
      const value = min + (step * i);
      return formatCurrency(value);
    });
  };

  const getBarWidth = () => {
    const chartWidth = screenWidth - 80; // Account for padding and margins
    const barCount = data?.length || 1;
    const spacing = 8;
    return Math.max(20, (chartWidth - (spacing * (barCount - 1))) / barCount);
  };

  const getBarHeight = (value) => {
    const max = getMaxValue();
    const min = getMinValue();
    const range = max - min;
    if (range === 0) return 0;
    return ((value - min) / range) * (height - 60); // Account for padding
  };

  const renderBarChart = () => {
    if (!data || data.length === 0) {
      return (
        <View style={[styles.chartContainer, { height }]}>
          <Text style={styles.noDataText}>No revenue data available</Text>
        </View>
      );
    }

    const barWidth = getBarWidth();
    const maxValue = getMaxValue();

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
              const barHeight = getBarHeight(item.revenue);
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
                        ? chartColors.primary 
                        : chartColors.success,
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
                        {formatCurrency(item.revenue)}
                      </Text>
                      <Text style={styles.tooltipDate}>
                        {formatDate(item.date, period)}
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
              {formatDate(item.date, period)}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  const renderLineChart = () => {
    if (!data || data.length === 0) {
      return (
        <View style={[styles.chartContainer, { height }]}>
          <Text style={styles.noDataText}>No revenue data available</Text>
        </View>
      );
    }

    const chartWidth = screenWidth - 80;
    const pointSpacing = chartWidth / (data.length - 1);
    const maxValue = getMaxValue();
    const minValue = getMinValue();
    const range = maxValue - minValue;

    const getPointPosition = (value, index) => {
      const x = index * pointSpacing;
      const y = height - 60 - ((value - minValue) / range) * (height - 60);
      return { x, y };
    };

    const points = data.map((item, index) => 
      getPointPosition(item.revenue, index)
    );

    // Create path for line
    const pathData = points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ');

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

          {/* Line Chart */}
          <View style={styles.lineChartContainer}>
            {/* Line */}
            <View style={styles.linePath}>
              {points.map((point, index) => {
                if (index === 0) return null;
                const prevPoint = points[index - 1];
                return (
                  <View
                    key={index}
                    style={[
                      styles.lineSegment,
                      {
                        left: prevPoint.x,
                        top: prevPoint.y,
                        width: point.x - prevPoint.x,
                        height: 2,
                        backgroundColor: chartColors.primary,
                        transform: [
                          {
                            rotate: `${Math.atan2(
                              point.y - prevPoint.y,
                              point.x - prevPoint.x
                            )}rad`
                          }
                        ],
                      }
                    ]}
                  />
                );
              })}
            </View>

            {/* Points */}
            {points.map((point, index) => {
              const isSelected = selectedPoint === index;
              const isHovered = hoveredPoint === index;

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dataPoint,
                    {
                      left: point.x - 6,
                      top: point.y - 6,
                      backgroundColor: isSelected || isHovered 
                        ? chartColors.primary 
                        : chartColors.success,
                      borderColor: THEME.colors.NEUTRAL.WHITE,
                      borderWidth: isSelected || isHovered ? 3 : 2,
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
                        {formatCurrency(data[index].revenue)}
                      </Text>
                      <Text style={styles.tooltipDate}>
                        {formatDate(data[index].date, period)}
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
              {formatDate(item.date, period)}
            </Text>
          ))}
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

  const renderLegend = () => {
    if (!showLegend) return null;

    return (
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: chartColors.success }]} />
          <Text style={styles.legendText}>Revenue</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: chartColors.primary }]} />
          <Text style={styles.legendText}>Selected</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderPeriodSelector()}
      {renderBarChart()}
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
    paddingHorizontal: THEME.spacing.MD,
    borderRadius: THEME.borderRadius.SM,
  },
  activePeriodButton: {
    backgroundColor: THEME.colors.PRIMARY.MAIN,
  },
  periodIcon: {
    fontSize: 16,
    marginRight: THEME.spacing.XS,
  },
  periodLabel: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    fontWeight: '500',
  },
  activePeriodLabel: {
    color: THEME.colors.NEUTRAL.WHITE,
  },
  chartContainer: {
    flexDirection: 'row',
    position: 'relative',
  },
  yAxis: {
    width: 60,
    justifyContent: 'space-between',
    paddingRight: THEME.spacing.SM,
  },
  yAxisLabel: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    textAlign: 'right',
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
  lineChartContainer: {
    position: 'relative',
    height: '100%',
    paddingTop: 30,
    paddingBottom: 30,
  },
  linePath: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 30,
    bottom: 30,
  },
  lineSegment: {
    position: 'absolute',
    transformOrigin: 'left center',
  },
  dataPoint: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    position: 'relative',
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
  tooltipValue: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.NEUTRAL.WHITE,
    fontWeight: '600',
  },
  tooltipDate: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.NEUTRAL.WHITE,
    opacity: 0.8,
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
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: THEME.spacing.MD,
    gap: THEME.spacing.MD,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: THEME.spacing.XS,
  },
  legendText: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
  },
  noDataText: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default RevenueChart; 