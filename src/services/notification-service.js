// src/services/notification-service.js
import { toast } from 'react-toastify';

class NotificationService {
  constructor() {
    this.apiUrl = 'https://fcm.googleapis.com/v1/projects/YOUR_PROJECT_ID/messages:send';
    this.serverKey = 'YOUR_SERVER_KEY'; // From Firebase Cloud Messaging
  }

  // Send notification to specific device or topic
  async sendNotification(notification, targetToken = null, topic = null) {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.serverKey}`
      };

      let message = {
        notification: {
          title: notification.title,
          body: notification.message
        },
        data: {
          id: notification.id || Date.now().toString(),
          title: notification.title,
          message: notification.message,
          timestamp: new Date().toISOString(),
          type: notification.type || 'info',
          click_action: 'FLUTTER_NOTIFICATION_CLICK'
        }
      };

      // Target specific device or topic
      if (targetToken) {
        message.token = targetToken;
      } else if (topic) {
        message.topic = topic;
      } else {
        // Default to 'all' topic if no specific target
        message.topic = 'all';
      }

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ message })
      });

      const result = await response.json();
      
      // Show success toast on dashboard
      toast.success(`Notification sent: ${notification.title}`);
      
      return result;
    } catch (error) {
      console.error('Error sending notification:', error);
      toast.error('Failed to send notification');
      throw error;
    }
  }

  // Send to multiple devices
  async sendBatchNotifications(notification, tokens) {
    const results = [];
    for (const token of tokens) {
      try {
        const result = await this.sendNotification(notification, token);
        results.push(result);
      } catch (error) {
        results.push({ error, token });
      }
    }
    return results;
  }

  // Send to a specific driver group
  async sendToDriverGroup(notification, groupId) {
    return this.sendNotification(notification, null, `driver_group_${groupId}`);
  }

  // Send maintenance alerts
  async sendMaintenanceAlert(vehicleId, message) {
    const notification = {
      title: 'Maintenance Alert',
      message: message,
      type: 'alert'
    };
    return this.sendNotification(notification, null, `vehicle_${vehicleId}`);
  }

  // Send job assignment
  async sendJobAssignment(driverId, details) {
    const notification = {
      title: 'New Assignment',
      message: details,
      type: 'info'
    };
    return this.sendNotification(notification, null, `driver_${driverId}`);
  }

  // Send trip completion notification
  async sendTripCompleted(driverId, details) {
    const notification = {
      title: 'Trip Completed',
      message: details,
      type: 'success'
    };
    return this.sendNotification(notification, null, `driver_${driverId}`);
  }
}

export default new NotificationService();
