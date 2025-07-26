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

const FAQScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());

  const faqCategories = [
    {
      key: 'getting-started',
      title: 'Getting Started',
      icon: '🚀',
      color: colors.primary,
    },
    {
      key: 'orders',
      title: 'Orders',
      icon: '📋',
      color: colors.success,
    },
    {
      key: 'menu',
      title: 'Menu Management',
      icon: '🍽️',
      color: colors.warning,
    },
    {
      key: 'payments',
      title: 'Payments',
      icon: '💰',
      color: colors.info,
    },
    {
      key: 'technical',
      title: 'Technical',
      icon: '🔧',
      color: colors.error,
    },
    {
      key: 'account',
      title: 'Account',
      icon: '⚙️',
      color: colors.secondary,
    },
  ];

  const faqData = [
    // Getting Started
    {
      id: '1',
      category: 'getting-started',
      question: 'How do I set up my restaurant profile?',
      answer: 'To set up your restaurant profile, go to Settings > Vendor Profile. Fill in your business information, upload photos, and configure your operating hours. Make sure to provide accurate contact information and business details.',
    },
    {
      id: '2',
      category: 'getting-started',
      question: 'What documents do I need to verify my account?',
      answer: 'You\'ll need to provide: Business license, Food service permit, Tax identification number, Proof of business address, and Government-issued ID. All documents should be current and clearly legible.',
    },
    {
      id: '3',
      category: 'getting-started',
      question: 'How long does account verification take?',
      answer: 'Account verification typically takes 2-3 business days. We review all submitted documents and may contact you if additional information is needed. You\'ll receive an email notification once verification is complete.',
    },
    {
      id: '4',
      category: 'getting-started',
      question: 'Can I use the app before my account is verified?',
      answer: 'You can explore the app and set up your profile, but you won\'t be able to receive orders until your account is fully verified. This ensures compliance with local regulations and food safety standards.',
    },

    // Orders
    {
      id: '5',
      category: 'orders',
      question: 'How do I accept or reject orders?',
      answer: 'When a new order comes in, you\'ll receive a notification. Tap on the order to view details, then choose "Accept" or "Reject". You have 2 minutes to respond before the order is automatically cancelled.',
    },
    {
      id: '6',
      category: 'orders',
      question: 'What happens if I can\'t fulfill an order?',
      answer: 'If you can\'t fulfill an order, reject it immediately and provide a reason. This helps us improve our service and ensures customers aren\'t left waiting. Frequent rejections may affect your account status.',
    },
    {
      id: '7',
      category: 'orders',
      question: 'How do I update order status?',
      answer: 'Go to Orders > Order Details and tap the status button. You can update from "Accepted" to "Preparing", "Ready for Pickup", or "Completed". Keep customers informed of their order progress.',
    },
    {
      id: '8',
      category: 'orders',
      question: 'Can customers modify their orders?',
      answer: 'Yes, customers can request modifications before you start preparing their order. You\'ll receive a notification and can accept or reject the changes. Once preparation begins, modifications are no longer allowed.',
    },

    // Menu Management
    {
      id: '9',
      category: 'menu',
      question: 'How do I add items to my menu?',
      answer: 'Go to Menu > Add Menu Item. Upload a high-quality photo, enter item details (name, description, price, category), and set availability. You can also specify dietary information and allergens.',
    },
    {
      id: '10',
      category: 'menu',
      question: 'Can I set different prices for delivery and pickup?',
      answer: 'Yes, you can set different pricing for delivery and pickup orders. This helps cover delivery costs and encourages customers to choose pickup when convenient.',
    },
    {
      id: '11',
      category: 'menu',
      question: 'How do I manage menu categories?',
      answer: 'Go to Menu > Category Management to create, edit, or delete categories. Organize your menu logically (e.g., Appetizers, Main Courses, Desserts) to help customers find items easily.',
    },
    {
      id: '12',
      category: 'menu',
      question: 'Can I temporarily hide menu items?',
      answer: 'Yes, you can toggle item availability on/off without deleting them. This is useful for items that are temporarily unavailable or seasonal offerings.',
    },

    // Payments
    {
      id: '13',
      category: 'payments',
      question: 'How do I receive payments?',
      answer: 'Payments are processed automatically through our secure payment system. You\'ll receive payouts to your linked bank account or digital wallet according to your payout schedule.',
    },
    {
      id: '14',
      category: 'payments',
      question: 'What are the payment processing fees?',
      answer: 'We charge a 3% processing fee on all orders. This covers payment processing, platform maintenance, and customer support. Fees are deducted before payouts are sent.',
    },
    {
      id: '15',
      category: 'payments',
      question: 'How often do I receive payouts?',
      answer: 'Payouts are processed weekly by default. You can change this to daily or monthly in your payment settings. Payouts are sent on Tuesdays for the previous week\'s orders.',
    },
    {
      id: '16',
      category: 'payments',
      question: 'What payment methods do you support?',
      answer: 'We support bank transfers, PayPal, and digital wallets. Set up your preferred payout method in Settings > Payment Settings. All methods are secure and reliable.',
    },

    // Technical
    {
      id: '17',
      category: 'technical',
      question: 'What if the app crashes or freezes?',
      answer: 'Try closing and reopening the app. If the problem persists, restart your device. For persistent issues, contact support with details about your device and the error you\'re experiencing.',
    },
    {
      id: '18',
      category: 'technical',
      question: 'How do I update the app?',
      answer: 'App updates are available through your device\'s app store. Enable automatic updates to ensure you always have the latest version with new features and security improvements.',
    },
    {
      id: '19',
      category: 'technical',
      question: 'What devices are supported?',
      answer: 'The app works on iOS 12+ and Android 8+. For optimal performance, we recommend using devices with at least 2GB RAM and a stable internet connection.',
    },
    {
      id: '20',
      category: 'technical',
      question: 'How do I reset my password?',
      answer: 'Go to the login screen and tap "Forgot Password". Enter your email address and follow the instructions sent to your email. You can also contact support for assistance.',
    },

    // Account
    {
      id: '21',
      category: 'account',
      question: 'How do I change my business information?',
      answer: 'Go to Settings > Vendor Profile to update your business information. Changes to business name, address, or contact information may require re-verification.',
    },
    {
      id: '22',
      category: 'account',
      question: 'Can I have multiple users on one account?',
      answer: 'Yes, you can add staff members to your account. Go to Settings > Staff Management to invite team members. Each user can have different permission levels.',
    },
    {
      id: '23',
      category: 'account',
      question: 'How do I deactivate my account?',
      answer: 'Contact support to deactivate your account. Make sure to fulfill any pending orders and withdraw any remaining funds before deactivation.',
    },
    {
      id: '24',
      category: 'account',
      question: 'What are the account requirements?',
      answer: 'You must be 18+, have a valid business license, food service permit, and comply with local health regulations. Your business must be properly registered and insured.',
    },
  ];

  const popularQuestions = [
    'How do I set up my restaurant profile?',
    'How do I accept or reject orders?',
    'How do I add items to my menu?',
    'How do I receive payments?',
    'What if the app crashes or freezes?',
  ];

  useEffect(() => {
    loadFAQ();
  }, []);

  const loadFAQ = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const toggleQuestion = (questionId) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const getFilteredFAQ = () => {
    let filtered = faqData;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const handlePopularQuestionPress = (question) => {
    const faq = faqData.find(f => f.question === question);
    if (faq) {
      setSelectedCategory(faq.category);
      setExpandedQuestions(new Set([faq.id]));
      // Scroll to the question (in a real app, you'd implement scroll to element)
    }
  };

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search FAQ..."
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
        <Text style={styles.categoryTabText}>All</Text>
      </TouchableOpacity>
      {faqCategories.map((category) => (
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

  const renderPopularQuestions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Popular Questions</Text>
      <View style={styles.popularQuestionsList}>
        {popularQuestions.map((question, index) => (
          <TouchableOpacity
            key={index}
            style={styles.popularQuestionItem}
            onPress={() => handlePopularQuestionPress(question)}
          >
            <Text style={styles.popularQuestionText}>{question}</Text>
            <Text style={styles.popularQuestionIcon}>→</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderFAQList = () => {
    const filteredFAQ = getFilteredFAQ();

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {selectedCategory === 'all' ? 'All Questions' : `${faqCategories.find(c => c.key === selectedCategory)?.title} Questions`}
        </Text>
        
        {filteredFAQ.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              {searchQuery.trim() 
                ? `No questions found for "${searchQuery}"`
                : 'No questions available in this category'
              }
            </Text>
          </View>
        ) : (
          filteredFAQ.map((faq) => (
            <View key={faq.id} style={styles.faqItem}>
              <TouchableOpacity
                style={styles.faqQuestion}
                onPress={() => toggleQuestion(faq.id)}
              >
                <Text style={styles.faqQuestionText}>{faq.question}</Text>
                <Text style={[
                  styles.faqExpandIcon,
                  expandedQuestions.has(faq.id) && styles.faqExpandIconExpanded,
                ]}>
                  {expandedQuestions.has(faq.id) ? '−' : '+'}
                </Text>
              </TouchableOpacity>
              
              {expandedQuestions.has(faq.id) && (
                <View style={styles.faqAnswer}>
                  <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                </View>
              )}
            </View>
          ))
        )}
      </View>
    );
  };

  const renderContactSupport = () => (
    <View style={styles.section}>
      <View style={styles.contactSupportCard}>
        <Text style={styles.contactSupportTitle}>Still need help?</Text>
        <Text style={styles.contactSupportDescription}>
          Can't find the answer you're looking for? Our support team is here to help.
        </Text>
        <TouchableOpacity
          style={styles.contactSupportButton}
          onPress={() => navigation.navigate('ContactSupport')}
        >
          <Text style={styles.contactSupportButtonText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="FAQ"
        subtitle="Frequently asked questions"
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderSearchBar()}
        {renderPopularQuestions()}
        {renderCategoryTabs()}
        {renderFAQList()}
        {renderContactSupport()}
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
  popularQuestionsList: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    ...globalStyles.shadow,
  },
  popularQuestionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  popularQuestionText: {
    ...typography.body2,
    color: colors.textPrimary,
    flex: 1,
    marginRight: 12,
  },
  popularQuestionIcon: {
    ...typography.body1,
    color: colors.primary,
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
  faqItem: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    ...globalStyles.shadow,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  faqQuestionText: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '600',
    flex: 1,
    marginRight: 12,
  },
  faqExpandIcon: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: 'bold',
    width: 24,
    textAlign: 'center',
  },
  faqExpandIconExpanded: {
    transform: [{ rotate: '180deg' }],
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  faqAnswerText: {
    ...typography.body2,
    color: colors.textSecondary,
    lineHeight: 20,
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
  contactSupportCard: {
    backgroundColor: colors.primary + '10',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  contactSupportTitle: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 8,
  },
  contactSupportDescription: {
    ...typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  contactSupportButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  contactSupportButtonText: {
    ...typography.body2,
    color: colors.white,
    fontWeight: '600',
  },
});

export default FAQScreen; 