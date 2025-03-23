import React, { createContext, useContext, useState, useEffect } from 'react';

// Sample notifications data
const initialNotifications = [
  {
    id: 1,
    title: 'New Verification Request',
    message: 'A new candidate has submitted verification documents for review.',
    type: 'info',
    read: false,
    time: '10 minutes ago',
    actionText: 'View Request',
    onAction: () => window.location.href = '/status'
  },
  {
    id: 2,
    title: 'Document Flagged',
    message: 'An identity document for Sarah Johnson has been flagged for review.',
    type: 'alert',
    read: false,
    time: '1 hour ago',
    actionText: 'Review Document',
    onAction: () => window.location.href = '/status'
  },
  {
    id: 3,
    title: 'Verification Completed',
    message: 'All documents for John Smith have been successfully verified.',
    type: 'success',
    read: true,
    time: 'Yesterday',
    actionText: 'View Profile',
    onAction: () => window.location.href = '/status'
  },
  {
    id: 4,
    title: 'System Update',
    message: 'The verification system will be updated tonight at 2 AM. Expect brief downtime.',
    type: 'info',
    read: true,
    time: '2 days ago'
  },
  {
    id: 5,
    title: 'New Feature Available',
    message: 'You can now export verification reports in PDF format.',
    type: 'info',
    read: true,
    time: '3 days ago',
    actionText: 'Learn More',
    onAction: () => alert('This would open documentation in a real app')
  }
];

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [filterType, setFilterType] = useState('all');

  // Load notifications from localStorage on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      try {
        setNotifications(JSON.parse(savedNotifications));
      } catch (error) {
        console.error('Failed to parse notifications from localStorage', error);
        setNotifications(initialNotifications);
      }
    } else {
      setNotifications(initialNotifications);
    }
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Add a new notification
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      read: false,
      time: 'Just now',
      type: 'info',
      ...notification
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  // Mark a notification as read
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Delete a notification
  const deleteNotification = (id) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Get unread count
  const getUnreadCount = () => {
    return notifications.filter(notification => !notification.read).length;
  };

  const value = {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    getUnreadCount,
    filterType,
    setFilterType
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
