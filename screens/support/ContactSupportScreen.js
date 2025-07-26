import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/globalStyles';
import { typography } from '../../styles/typography';
import { validators } from '../../utils/validators';
import Header from '../../components/common/Header';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ContactSupportScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('medium');
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    description: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});

  const supportCategories = [
    {
      key: 'technical',
      title: 'Technical Issues',
      icon: '🔧',
      description: 'App crashes, login problems, or technical difficulties',
    },
    {
      key: 'orders',
      title: 'Order Management',
      icon: '📋',
      description: 'Issues with order processing, payments, or delivery',
    },
    {
      key: 'menu',
      title: 'Menu & Inventory',
      icon: '🍽️',
      description: 'Problems with menu management or inventory tracking',
    },
    {
      key: 'payments',
      title: 'Payments & Payouts',
      icon: '💰',
      description: 'Payment processing issues or payout problems',
    },
    {
      key: 'account',
      title: 'Account & Settings',
      icon: '⚙️',
      description: 'Account access, profile, or settings issues',
    },
    {
      key: 'general',
      title: 'General Inquiry',
      icon: '❓',
      description: 'General questions or other support needs',
    },
  ];

  const priorityLevels = [
    {
      key: 'low',
      title: 'Low',
      description: 'General questions or feature requests',
      color: colors.success,
    },
    {
      key: 'medium',
      title: 'Medium',
      description: 'Minor issues affecting operations',
      color: colors.warning,
    },
    {
      key: 'high',
      title: 'High',
      description: 'Significant issues affecting business',
      color: colors.error,
    },
    {
      key: 'urgent',
      title: 'Urgent',
      description: 'Critical issues requiring immediate attention',
      color: colors.error,
    },
  ];

  const contactMethods = [
    {
      title: 'Live Chat',
      icon: '💬',
      description: 'Chat with our support team in real-time',
      availability: 'Available 24/7',
      action: () => Alert.alert('Coming Soon', 'Live chat will be available soon!'),
      color: colors.primary,
    },
    {
      title: 'Phone Support',
      icon: '📞',
      description: 'Call our support team directly',
      availability: 'Mon-Fri 9AM-6PM EST',
      action: () => Alert.alert('Phone Support', 'Call us at: +1 (555) 123-4567'),
      color: colors.success,
    },
    {
      title: 'Email Support',
      icon: '📧',
      description: 'Send us an email for detailed assistance',
      availability: 'Response within 24 hours',
      action: () => Alert.alert('Email Support', 'Email us at: support@cravekitchen.com'),
      color: colors.info,
    },
    {
      title: 'Help Center',
      icon: '📚',
      description: 'Browse our comprehensive help articles',
      availability: 'Self-service 24/7',
      action: () => navigation.navigate('HelpCenter'),
      color: colors.secondary,
    },
  ];

  const recentTickets = [
    {
      id: 'TKT-001',
      subject: 'Payment processing delay',
      category: 'payments',
      status: 'open',
      priority: 'high',
      createdAt: '2024-01-15T10:30:00Z',
      lastUpdated: '2024-01-15T14:20:00Z',
    },
    {
      id: 'TKT-002',
      subject: 'Menu item not displaying correctly',
      category: 'menu',
      status: 'resolved',
      priority: 'medium',
      createdAt: '2024-01-14T09:15:00Z',
      lastUpdated: '2024-01-14T16:45:00Z',
    },
    {
      id: 'TKT-003',
      subject: 'App login issue',
      category: 'technical',
      status: 'closed',
      priority: 'high',
      createdAt: '2024-01-13T11:20:00Z',
      lastUpdated: '2024-01-13T15:30:00Z',
    },
  ];

  useEffect(() => {
    loadContactSupport();
  }, []);

  const loadContactSupport = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const handleInputChange = (field, value) => {
    setTicketForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedCategory) {
      newErrors.category = 'Please select a category';
    }

    if (!ticketForm.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!ticketForm.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (ticketForm.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (!ticketForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validators.isValidEmail(ticketForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitTicket = async () => {
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      Alert.alert(
        'Ticket Submitted',
        'Your support ticket has been submitted successfully. We\'ll get back to you within 24 hours.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setTicketForm({
                subject: '',
                description: '',
                email: '',
                phone: '',
              });
              setSelectedCategory('');
              setSelectedPriority('medium');
              setErrors({});
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit ticket. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return colors.warning;
      case 'resolved': return colors.success;
      case 'closed': return colors.textSecondary;
      default: return colors.textSecondary;
    }
  };

  const getPriorityColor = (priority) => {
    const priorityLevel = priorityLevels.find(p => p.key === priority);
    return priorityLevel ? priorityLevel.color : colors.textSecondary;
  };

  const renderContactMethods = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Contact Methods</Text>
      <View style={styles.contactMethodsGrid}>
        {contactMethods.map((method, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.contactMethodCard, { borderLeftColor: method.color }]}
            onPress={method.action}
          >
            <View style={styles.contactMethodHeader}>
              <Text style={styles.contactMethodIcon}>{method.icon}</Text>
              <Text style={styles.contactMethodTitle}>{method.title}</Text>
            </View>
            <Text style={styles.contactMethodDescription}>{method.description}</Text>
            <Text style={styles.contactMethodAvailability}>{method.availability}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderTicketForm = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Submit Support Ticket</Text>
      
      {/* Category Selection */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Category *</Text>
        <View style={styles.categoriesGrid}>
          {supportCategories.map((category) => (
            <TouchableOpacity
              key={category.key}
              style={[
                styles.categoryOption,
                selectedCategory === category.key && styles.selectedCategoryOption,
              ]}
              onPress={() => setSelectedCategory(category.key)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={[
                styles.categoryTitle,
                selectedCategory === category.key && styles.selectedCategoryTitle,
              ]}>
                {category.title}
              </Text>
              <Text style={[
                styles.categoryDescription,
                selectedCategory === category.key && styles.selectedCategoryDescription,
              ]}>
                {category.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
      </View>

      {/* Priority Selection */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Priority</Text>
        <View style={styles.priorityContainer}>
          {priorityLevels.map((priority) => (
            <TouchableOpacity
              key={priority.key}
              style={[
                styles.priorityOption,
                selectedPriority === priority.key && styles.selectedPriorityOption,
                { borderColor: priority.color },
              ]}
              onPress={() => setSelectedPriority(priority.key)}
            >
              <Text style={[
                styles.priorityTitle,
                selectedPriority === priority.key && { color: priority.color },
              ]}>
                {priority.title}
              </Text>
              <Text style={[
                styles.priorityDescription,
                selectedPriority === priority.key && { color: priority.color },
              ]}>
                {priority.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Form Fields */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Subject *</Text>
        <TextInput
          style={[styles.input, errors.subject && styles.inputError]}
          placeholder="Brief description of your issue"
          value={ticketForm.subject}
          onChangeText={(value) => handleInputChange('subject', value)}
          placeholderTextColor={colors.textSecondary}
        />
        {errors.subject && <Text style={styles.errorText}>{errors.subject}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[styles.textArea, errors.description && styles.inputError]}
          placeholder="Please provide detailed information about your issue..."
          value={ticketForm.description}
          onChangeText={(value) => handleInputChange('description', value)}
          placeholderTextColor={colors.textSecondary}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />
        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="your-email@example.com"
          value={ticketForm.email}
          onChangeText={(value) => handleInputChange('email', value)}
          placeholderTextColor={colors.textSecondary}
          keyboardType="email-address"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Phone (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="+1 (555) 123-4567"
          value={ticketForm.phone}
          onChangeText={(value) => handleInputChange('phone', value)}
          placeholderTextColor={colors.textSecondary}
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity
        style={[styles.submitButton, submitting && styles.disabledButton]}
        onPress={handleSubmitTicket}
        disabled={submitting}
      >
        <Text style={styles.submitButtonText}>
          {submitting ? 'Submitting...' : 'Submit Ticket'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderRecentTickets = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Recent Tickets</Text>
      {recentTickets.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No recent tickets</Text>
        </View>
      ) : (
        recentTickets.map((ticket) => (
          <View key={ticket.id} style={styles.ticketCard}>
            <View style={styles.ticketHeader}>
              <Text style={styles.ticketId}>{ticket.id}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(ticket.status) + '20' }]}>
                <Text style={[styles.statusText, { color: getStatusColor(ticket.status) }]}>
                  {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                </Text>
              </View>
            </View>
            
            <Text style={styles.ticketSubject}>{ticket.subject}</Text>
            
            <View style={styles.ticketFooter}>
              <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(ticket.priority) + '20' }]}>
                <Text style={[styles.priorityText, { color: getPriorityColor(ticket.priority) }]}>
                  {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                </Text>
              </View>
              <Text style={styles.ticketDate}>
                {new Date(ticket.createdAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
        ))
      )}
    </View>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Contact Support"
        subtitle="Get help when you need it"
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {renderContactMethods()}
          {renderTicketForm()}
          {renderRecentTickets()}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
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
  contactMethodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  contactMethodCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    ...globalStyles.shadow,
  },
  contactMethodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactMethodIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  contactMethodTitle: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '600',
    flex: 1,
  },
  contactMethodDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  contactMethodAvailability: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '500',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryOption: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.border,
    ...globalStyles.shadow,
  },
  selectedCategoryOption: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryTitle: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  selectedCategoryTitle: {
    color: colors.primary,
  },
  categoryDescription: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  selectedCategoryDescription: {
    color: colors.primary,
  },
  priorityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  priorityOption: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
  },
  selectedPriorityOption: {
    backgroundColor: colors.background,
  },
  priorityTitle: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  priorityDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  input: {
    ...globalStyles.input,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    color: colors.textPrimary,
  },
  textArea: {
    ...globalStyles.input,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    color: colors.textPrimary,
    height: 120,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    ...globalStyles.shadow,
  },
  submitButtonText: {
    ...typography.button,
    color: colors.white,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
  ticketCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...globalStyles.shadow,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ticketId: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    ...typography.caption,
    fontWeight: '600',
  },
  ticketSubject: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '500',
    marginBottom: 8,
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    ...typography.caption,
    fontWeight: '600',
  },
  ticketDate: {
    ...typography.caption,
    color: colors.textSecondary,
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
  },
});

export default ContactSupportScreen; 