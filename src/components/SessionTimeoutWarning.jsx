import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from '../contexts/SessionContext';
import { XMarkIcon } from '@heroicons/react/24/outline';

const SessionTimeoutWarning = () => {
  const { showWarning, setShowWarning, formatTimeRemaining, resetTimer } = useSession();

  const handleStayLoggedIn = () => {
    resetTimer();
    setShowWarning(false);
  };

  return (
    <AnimatePresence>
      {showWarning && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className="bg-background-lighter rounded-xl p-4 shadow-neumorph border border-primary/20 max-w-md">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium text-primary">Session Timeout Warning</h3>
              <button
                onClick={() => setShowWarning(false)}
                className="p-1 rounded-full hover:bg-background transition-colors"
              >
                <XMarkIcon className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <p className="text-gray-300 mb-3">
              Your session will expire in <span className="text-primary font-medium">{formatTimeRemaining()}</span> due to inactivity.
            </p>
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStayLoggedIn}
                className="px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg font-medium transform-gpu"
              >
                Stay Logged In
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SessionTimeoutWarning;
