import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  LinkIcon,
  UserCircleIcon,
  DocumentCheckIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  BellIcon
} from '@heroicons/react/24/outline';

// Import notification context
import { useNotifications } from '../contexts/NotificationContext';

const StatCard = ({ title, value, change, icon: Icon, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -5 }}
    className="bg-background-lighter p-6 rounded-xl shadow-neumorph hover:shadow-lg transition-all duration-300 cursor-pointer"
    onClick={onClick}
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-400">{title}</p>
        <h3 className="text-2xl font-bold text-white mt-2">{value}</h3>
        <p className={`mt-2 ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
        </p>
      </div>
      <div className="p-3 bg-primary/20 rounded-lg">
        <Icon className="w-6 h-6 text-primary" />
      </div>
    </div>
  </motion.div>
);

const DetailModal = ({ candidate, onClose }) => {
  if (!candidate) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-background-lighter p-6 rounded-xl shadow-neumorph max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <UserCircleIcon className="w-24 h-24 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-white">{candidate.name}</h2>
          <p className="text-gray-400">{candidate.position}</p>
          <p className="text-sm text-gray-500">{candidate.company}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-background/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Status Information</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    candidate.status === 'Verified' ? 'bg-green-500/20 text-green-400' :
                    candidate.status === 'Pending' ? 'bg-primary/20 text-primary' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {candidate.status}
                  </span>
                </div>
                <p className="text-gray-400">Documents: {candidate.documents}</p>
                <p className="text-gray-400">Time Left: {candidate.timeLeft}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg text-white transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const VerificationCard = ({ candidate, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    onClick={() => onClick(candidate)}
    className="bg-background-lighter p-4 rounded-lg shadow-neumorph hover:shadow-lg transition-all duration-300 cursor-pointer"
  >
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-primary/20 rounded-lg">
          <UserCircleIcon className="w-10 h-10 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{candidate.name}</h3>
          <p className="text-gray-400">{candidate.position}</p>
          <p className="text-sm text-gray-500 mt-1">{candidate.company}</p>
        </div>
      </div>
      <div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          candidate.status === 'Verified' ? 'bg-green-500/20 text-green-400' :
          candidate.status === 'Pending' ? 'bg-primary/20 text-primary' :
          'bg-red-500/20 text-red-400'
        }`}>
          {candidate.status}
        </span>
      </div>
    </div>
    <div className="mt-4 flex gap-4 text-sm">
      <div className="flex items-center gap-1">
        <DocumentCheckIcon className="w-4 h-4 text-gray-400" />
        <span className="text-gray-400">{candidate.documents} Documents</span>
      </div>
      <div className="flex items-center gap-1">
        <ClockIcon className="w-4 h-4 text-gray-400" />
        <span className="text-gray-400">{candidate.timeLeft}</span>
      </div>
    </div>
  </motion.div>
);

const Overview = () => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('7');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Use the notification context
  const { 
    notifications, 
    markAllAsRead, 
    getUnreadCount 
  } = useNotifications();
  
  // Stats
  const stats = [
    {
      title: 'Total Candidates',
      value: '1,234',
      change: 12,
      icon: UserCircleIcon
    },
    {
      title: 'Verified',
      value: '856',
      change: 8,
      icon: DocumentCheckIcon
    },
    {
      title: 'Pending',
      value: '378',
      change: -5,
      icon: ClockIcon
    },
    {
      title: 'Flagged',
      value: '45',
      change: 15,
      icon: ExclamationTriangleIcon
    }
  ];

  const handleStatCardClick = (statTitle) => {
    navigate('/status', { state: { filter: statTitle } });
  };

  const recentCandidates = [
    {
      id: 1,
      name: 'John Smith',
      position: 'Software Engineer',
      company: 'Tech Corp',
      status: 'Verified',
      documents: 5,
      timeLeft: 'Completed'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      position: 'Product Manager',
      company: 'Innovation Inc',
      status: 'Pending',
      documents: 3,
      timeLeft: '2 days left'
    },
    {
      id: 3,
      name: 'Michael Brown',
      position: 'Data Analyst',
      company: 'Data Solutions',
      status: 'Flagged',
      documents: 4,
      timeLeft: 'Action required'
    }
  ];

  const handleCandidateClick = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleViewAll = () => {
    navigate('/status');
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleViewAllNotifications = () => {
    setShowNotifications(false);
    navigate('/notifications');
  };

  const unreadCount = getUnreadCount();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <h1 className="text-3xl font-bold text-white">Overview</h1>
        <div className="flex items-center gap-4">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="bg-background-lighter text-gray-300 border border-gray-700 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
          </select>
          
          {/* Notification Bell */}
          <div className="relative">
            <button 
              className="p-2 hover:bg-background-lighter rounded-lg transition-colors duration-200 relative"
              onClick={toggleNotifications}
            >
              <BellIcon className="w-6 h-6 text-gray-400 hover:text-primary" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {/* Notification Dropdown */}
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-80 bg-background-lighter rounded-xl shadow-neumorph z-50"
              >
                <div className="p-3 border-b border-gray-700 flex justify-between items-center">
                  <h3 className="font-medium text-white">Notifications</h3>
                  {unreadCount > 0 && (
                    <button 
                      className="text-xs text-primary hover:text-primary/80"
                      onClick={markAllAsRead}
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.slice(0, 5).map(notification => (
                      <div 
                        key={notification.id} 
                        className={`p-3 border-b border-gray-700 hover:bg-background/50 ${!notification.read ? 'bg-primary/5' : ''}`}
                      >
                        <div className="flex justify-between">
                          <p className="text-sm text-white">{notification.title || notification.message}</p>
                          {!notification.read && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-400">No notifications</div>
                  )}
                </div>
                <div className="p-2 text-center border-t border-gray-700">
                  <button 
                    className="text-xs text-primary hover:text-primary/80"
                    onClick={handleViewAllNotifications}
                  >
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </div>
          
          <button className="p-2 hover:bg-background-lighter rounded-lg transition-colors duration-200">
            <LinkIcon className="w-5 h-5 text-gray-400 hover:text-primary" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard 
            key={index} 
            {...stat} 
            onClick={() => handleStatCardClick(stat.title)}
          />
        ))}
      </div>

      <div className="bg-background-lighter p-6 rounded-xl shadow-neumorph">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Recent Verifications</h2>
          <button 
            className="text-primary hover:text-primary/80 transition-colors duration-200"
            onClick={handleViewAll}
          >
            View All
          </button>
        </div>
        <div className="space-y-4">
          {recentCandidates.map((candidate, index) => (
            <VerificationCard 
              key={index} 
              candidate={candidate} 
              onClick={handleCandidateClick}
            />
          ))}
        </div>
      </div>

      {selectedCandidate && (
        <DetailModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
    </div>
  );
};

export default Overview;
