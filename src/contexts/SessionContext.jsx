import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';

const SessionContext = createContext();

// Session timeout in milliseconds (5 minutes)
const SESSION_TIMEOUT = 5 * 60 * 1000;
// Warning threshold in milliseconds (1 minute)
const WARNING_THRESHOLD = 60 * 1000;

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export const SessionProvider = ({ children }) => {
  const { logout, isAuthenticated } = useAuth();
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [timer, setTimer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(SESSION_TIMEOUT);
  const [showWarning, setShowWarning] = useState(false);

  // Function to reset the session timer
  const resetTimer = useCallback(() => {
    setLastActivity(Date.now());
    setTimeRemaining(SESSION_TIMEOUT);
    setShowWarning(false);
  }, []);

  // Function to track user activity
  const trackActivity = useCallback(() => {
    if (isAuthenticated) {
      resetTimer();
    }
  }, [isAuthenticated, resetTimer]);

  // Set up activity listeners
  useEffect(() => {
    if (isAuthenticated) {
      // Track various user activities
      const activityEvents = [
        'mousedown', 'mousemove', 'keydown', 
        'scroll', 'touchstart', 'click', 'focus'
      ];
      
      // Add event listeners for all activity events
      activityEvents.forEach(event => {
        window.addEventListener(event, trackActivity);
      });
      
      // Clean up event listeners
      return () => {
        activityEvents.forEach(event => {
          window.removeEventListener(event, trackActivity);
        });
      };
    }
  }, [isAuthenticated, trackActivity]);

  // Set up the session timeout timer
  useEffect(() => {
    let newTimer = null;
    
    if (isAuthenticated) {
      // Clear any existing timer
      if (timer) clearInterval(timer);
      
      // Set up a new timer that checks every second
      newTimer = setInterval(() => {
        const elapsed = Date.now() - lastActivity;
        const remaining = Math.max(0, SESSION_TIMEOUT - elapsed);
        setTimeRemaining(remaining);
        
        // Show warning when 1 minute remaining
        if (remaining <= WARNING_THRESHOLD && remaining > 0 && !showWarning) {
          setShowWarning(true);
        }
        
        // Logout when time is up
        if (remaining <= 0) {
          clearInterval(newTimer);
          logout();
        }
      }, 1000);
      
      setTimer(newTimer);
    } else {
      // Clear timer if not authenticated
      if (timer) {
        clearInterval(timer);
      }
    }
    
    // Clean up timer on unmount
    return () => {
      if (newTimer) clearInterval(newTimer);
      if (timer) clearInterval(timer);
    };
  }, [isAuthenticated, lastActivity, logout, showWarning, timer]);

  // Format time remaining for display (mm:ss)
  const formatTimeRemaining = useCallback(() => {
    const totalSeconds = Math.ceil(timeRemaining / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }, [timeRemaining]);

  return (
    <SessionContext.Provider 
      value={{ 
        resetTimer, 
        timeRemaining, 
        formatTimeRemaining, 
        showWarning,
        setShowWarning
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
