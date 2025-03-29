import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import {
  HomeIcon,
  Cog6ToothIcon,
  UserPlusIcon,
  ChartBarIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  XMarkIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import logo from '../assets/logo.svg';
import frLogo from '../assets/fr_logo.png';

const Layout = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { userName, logout } = useAuth();
  const { getUnreadCount } = useNotifications();
  const location = useLocation();
  const unreadCount = getUnreadCount();

  const handleLogout = () => {
    setShowProfileMenu(false);
    logout();
  };

  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Overview' },
    { path: '/status', icon: ChartBarIcon, label: 'View Status' },
    { path: '/add-candidate', icon: UserPlusIcon, label: 'Add Candidate' },
    { 
      path: '/notifications', 
      icon: BellIcon, 
      label: 'Notifications',
      badge: unreadCount > 0 ? unreadCount : null
    },
    { path: '/settings', icon: Cog6ToothIcon, label: 'Settings' }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <motion.div
        className="fixed h-screen flex flex-col bg-gradient-to-b from-background-lighter to-background shadow-neumorph z-50 overflow-hidden"
        initial={{ width: '5.5rem' }}
        animate={{ width: isHovered ? '16rem' : '5.5rem' }}
        transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-[4.5rem] border-b border-primary/5">
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              {isHovered ? (
                <motion.div
                  key="fullLogo"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
                  className="px-2"
                >
                  <motion.img 
                    src={frLogo} 
                    alt="BVC Full Logo" 
                    className="h-10 filter brightness-0 invert sepia(100%) saturate(10000%) hue-rotate(200deg)"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="icon"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
                >
                  <motion.img 
                    src={logo} 
                    alt="BVC Logo" 
                    className="w-8 h-8 transform transition-transform duration-300 ease-in-out hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <nav className="flex-1 mt-4 px-2">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`group relative flex items-center w-full px-3 py-3 mb-2 rounded-lg transition-all duration-300 ease-in-out
                    ${location.pathname === item.path 
                      ? 'text-primary bg-gradient-to-r from-primary/10 via-primary/5 to-transparent before:absolute before:left-0 before:w-0.5 before:h-[85%] before:top-[7.5%] before:bg-gradient-to-b before:from-primary/0 before:via-primary before:to-primary/0 before:opacity-100 before:scale-y-100' 
                      : 'text-gray-400 hover:text-primary hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent'}`
                  }
                >
                  <div className="absolute left-0 top-[7.5%] w-0.5 h-[85%] rounded-full bg-gradient-to-b from-primary/0 via-primary to-primary/0 opacity-0 transform scale-y-0 origin-center transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-y-100" />
                  <item.icon className="w-8 h-8 min-w-[2rem] transform transition-transform duration-300 ease-in-out group-hover:scale-110" />
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="ml-3 whitespace-nowrap font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                  {/* Badge for notifications */}
                  {item.badge && (
                    <motion.div
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ 
                        scale: 1, 
                        opacity: 1,
                        width: isHovered ? '1.25rem' : '1rem',
                        height: isHovered ? '1.25rem' : '1rem'
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {isHovered && item.badge}
                    </motion.div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-primary/5">
          <AnimatePresence mode="wait">
            {!showProfileMenu ? (
              <motion.button
                key="profile"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowProfileMenu(true)}
                className="group relative flex items-center w-full px-3 py-3 rounded-lg transition-all duration-300 ease-in-out text-gray-400 hover:text-primary hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent"
              >
                <div className="absolute left-0 top-[7.5%] w-0.5 h-[85%] rounded-full bg-gradient-to-b from-primary/0 via-primary to-primary/0 opacity-0 transform scale-y-0 origin-center transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-y-100" />
                <UserCircleIcon className="w-8 h-8 min-w-[2rem] transform transition-transform duration-300 ease-in-out group-hover:scale-110" />
                {isHovered && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="ml-3 whitespace-nowrap font-medium"
                  >
                    {userName}
                  </motion.span>
                )}
              </motion.button>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-2"
              >
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.1 }}
                  onClick={handleLogout}
                  className="group relative flex items-center w-full px-3 py-3 rounded-lg text-gray-400 hover:text-primary hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent transition-all duration-300 ease-in-out"
                >
                  <div className="absolute left-0 top-[7.5%] w-0.5 h-[85%] rounded-full bg-gradient-to-b from-primary/0 via-primary to-primary/0 opacity-0 transform scale-y-0 origin-center transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-y-100" />
                  <ArrowLeftOnRectangleIcon className="w-8 h-8 min-w-[2rem] transform transition-transform duration-300 ease-in-out group-hover:scale-110" />
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-3 font-medium"
                    >
                      Logout
                    </motion.span>
                  )}
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => setShowProfileMenu(false)}
                  className="group relative flex items-center w-full px-3 py-3 rounded-lg text-gray-400 hover:text-primary hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent transition-all duration-300 ease-in-out"
                >
                  <div className="absolute left-0 top-[7.5%] w-0.5 h-[85%] rounded-full bg-gradient-to-b from-primary/0 via-primary to-primary/0 opacity-0 transform scale-y-0 origin-center transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-y-100" />
                  <XMarkIcon className="w-8 h-8 min-w-[2rem] transform transition-transform duration-300 ease-in-out group-hover:scale-110" />
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-3 font-medium"
                    >
                      Cancel
                    </motion.span>
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className={`flex-1 ${isHovered ? 'ml-64' : 'ml-[5.5rem]'} min-h-screen bg-gradient-to-br from-background via-background to-background-lighter transition-all duration-300 ease-[0.4,0.0,0.2,1]`}>
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
