import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AnalyticsDashboardScreen = () => {
  const navigation = useNavigation();

  const analyticsCards = [
    {
      id: '1',
      title: 'Revenue Analytics',
      description: 'Track your sales and revenue trends',
      icon: '💰',
      screen: 'RevenueAnalytics',
    },
    {
      id: '2',
      title: 'Order Analytics',
      description: 'Analyze order patterns and performance',
      icon: '📊',
      screen: 'OrderAnalytics',
    },
    {
      id: '3',
      title: 'Customer Analytics',
      description: 'Understand your customer behavior',
      icon: '👥',
      screen: 'CustomerAnalytics',
    },
    {
      id: '4',
      title: 'Popular Items',
      description: 'See your best-selling menu items',
      icon: '🍽️',
      screen: 'PopularItems',
    },
  ];

  const renderAnalyticsCard = (card) => (
    <TouchableOpacity
      key={card.id}
      style={styles.analyticsCard}
      onPress={() => navigation.navigate(card.screen)}
    >
      <Text style={styles.cardIcon}>{card.icon}</Text>
      <Text style={styles.cardTitle}>{card.title}</Text>
      <Text style={styles.cardDescription}>{card.description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Analytics Dashboard</Text>
          <Text style={styles.headerSubtitle}>Track your business performance</Text>
        </View>

        {/* Analytics Cards */}
        <View style={styles.content}>
          <View style={styles.analyticsGrid}>
            {analyticsCards.map(renderAnalyticsCard)}
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Quick Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>$2,450</Text>
              <Text style={styles.statLabel}>Today's Revenue</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>45</Text>
              <Text style={styles.statLabel}>Orders Today</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>New Customers</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>4.8★</Text>
              <Text style={styles.statLabel}>Avg Rating</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
  },
  content: {
    padding: 20,
  },
  analyticsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  cardArrow: {
    alignSelf: 'flex-end',
  },
  arrowText: {
    fontSize: 20,
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  statsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    width: '47%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
});

export default AnalyticsDashboardScreen;
