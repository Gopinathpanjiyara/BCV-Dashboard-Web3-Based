import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BellIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  TrashIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

// Import context (will create this next)
import { useNotifications } from '../contexts/NotificationContext';

const NotificationItem = ({ notification, onMarkAsRead, onDelete }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'alert':
        return <ExclamationCircleIcon className="w-6 h-6 text-red-400" />;
      case 'success':
        return <CheckCircleIcon className="w-6 h-6 text-green-400" />;
      case 'info':
      default:
        return <InformationCircleIcon className="w-6 h-6 text-primary" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`p-4 border-b border-gray-700 hover:bg-background-lighter transition-colors ${!notification.read ? 'bg-primary/5' : ''}`}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-1">
          {getIcon()}
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <h3 className="text-white font-medium">{notification.title}</h3>
            <div className="flex gap-2">
              {!notification.read && (
                <button 
                  onClick={() => onMarkAsRead(notification.id)}
                  className="text-primary hover:text-primary/80 p-1 rounded-full hover:bg-primary/10 transition-colors"
                  title="Mark as read"
                >
                  <CheckCircleIcon className="w-5 h-5" />
                </button>
              )}
              <button 
                onClick={() => onDelete(notification.id)}
                className="text-gray-400 hover:text-red-400 p-1 rounded-full hover:bg-red-400/10 transition-colors"
                title="Delete notification"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p className="text-gray-300 mt-1">{notification.message}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-400">{notification.time}</span>
            {notification.actionText && (
              <button 
                className="text-xs text-primary hover:text-primary/80 font-medium"
                onClick={notification.onAction}
              >
                {notification.actionText}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Notifications = () => {
  const navigate = useNavigate();
  const { 
    notifications, 
    markAsRead, 
    deleteNotification, 
    markAllAsRead,
    clearAllNotifications,
    filterType,
    setFilterType
  } = useNotifications();

  const [filteredNotifications, setFilteredNotifications] = useState([]);

  useEffect(() => {
    if (filterType === 'all') {
      setFilteredNotifications(notifications);
    } else if (filterType === 'unread') {
      setFilteredNotifications(notifications.filter(n => !n.read));
    } else {
      setFilteredNotifications(notifications.filter(n => n.type === filterType));
    }
  }, [notifications, filterType]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <div className="flex items-center gap-3">
          <BellIcon className="w-7 h-7 text-primary" />
          <h1 className="text-3xl font-bold text-white">Notifications</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-4 py-2 text-sm text-primary hover:text-primary/80 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
          >
            <CheckCircleIcon className="w-5 h-5" />
            Mark all as read
          </button>
          <button 
            onClick={clearAllNotifications}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 bg-red-400/10 hover:bg-red-400/20 rounded-lg transition-colors"
          >
            <TrashIcon className="w-5 h-5" />
            Clear all
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex border-b border-gray-700">
        <button 
          className={`px-4 py-2 text-sm font-medium transition-colors ${filterType === 'all' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setFilterType('all')}
        >
          All
        </button>
        <button 
          className={`px-4 py-2 text-sm font-medium transition-colors ${filterType === 'unread' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setFilterType('unread')}
        >
          Unread
        </button>
        <button 
          className={`px-4 py-2 text-sm font-medium transition-colors ${filterType === 'alert' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setFilterType('alert')}
        >
          Alerts
        </button>
        <button 
          className={`px-4 py-2 text-sm font-medium transition-colors ${filterType === 'success' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setFilterType('success')}
        >
          Success
        </button>
        <button 
          className={`px-4 py-2 text-sm font-medium transition-colors ${filterType === 'info' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setFilterType('info')}
        >
          Info
        </button>
      </div>

      {/* Notifications list */}
      <div className="bg-background-lighter rounded-xl shadow-neumorph overflow-hidden">
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-gray-700">
            {filteredNotifications.map(notification => (
              <NotificationItem 
                key={notification.id}
                notification={notification}
                onMarkAsRead={markAsRead}
                onDelete={deleteNotification}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <BellIcon className="w-12 h-12 text-gray-600" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No notifications</h3>
            <p className="text-gray-400">
              {filterType === 'all' 
                ? "You don't have any notifications at the moment." 
                : `You don't have any ${filterType === 'unread' ? 'unread' : filterType} notifications.`}
            </p>
            {filterType !== 'all' && (
              <button 
                className="mt-4 text-primary hover:text-primary/80"
                onClick={() => setFilterType('all')}
              >
                View all notifications
              </button>
            )}
          </div>
        )}
      </div>

      {/* Refresh button */}
      <div className="flex justify-center mt-6">
        <button 
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white bg-background-lighter hover:bg-background rounded-lg transition-colors shadow-neumorph"
          onClick={() => navigate(0)}
        >
          <ArrowPathIcon className="w-5 h-5" />
          Refresh notifications
        </button>
      </div>
    </div>
  );
};

export default Notifications;
