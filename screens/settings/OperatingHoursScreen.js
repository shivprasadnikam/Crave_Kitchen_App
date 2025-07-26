import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/globalStyles';
import { typography } from '../../styles/typography';
import Header from '../../components/common/Header';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const OperatingHoursScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [operatingHours, setOperatingHours] = useState({});
  const [specialSchedules, setSpecialSchedules] = useState([]);
  const [settings, setSettings] = useState({
    autoClose: false,
    allowAdvanceOrders: true,
    advanceOrderHours: 24,
    preparationTime: 20,
    breakTime: 30,
  });

  const daysOfWeek = [
    { key: 'monday', label: 'Monday', short: 'Mon' },
    { key: 'tuesday', label: 'Tuesday', short: 'Tue' },
    { key: 'wednesday', label: 'Wednesday', short: 'Wed' },
    { key: 'thursday', label: 'Thursday', short: 'Thu' },
    { key: 'friday', label: 'Friday', short: 'Fri' },
    { key: 'saturday', label: 'Saturday', short: 'Sat' },
    { key: 'sunday', label: 'Sunday', short: 'Sun' },
  ];

  const timeSlots = [
    '12:00 AM', '12:30 AM', '1:00 AM', '1:30 AM', '2:00 AM', '2:30 AM', '3:00 AM', '3:30 AM',
    '4:00 AM', '4:30 AM', '5:00 AM', '5:30 AM', '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM',
    '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
    '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM',
  ];

  // Mock operating hours data
  const mockOperatingHours = {
    monday: { open: true, start: '9:00 AM', end: '10:00 PM', breakStart: '2:00 PM', breakEnd: '3:00 PM' },
    tuesday: { open: true, start: '9:00 AM', end: '10:00 PM', breakStart: '2:00 PM', breakEnd: '3:00 PM' },
    wednesday: { open: true, start: '9:00 AM', end: '10:00 PM', breakStart: '2:00 PM', breakEnd: '3:00 PM' },
    thursday: { open: true, start: '9:00 AM', end: '10:00 PM', breakStart: '2:00 PM', breakEnd: '3:00 PM' },
    friday: { open: true, start: '9:00 AM', end: '11:00 PM', breakStart: '2:00 PM', breakEnd: '3:00 PM' },
    saturday: { open: true, start: '10:00 AM', end: '11:00 PM', breakStart: '2:00 PM', breakEnd: '3:00 PM' },
    sunday: { open: false, start: '10:00 AM', end: '9:00 PM', breakStart: '2:00 PM', breakEnd: '3:00 PM' },
  };

  const mockSpecialSchedules = [
    {
      id: '1',
      title: 'Holiday Hours - Christmas Eve',
      date: '2024-12-24',
      start: '10:00 AM',
      end: '6:00 PM',
      isClosed: false,
    },
    {
      id: '2',
      title: 'Closed - Christmas Day',
      date: '2024-12-25',
      start: '10:00 AM',
      end: '6:00 PM',
      isClosed: true,
    },
    {
      id: '3',
      title: 'New Year\'s Eve - Extended Hours',
      date: '2024-12-31',
      start: '10:00 AM',
      end: '1:00 AM',
      isClosed: false,
    },
  ];

  useEffect(() => {
    loadOperatingHours();
  }, []);

  const loadOperatingHours = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOperatingHours(mockOperatingHours);
      setSpecialSchedules(mockSpecialSchedules);
    } catch (error) {
      Alert.alert('Error', 'Failed to load operating hours');
    } finally {
      setLoading(false);
    }
  };

  const handleDayToggle = (dayKey) => {
    setOperatingHours(prev => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        open: !prev[dayKey].open,
      }
    }));
  };

  const handleTimeChange = (dayKey, timeType, time) => {
    setOperatingHours(prev => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        [timeType]: time,
      }
    }));
  };

  const handleSettingsChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleAddSpecialSchedule = () => {
    Alert.alert('Coming Soon', 'Add special schedule feature will be available soon!');
  };

  const handleEditSpecialSchedule = (schedule) => {
    Alert.alert('Coming Soon', 'Edit special schedule feature will be available soon!');
  };

  const handleDeleteSpecialSchedule = (scheduleId) => {
    Alert.alert(
      'Delete Special Schedule',
      'Are you sure you want to delete this special schedule?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setSpecialSchedules(prev => prev.filter(s => s.id !== scheduleId));
          },
        },
      ]
    );
  };

  const handleSaveHours = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      Alert.alert(
        'Success',
        'Operating hours updated successfully!',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update operating hours');
    } finally {
      setSaving(false);
    }
  };

  const renderTimePicker = (dayKey, timeType, currentTime, label) => (
    <View style={styles.timePickerContainer}>
      <Text style={styles.timeLabel}>{label}</Text>
      <TouchableOpacity
        style={styles.timePicker}
        onPress={() => {
          // In a real app, this would open a time picker
          Alert.alert('Coming Soon', 'Time picker will be available soon!');
        }}
      >
        <Text style={styles.timePickerText}>{currentTime}</Text>
        <Text style={styles.timePickerIcon}>🕐</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDaySchedule = (day) => {
    const dayData = operatingHours[day.key];
    
    return (
      <View key={day.key} style={styles.dayContainer}>
        <View style={styles.dayHeader}>
          <View style={styles.dayInfo}>
            <Text style={styles.dayLabel}>{day.label}</Text>
            <Text style={styles.dayShort}>{day.short}</Text>
          </View>
          <Switch
            value={dayData.open}
            onValueChange={() => handleDayToggle(day.key)}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={dayData.open ? colors.white : colors.textSecondary}
          />
        </View>

        {dayData.open && (
          <View style={styles.daySchedule}>
            <View style={styles.timeRow}>
              {renderTimePicker(day.key, 'start', dayData.start, 'Open')}
              {renderTimePicker(day.key, 'end', dayData.end, 'Close')}
            </View>
            
            <View style={styles.breakContainer}>
              <Text style={styles.breakLabel}>Break Time (Optional)</Text>
              <View style={styles.timeRow}>
                {renderTimePicker(day.key, 'breakStart', dayData.breakStart, 'Break Start')}
                {renderTimePicker(day.key, 'breakEnd', dayData.breakEnd, 'Break End')}
              </View>
            </View>
          </View>
        )}

        {!dayData.open && (
          <View style={styles.closedDay}>
            <Text style={styles.closedText}>Closed</Text>
          </View>
        )}
      </View>
    );
  };

  const renderSpecialSchedules = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Special Schedules</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddSpecialSchedule}
        >
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {specialSchedules.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No special schedules set</Text>
        </View>
      ) : (
        specialSchedules.map((schedule) => (
          <View key={schedule.id} style={styles.specialScheduleCard}>
            <View style={styles.scheduleHeader}>
              <Text style={styles.scheduleTitle}>{schedule.title}</Text>
              <Text style={styles.scheduleDate}>{schedule.date}</Text>
            </View>
            
            {schedule.isClosed ? (
              <Text style={styles.closedScheduleText}>Closed</Text>
            ) : (
              <Text style={styles.scheduleTime}>
                {schedule.start} - {schedule.end}
              </Text>
            )}

            <View style={styles.scheduleActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleEditSpecialSchedule(schedule)}
              >
                <Text style={styles.actionButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => handleDeleteSpecialSchedule(schedule.id)}
              >
                <Text style={[styles.actionButtonText, styles.deleteButtonText]}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </View>
  );

  const renderSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Settings</Text>
      
      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingLabel}>Auto-Close When Busy</Text>
          <Text style={styles.settingDescription}>Automatically close when order limit is reached</Text>
        </View>
        <Switch
          value={settings.autoClose}
          onValueChange={(value) => handleSettingsChange('autoClose', value)}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={settings.autoClose ? colors.white : colors.textSecondary}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingLabel}>Allow Advance Orders</Text>
          <Text style={styles.settingDescription}>Allow customers to place orders in advance</Text>
        </View>
        <Switch
          value={settings.allowAdvanceOrders}
          onValueChange={(value) => handleSettingsChange('allowAdvanceOrders', value)}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={settings.allowAdvanceOrders ? colors.white : colors.textSecondary}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingLabel}>Preparation Time</Text>
          <Text style={styles.settingDescription}>Default order preparation time in minutes</Text>
        </View>
        <Text style={styles.settingValue}>{settings.preparationTime} min</Text>
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingLabel}>Break Time</Text>
          <Text style={styles.settingDescription}>Default break time in minutes</Text>
        </View>
        <Text style={styles.settingValue}>{settings.breakTime} min</Text>
      </View>
    </View>
  );

  const renderActionButtons = () => (
    <View style={styles.actionButtons}>
      <TouchableOpacity
        style={[styles.actionButton, styles.saveButton, saving && styles.disabledButton]}
        onPress={handleSaveHours}
        disabled={saving}
      >
        <Text style={styles.saveButtonText}>
          {saving ? 'Saving...' : 'Save Operating Hours'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Operating Hours"
        subtitle="Set your business hours and availability"
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Schedule</Text>
          {daysOfWeek.map(renderDaySchedule)}
        </View>

        {renderSpecialSchedules()}
        {renderSettings()}
        {renderActionButtons()}
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
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    ...typography.body2,
    color: colors.white,
    fontWeight: '600',
  },
  dayContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...globalStyles.shadow,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayInfo: {
    flex: 1,
  },
  dayLabel: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  dayShort: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  daySchedule: {
    gap: 16,
  },
  timeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  timePickerContainer: {
    flex: 1,
  },
  timeLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  timePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  timePickerText: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  timePickerIcon: {
    fontSize: 16,
  },
  breakContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
  },
  breakLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  closedDay: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  closedText: {
    ...typography.body2,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  specialScheduleCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...globalStyles.shadow,
  },
  scheduleHeader: {
    marginBottom: 8,
  },
  scheduleTitle: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  scheduleDate: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  scheduleTime: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '500',
    marginBottom: 12,
  },
  closedScheduleText: {
    ...typography.body2,
    color: colors.error,
    fontWeight: '500',
    marginBottom: 12,
  },
  scheduleActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  actionButtonText: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: colors.error + '20',
  },
  deleteButtonText: {
    color: colors.error,
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...globalStyles.shadow,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  settingValue: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '600',
  },
  actionButtons: {
    marginTop: 24,
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    ...globalStyles.shadow,
  },
  saveButtonText: {
    ...typography.button,
    color: colors.white,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default OperatingHoursScreen; 