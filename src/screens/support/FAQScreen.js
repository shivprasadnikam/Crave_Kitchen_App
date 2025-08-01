import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const FAQScreen = ({ navigation }) => {
  const faqs = [
    {
      question: 'How do I add a new menu item?',
      answer: 'Go to Menu Management > Add Menu Item and fill in the required details including name, price, and category.',
    },
    {
      question: 'How can I track my orders?',
      answer: 'Navigate to Orders section to view all incoming orders, their status, and customer details.',
    },
    {
      question: 'How do I update my restaurant information?',
      answer: 'Go to Settings > Restaurant Settings to update your restaurant name, address, and other details.',
    },
    {
      question: 'How can I view my earnings?',
      answer: 'Check the Revenue section to view your daily, weekly, and monthly earnings with detailed breakdowns.',
    },
    {
      question: 'How do I manage my inventory?',
      answer: 'Use the Inventory section to track stock levels, set alerts for low stock, and manage ingredients.',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>FAQ</Text>
          <Text style={styles.headerSubtitle}>Frequently Asked Questions</Text>
        </View>

        {/* FAQ List */}
        <View style={styles.content}>
          {faqs.map((faq, index) => (
            <View key={index} style={styles.faqCard}>
              <Text style={styles.question}>{faq.question}</Text>
              <Text style={styles.answer}>{faq.answer}</Text>
            </View>
          ))}
        </View>

        {/* Contact Support */}
        <View style={styles.contactSection}>
          <Text style={styles.contactText}>Still need help?</Text>
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => navigation.navigate('ContactSupport')}
          >
            <Text style={styles.contactButtonText}>Contact Support</Text>
          </TouchableOpacity>
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
  faqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
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
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  answer: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  contactSection: {
    padding: 20,
    alignItems: 'center',
  },
  contactText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 12,
  },
  contactButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FAQScreen;
