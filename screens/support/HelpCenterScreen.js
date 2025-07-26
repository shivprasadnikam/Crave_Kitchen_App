import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/globalStyles';
import { typography } from '../../styles/typography';
import Header from '../../components/common/Header';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const HelpCenterScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const helpCategories = [
    {
      key: 'getting-started',
      title: 'Getting Started',
      icon: '🚀',
      description: 'Learn the basics of using Crave Kitchen',
      color: colors.primary,
    },
    {
      key: 'orders',
      title: 'Managing Orders',
      icon: '📋',
      description: 'How to handle orders and customer requests',
      color: colors.success,
    },
    {
      key: 'menu',
      title: 'Menu Management',
      icon: '🍽️',
      description: 'Create and manage your menu items',
      color: colors.warning,
    },
    {
      key: 'payments',
      title: 'Payments & Payouts',
      icon: '💰',
      description: 'Payment processing and payout information',
      color: colors.info,
    },
    {
      key: 'analytics',
      title: 'Analytics & Reports',
      icon: '📊',
      description: 'Understanding your business metrics',
      color: colors.secondary,
    },
    {
      key: 'inventory',
      title: 'Inventory Management',
      icon: '📦',
      description: 'Track and manage your inventory',
      color: colors.error,
    },
    {
      key: 'settings',
      title: 'Account Settings',
      icon: '⚙️',
      description: 'Manage your account and preferences',
      color: colors.textSecondary,
    },
    {
      key: 'troubleshooting',
      title: 'Troubleshooting',
      icon: '🔧',
      description: 'Common issues and solutions',
      color: colors.warning,
    },
  ];

  const helpArticles = [
    {
      id: '1',
      category: 'getting-started',
      title: 'How to Set Up Your Restaurant Profile',
      description: 'Complete guide to setting up your restaurant profile and getting started',
      readTime: '5 min read',
      difficulty: 'Beginner',
    },
    {
      id: '2',
      category: 'getting-started',
      title: 'Understanding the Dashboard',
      description: 'Learn how to navigate and use the main dashboard effectively',
      readTime: '3 min read',
      difficulty: 'Beginner',
    },
    {
      id: '3',
      category: 'orders',
      title: 'Accepting and Managing Orders',
      description: 'Step-by-step guide to accepting and managing incoming orders',
      readTime: '7 min read',
      difficulty: 'Intermediate',
    },
    {
      id: '4',
      category: 'orders',
      title: 'Handling Order Modifications',
      description: 'How to handle customer requests for order changes',
      readTime: '4 min read',
      difficulty: 'Intermediate',
    },
    {
      id: '5',
      category: 'menu',
      title: 'Creating Your First Menu Item',
      description: 'Learn how to add items to your menu with photos and descriptions',
      readTime: '6 min read',
      difficulty: 'Beginner',
    },
    {
      id: '6',
      category: 'menu',
      title: 'Managing Menu Categories',
      description: 'Organize your menu with categories and subcategories',
      readTime: '4 min read',
      difficulty: 'Beginner',
    },
    {
      id: '7',
      category: 'payments',
      title: 'Understanding Payment Processing',
      description: 'How payments work and when you receive your money',
      readTime: '8 min read',
      difficulty: 'Intermediate',
    },
    {
      id: '8',
      category: 'payments',
      title: 'Setting Up Payout Methods',
      description: 'Configure your preferred payout methods and schedules',
      readTime: '5 min read',
      difficulty: 'Intermediate',
    },
    {
      id: '9',
      category: 'analytics',
      title: 'Reading Your Analytics Dashboard',
      description: 'Understanding key metrics and business insights',
      readTime: '10 min read',
      difficulty: 'Advanced',
    },
    {
      id: '10',
      category: 'inventory',
      title: 'Setting Up Inventory Tracking',
      description: 'Configure inventory tracking for your ingredients and supplies',
      readTime: '6 min read',
      difficulty: 'Intermediate',
    },
    {
      id: '11',
      category: 'settings',
      title: 'Configuring Operating Hours',
      description: 'Set your business hours and availability settings',
      readTime: '4 min read',
      difficulty: 'Beginner',
    },
    {
      id: '12',
      category: 'troubleshooting',
      title: 'Common App Issues and Solutions',
      description: 'Solutions for frequently encountered problems',
      readTime: '8 min read',
      difficulty: 'All Levels',
    },
  ];

  const quickActions = [
    {
      title: 'Contact Support',
      icon: '📞',
      action: () => navigation.navigate('ContactSupport'),
      color: colors.primary,
    },
    {
      title: 'FAQ',
      icon: '❓',
      action: () => navigation.navigate('FAQ'),
      color: colors.info,
    },
    {
      title: 'Video Tutorials',
      icon: '🎥',
      action: () => Alert.alert('Coming Soon', 'Video tutorials will be available soon!'),
      color: colors.success,
    },
    {
      title: 'Live Chat',
      icon: '💬',
      action: () => Alert.alert('Coming Soon', 'Live chat support will be available soon!'),
      color: colors.warning,
    },
  ];

  useEffect(() => {
    loadHelpCenter();
  }, []);

  const loadHelpCenter = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const getFilteredArticles = () => {
    let filtered = helpArticles;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return colors.success;
      case 'Intermediate': return colors.warning;
      case 'Advanced': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const handleArticlePress = (article) => {
    Alert.alert(
      'Article Preview',
      `Title: ${article.title}\n\nDescription: ${article.description}\n\nRead Time: ${article.readTime}\nDifficulty: ${article.difficulty}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Read Full Article', onPress: () => Alert.alert('Coming Soon', 'Full article view will be available soon!') },
      ]
    );
  };

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search help articles..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor={colors.textSecondary}
      />
    </View>
  );

  const renderCategoryTabs = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoryContainer}
      contentContainerStyle={styles.categoryContent}
    >
      <TouchableOpacity
        style={[styles.categoryTab, selectedCategory === 'all' && styles.activeCategoryTab]}
        onPress={() => setSelectedCategory('all')}
      >
        <Text style={styles.categoryTabText}>All Topics</Text>
      </TouchableOpacity>
      {helpCategories.map((category) => (
        <TouchableOpacity
          key={category.key}
          style={[styles.categoryTab, selectedCategory === category.key && styles.activeCategoryTab]}
          onPress={() => setSelectedCategory(category.key)}
        >
          <Text style={styles.categoryTabText}>{category.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderQuickActions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActionsGrid}>
        {quickActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.quickActionCard, { borderLeftColor: action.color }]}
            onPress={action.action}
          >
            <Text style={styles.quickActionIcon}>{action.icon}</Text>
            <Text style={styles.quickActionTitle}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderHelpCategories = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Help Categories</Text>
      <View style={styles.categoriesGrid}>
        {helpCategories.map((category) => (
          <TouchableOpacity
            key={category.key}
            style={styles.categoryCard}
            onPress={() => setSelectedCategory(category.key)}
          >
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryTitle}>{category.title}</Text>
            </View>
            <Text style={styles.categoryDescription}>{category.description}</Text>
            <View style={styles.categoryFooter}>
              <Text style={styles.articleCount}>
                {helpArticles.filter(article => article.category === category.key).length} articles
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderHelpArticles = () => {
    const filteredArticles = getFilteredArticles();

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {selectedCategory === 'all' ? 'All Articles' : `${helpCategories.find(c => c.key === selectedCategory)?.title} Articles`}
        </Text>
        
        {filteredArticles.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              {searchQuery.trim() 
                ? `No articles found for "${searchQuery}"`
                : 'No articles available in this category'
              }
            </Text>
          </View>
        ) : (
          filteredArticles.map((article) => (
            <TouchableOpacity
              key={article.id}
              style={styles.articleCard}
              onPress={() => handleArticlePress(article)}
            >
              <View style={styles.articleHeader}>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(article.difficulty) + '20' }]}>
                  <Text style={[styles.difficultyText, { color: getDifficultyColor(article.difficulty) }]}>
                    {article.difficulty}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.articleDescription}>{article.description}</Text>
              
              <View style={styles.articleFooter}>
                <Text style={styles.readTime}>{article.readTime}</Text>
                <Text style={styles.readMore}>Read more →</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Help Center"
        subtitle="Find answers and support"
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderSearchBar()}
        {renderQuickActions()}
        {renderCategoryTabs()}
        {renderHelpCategories()}
        {renderHelpArticles()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  searchContainer: {
    marginBottom: 24,
  },
  searchInput: {
    ...globalStyles.input,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    color: colors.textPrimary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    ...globalStyles.shadow,
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActionTitle: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryContent: {
    paddingHorizontal: 4,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeCategoryTab: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryTabText: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    ...globalStyles.shadow,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  categoryTitle: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '600',
    flex: 1,
  },
  categoryDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  categoryFooter: {
    alignItems: 'flex-end',
  },
  articleCount: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '500',
  },
  articleCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...globalStyles.shadow,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  articleTitle: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '600',
    flex: 1,
    marginRight: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    ...typography.caption,
    fontWeight: '600',
  },
  articleDescription: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  articleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readTime: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  readMore: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  emptyState: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    ...globalStyles.shadow,
  },
  emptyStateText: {
    ...typography.body2,
    color: colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default HelpCenterScreen; 