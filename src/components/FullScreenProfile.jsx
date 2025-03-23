import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import ReactDOM from 'react-dom';

const CircularProgress = ({ progress, status }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'verified': return '#22C55E';
      case 'pending': return '#3B82F6';
      case 'flagged': return '#EF4444';
      default: return '#3B82F6';
    }
  };

  return (
    <div className="relative">
      <svg className="transform -rotate-90 w-[140px] h-[140px]">
        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-gray-700"
        />
        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke={getStatusColor()}
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white">
        {progress}%
      </div>
    </div>
  );
};

const FullScreenProfile = ({ candidate, onClose }) => {
  const [showQueryForm, setShowQueryForm] = useState(false);
  const [queryText, setQueryText] = useState('');
  const [querySent, setQuerySent] = useState(false);

  // Prevent body scrolling when the full-screen profile is open
  useEffect(() => {
    // Save the current overflow style
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Prevent scrolling on the body
    document.body.style.overflow = 'hidden';
    
    // Restore original overflow style when component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  if (!candidate) return null;

  const handleSubmitQuery = (e) => {
    e.preventDefault();
    if (queryText.trim()) {
      // In a real app, this would send the query to a backend
      console.log('Query submitted:', queryText, 'for candidate:', candidate.id);
      setQuerySent(true);
      setTimeout(() => {
        setShowQueryForm(false);
        setQueryText('');
        setQuerySent(false);
      }, 2000);
    }
  };

  const profileContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background z-[100] overflow-hidden"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh' }}
    >
      <div className="min-h-screen p-4 md:p-8 ml-0">
        {/* Header with close button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Candidate Profile</h1>
          <motion.button
            onClick={onClose}
            className="p-2 rounded-full bg-background-lighter hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <XMarkIcon className="w-6 h-6 text-gray-300" />
          </motion.button>
        </div>

        {/* Main content with fixed sidebar and scrollable main area */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Personal info (Fixed) */}
          <div className="lg:w-1/3 xl:w-1/4">
            <div className="bg-background-lighter rounded-xl p-6 shadow-neumorph sticky top-8">
              <div className="flex flex-col items-center mb-6">
                <img
                  src={candidate.photo}
                  alt={candidate.name}
                  className="w-40 h-40 rounded-full object-cover border-4 border-primary mb-4"
                />
                <h2 className="text-2xl font-bold text-white">{candidate.name}</h2>
                <p className="text-gray-400">{candidate.mobile}</p>
                <p className="text-gray-400 mt-1">{candidate.email}</p>
                
                <div className={`mt-4 px-4 py-2 rounded-full text-sm inline-block
                  ${candidate.status === 'Verified' ? 'bg-green-900/30 text-green-400' :
                    candidate.status === 'Pending' ? 'bg-blue-900/30 text-blue-400' :
                    'bg-red-900/30 text-red-400'}`}>
                  {candidate.status}
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <div className="space-y-2">
                  <p className="text-gray-300">
                    <span className="font-medium text-gray-400">Location:</span> {candidate.location}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium text-gray-400">Position:</span> {candidate.position}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium text-gray-400">Experience:</span> {candidate.experience}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <AnimatePresence mode="wait">
                  {!showQueryForm ? (
                    <motion.button
                      key="query-button"
                      type="button"
                      onClick={() => setShowQueryForm(true)}
                      className="w-full px-6 py-3 bg-gradient-to-b from-background-lighter to-background text-white rounded-xl font-medium shadow-neumorph transition-all duration-300 flex items-center justify-center gap-2 transform-gpu hover:scale-105 relative overflow-hidden"
                      whileHover={{ 
                        boxShadow: "0 10px 25px -5px rgba(31, 41, 55, 0.4)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
                        animate={{
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <span className="relative z-10">Raise a Query</span>
                      <motion.svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="w-5 h-5 relative z-10" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        initial={{ x: 0 }}
                        animate={{ x: [0, 5, 0] }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity, 
                          ease: [0.4, 0.0, 0.2, 1] 
                        }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </motion.svg>
                    </motion.button>
                  ) : (
                    <motion.form
                      key="query-form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      onSubmit={handleSubmitQuery}
                      className="bg-background/50 rounded-xl p-4 border border-gray-700"
                    >
                      <h3 className="text-lg font-medium text-white mb-3">Submit Your Query</h3>
                      {querySent ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-green-400 py-2 text-center"
                        >
                          Query sent successfully!
                        </motion.div>
                      ) : (
                        <>
                          <textarea
                            value={queryText}
                            onChange={(e) => setQueryText(e.target.value)}
                            placeholder="Type your query about this candidate..."
                            className="w-full bg-background rounded-lg border border-gray-700 p-3 text-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent mb-3"
                            rows={4}
                          />
                          <div className="flex justify-between">
                            <button
                              type="button"
                              onClick={() => setShowQueryForm(false)}
                              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg text-white transition-colors flex items-center gap-2"
                            >
                              <span>Send Query</span>
                              <PaperAirplaneIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </>
                      )}
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right column - Scrollable content */}
          <div className="lg:w-2/3 xl:w-3/4 space-y-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
            {/* Verification progress */}
            <div className="bg-background-lighter rounded-xl p-6 shadow-neumorph">
              <h3 className="text-xl font-semibold text-white mb-4">Verification Progress</h3>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <CircularProgress progress={candidate.progress} status={candidate.status} />
                <div className="space-y-3">
                  <p className="text-gray-300">
                    <span className="font-medium text-gray-400">Status:</span> {candidate.status}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium text-gray-400">Started:</span> {candidate.startDate}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium text-gray-400">Expected Completion:</span> {candidate.expectedCompletion}
                  </p>
                </div>
              </div>
            </div>

            {/* Document status */}
            <div className="bg-background-lighter rounded-xl p-6 shadow-neumorph">
              <h3 className="text-xl font-semibold text-white mb-4">Verification Status</h3>
              <div className="grid grid-cols-1 gap-4">
                {/* Identity Verification */}
                <div className="bg-background/50 p-4 rounded-lg">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <div>
                      <h4 className="text-white font-medium">Identity Verification</h4>
                      <p className="text-gray-300 mt-1 text-sm">
                        Document: {candidate.documents.find(doc => doc.type === 'Identity Verification')?.name || 'Not submitted'}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      (candidate.documents.find(doc => doc.type === 'Identity Verification')?.status === 'Verified') ? 'bg-green-500/20 text-green-400' :
                      (candidate.documents.find(doc => doc.type === 'Identity Verification')?.status === 'Pending') ? 'bg-primary/20 text-primary' :
                      (candidate.documents.find(doc => doc.type === 'Identity Verification')?.status === 'Flagged') ? 'bg-red-500/20 text-red-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {candidate.documents.find(doc => doc.type === 'Identity Verification')?.status || 'Not started'}
                    </span>
                  </div>
                </div>

                {/* Address Verification */}
                <div className="bg-background/50 p-4 rounded-lg">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <div>
                      <h4 className="text-white font-medium">Address Verification</h4>
                      <p className="text-gray-300 mt-1 text-sm">
                        Document: {candidate.documents.find(doc => doc.type === 'Address Verification')?.name || 'Not submitted'}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      (candidate.documents.find(doc => doc.type === 'Address Verification')?.status === 'Verified') ? 'bg-green-500/20 text-green-400' :
                      (candidate.documents.find(doc => doc.type === 'Address Verification')?.status === 'Pending') ? 'bg-primary/20 text-primary' :
                      (candidate.documents.find(doc => doc.type === 'Address Verification')?.status === 'Flagged') ? 'bg-red-500/20 text-red-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {candidate.documents.find(doc => doc.type === 'Address Verification')?.status || 'Not started'}
                    </span>
                  </div>
                </div>

                {/* Academic Verification */}
                <div className="bg-background/50 p-4 rounded-lg">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <div>
                      <h4 className="text-white font-medium">Academic Verification</h4>
                      <p className="text-gray-300 mt-1 text-sm">
                        Document: {candidate.documents.find(doc => doc.type === 'Academic Verification')?.name || 'Not submitted'}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      (candidate.documents.find(doc => doc.type === 'Academic Verification')?.status === 'Verified') ? 'bg-green-500/20 text-green-400' :
                      (candidate.documents.find(doc => doc.type === 'Academic Verification')?.status === 'Pending') ? 'bg-primary/20 text-primary' :
                      (candidate.documents.find(doc => doc.type === 'Academic Verification')?.status === 'Flagged') ? 'bg-red-500/20 text-red-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {candidate.documents.find(doc => doc.type === 'Academic Verification')?.status || 'Not started'}
                    </span>
                  </div>
                </div>

                {/* Employment Records */}
                <div className="bg-background/50 p-4 rounded-lg">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <div>
                      <h4 className="text-white font-medium">Employment Records</h4>
                      <p className="text-gray-300 mt-1 text-sm">
                        Document: {candidate.documents.find(doc => doc.type === 'Employment Records')?.name || 'Not submitted'}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      (candidate.documents.find(doc => doc.type === 'Employment Records')?.status === 'Verified') ? 'bg-green-500/20 text-green-400' :
                      (candidate.documents.find(doc => doc.type === 'Employment Records')?.status === 'Pending') ? 'bg-primary/20 text-primary' :
                      (candidate.documents.find(doc => doc.type === 'Employment Records')?.status === 'Flagged') ? 'bg-red-500/20 text-red-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {candidate.documents.find(doc => doc.type === 'Employment Records')?.status || 'Not started'}
                    </span>
                  </div>
                </div>

                {/* Credit Report */}
                <div className="bg-background/50 p-4 rounded-lg">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <div>
                      <h4 className="text-white font-medium">Credit Report</h4>
                      <p className="text-gray-300 mt-1 text-sm">
                        Document: {candidate.documents.find(doc => doc.type === 'Credit Report')?.name || 'Not submitted'}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      (candidate.documents.find(doc => doc.type === 'Credit Report')?.status === 'Verified') ? 'bg-green-500/20 text-green-400' :
                      (candidate.documents.find(doc => doc.type === 'Credit Report')?.status === 'Pending') ? 'bg-primary/20 text-primary' :
                      (candidate.documents.find(doc => doc.type === 'Credit Report')?.status === 'Flagged') ? 'bg-red-500/20 text-red-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {candidate.documents.find(doc => doc.type === 'Credit Report')?.status || 'Not started'}
                    </span>
                  </div>
                </div>

                {/* Professional License Verification */}
                <div className="bg-background/50 p-4 rounded-lg">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <div>
                      <h4 className="text-white font-medium">Professional License Verification</h4>
                      <p className="text-gray-300 mt-1 text-sm">
                        Document: {candidate.documents.find(doc => doc.type === 'Professional License')?.name || 'Not submitted'}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      (candidate.documents.find(doc => doc.type === 'Professional License')?.status === 'Verified') ? 'bg-green-500/20 text-green-400' :
                      (candidate.documents.find(doc => doc.type === 'Professional License')?.status === 'Pending') ? 'bg-primary/20 text-primary' :
                      (candidate.documents.find(doc => doc.type === 'Professional License')?.status === 'Flagged') ? 'bg-red-500/20 text-red-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {candidate.documents.find(doc => doc.type === 'Professional License')?.status || 'Not started'}
                    </span>
                  </div>
                </div>

                {/* Reference Verification */}
                <div className="bg-background/50 p-4 rounded-lg">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <div>
                      <h4 className="text-white font-medium">Reference Verification</h4>
                      <p className="text-gray-300 mt-1 text-sm">
                        Document: {candidate.documents.find(doc => doc.type === 'Reference Verification')?.name || 'Not submitted'}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      (candidate.documents.find(doc => doc.type === 'Reference Verification')?.status === 'Verified') ? 'bg-green-500/20 text-green-400' :
                      (candidate.documents.find(doc => doc.type === 'Reference Verification')?.status === 'Pending') ? 'bg-primary/20 text-primary' :
                      (candidate.documents.find(doc => doc.type === 'Reference Verification')?.status === 'Flagged') ? 'bg-red-500/20 text-red-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {candidate.documents.find(doc => doc.type === 'Reference Verification')?.status || 'Not started'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-background-lighter rounded-xl p-6 shadow-neumorph">
              <h3 className="text-xl font-semibold text-white mb-4">Notes</h3>
              <p className="text-gray-300 whitespace-pre-line">{candidate.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Use portal to render outside the layout hierarchy
  return ReactDOM.createPortal(
    profileContent,
    document.body
  );
};

export default FullScreenProfile;
