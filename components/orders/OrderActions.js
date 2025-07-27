import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import { THEME } from '../../styles/theme';
import OrderStatusBadge from './OrderStatusBadge';

const OrderActions = ({ 
  order, 
  onAccept, 
  onReject, 
  onUpdateStatus,
  showStatusUpdate = true,
  showAcceptReject = true 
}) => {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  const { status, id } = order;

  const isPending = status.toLowerCase() === 'pending';
  const isAccepted = status.toLowerCase() === 'accepted';
  const isPreparing = status.toLowerCase() === 'preparing';
  const isReady = status.toLowerCase() === 'ready';
  const isCompleted = status.toLowerCase() === 'completed';
  const isCancelled = status.toLowerCase() === 'cancelled';
  const isRejected = status.toLowerCase() === 'rejected';

  const statusOptions = [
    { key: 'accepted', label: 'Accept Order', color: THEME.colors.SUCCESS.MAIN, icon: '✅' },
    { key: 'preparing', label: 'Start Preparing', color: THEME.colors.PRIMARY.MAIN, icon: '👨‍🍳' },
    { key: 'ready', label: 'Mark as Ready', color: THEME.colors.WARNING.MAIN, icon: '🎉' },
    { key: 'completed', label: 'Complete Order', color: THEME.colors.SUCCESS.MAIN, icon: '✅' },
    { key: 'cancelled', label: 'Cancel Order', color: THEME.colors.ERROR.MAIN, icon: '❌' },
  ];

  const getAvailableStatusOptions = () => {
    if (isPending) {
      return statusOptions.filter(option => 
        ['accepted', 'cancelled'].includes(option.key)
      );
    } else if (isAccepted) {
      return statusOptions.filter(option => 
        ['preparing', 'cancelled'].includes(option.key)
      );
    } else if (isPreparing) {
      return statusOptions.filter(option => 
        ['ready', 'cancelled'].includes(option.key)
      );
    } else if (isReady) {
      return statusOptions.filter(option => 
        ['completed', 'cancelled'].includes(option.key)
      );
    }
    return [];
  };

  const handleAccept = () => {
    Alert.alert(
      'Accept Order',
      'Are you sure you want to accept this order?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Accept',
          style: 'default',
          onPress: () => {
            if (onAccept) {
              onAccept(order);
            }
          },
        },
      ]
    );
  };

  const handleReject = () => {
    Alert.alert(
      'Reject Order',
      'Are you sure you want to reject this order? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: () => {
            if (onReject) {
              onReject(order);
            }
          },
        },
      ]
    );
  };

  const handleStatusUpdate = async (newStatus) => {
    setUpdating(true);
    try {
      if (onUpdateStatus) {
        await onUpdateStatus(order, newStatus);
      }
      setShowStatusModal(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to update order status. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const handleStatusOptionPress = (statusOption) => {
    if (statusOption.key === 'cancelled') {
      Alert.alert(
        'Cancel Order',
        'Are you sure you want to cancel this order? This action cannot be undone.',
        [
          { text: 'No', style: 'cancel' },
          {
            text: 'Yes, Cancel',
            style: 'destructive',
            onPress: () => handleStatusUpdate(statusOption.key),
          },
        ]
      );
    } else {
      handleStatusUpdate(statusOption.key);
    }
  };

  const renderAcceptRejectButtons = () => {
    if (!showAcceptReject || !isPending) return null;

    return (
      <View style={styles.acceptRejectContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.acceptButton]}
          onPress={handleAccept}
        >
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.rejectButton]}
          onPress={handleReject}
        >
          <Text style={styles.rejectButtonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderStatusUpdateButton = () => {
    if (!showStatusUpdate || isCompleted || isCancelled || isRejected) return null;

    const availableOptions = getAvailableStatusOptions();
    if (availableOptions.length === 0) return null;

    return (
      <TouchableOpacity
        style={[styles.actionButton, styles.statusUpdateButton]}
        onPress={() => setShowStatusModal(true)}
      >
        <Text style={styles.statusUpdateButtonText}>Update Status</Text>
      </TouchableOpacity>
    );
  };

  const renderStatusModal = () => (
    <Modal
      visible={showStatusModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowStatusModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Update Order Status</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowStatusModal(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.currentStatus}>
            <Text style={styles.currentStatusLabel}>Current Status:</Text>
            <OrderStatusBadge status={status} size="medium" />
          </View>

          <View style={styles.statusOptions}>
            {getAvailableStatusOptions().map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[styles.statusOption, { borderColor: option.color }]}
                onPress={() => handleStatusOptionPress(option)}
                disabled={updating}
              >
                <Text style={styles.statusOptionIcon}>{option.icon}</Text>
                <Text style={[styles.statusOptionText, { color: option.color }]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {updating && (
            <View style={styles.updatingContainer}>
              <Text style={styles.updatingText}>Updating status...</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {renderAcceptRejectButtons()}
      {renderStatusUpdateButton()}
      {renderStatusModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: THEME.colors.BORDER.PRIMARY,
    padding: THEME.spacing.MD,
  },
  acceptRejectContainer: {
    flexDirection: 'row',
    gap: THEME.spacing.MD,
    marginBottom: THEME.spacing.MD,
  },
  actionButton: {
    flex: 1,
    paddingVertical: THEME.spacing.MD,
    borderRadius: THEME.borderRadius.SM,
    alignItems: 'center',
    ...THEME.shadows.SM,
  },
  acceptButton: {
    backgroundColor: THEME.colors.SUCCESS.MAIN,
  },
  acceptButtonText: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.NEUTRAL.WHITE,
    fontWeight: '600',
  },
  rejectButton: {
    backgroundColor: THEME.colors.ERROR.MAIN,
  },
  rejectButtonText: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.NEUTRAL.WHITE,
    fontWeight: '600',
  },
  statusUpdateButton: {
    backgroundColor: THEME.colors.PRIMARY.MAIN,
  },
  statusUpdateButtonText: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.NEUTRAL.WHITE,
    fontWeight: '600',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: THEME.spacing.LG,
  },
  modalContent: {
    backgroundColor: THEME.colors.SURFACE.PRIMARY,
    borderRadius: THEME.borderRadius.LG,
    padding: THEME.spacing.LG,
    width: '100%',
    maxWidth: 400,
    ...THEME.shadows.LG,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.LG,
  },
  modalTitle: {
    ...THEME.typography.HEADING.SMALL,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '600',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: THEME.colors.SURFACE.SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    ...THEME.typography.BODY.MEDIUM,
    color: THEME.colors.TEXT.SECONDARY,
    fontWeight: '600',
  },
  currentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.spacing.LG,
    paddingBottom: THEME.spacing.MD,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.BORDER.PRIMARY,
  },
  currentStatusLabel: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    marginRight: THEME.spacing.MD,
  },
  statusOptions: {
    gap: THEME.spacing.MD,
  },
  statusOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: THEME.spacing.MD,
    borderRadius: THEME.borderRadius.MD,
    borderWidth: 2,
    backgroundColor: THEME.colors.SURFACE.SECONDARY,
  },
  statusOptionIcon: {
    fontSize: 20,
    marginRight: THEME.spacing.MD,
  },
  statusOptionText: {
    ...THEME.typography.BODY.MEDIUM,
    fontWeight: '600',
  },
  updatingContainer: {
    alignItems: 'center',
    marginTop: THEME.spacing.MD,
    paddingTop: THEME.spacing.MD,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.BORDER.PRIMARY,
  },
  updatingText: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    fontStyle: 'italic',
  },
});

export default OrderActions; 