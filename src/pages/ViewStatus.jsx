import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import FullScreenProfile from '../components/FullScreenProfile';
import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

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

const CandidateCard = ({ candidate, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-background-lighter rounded-xl p-4 shadow-neumorph hover:shadow-neumorph-inset transition-shadow duration-300 cursor-pointer mb-4"
      onClick={() => onClick(candidate)}
    >
      <div className="flex items-center">
        <div className="relative flex-shrink-0 mr-4">
          <CircularProgress progress={candidate.progress} status={candidate.status} />
          <img
            src={candidate.photo}
            alt={candidate.name}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full object-cover border-4 border-background"
          />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-white">{candidate.name}</h3>
              <p className="text-gray-400">{candidate.mobile}</p>
              <p className="text-gray-500">{candidate.position} • {candidate.location}</p>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium
              ${candidate.status === 'Verified' ? 'bg-green-900/30 text-green-400' :
                candidate.status === 'Pending' ? 'bg-blue-900/30 text-blue-400' :
                'bg-red-900/30 text-red-400'}`}>
              {candidate.status}
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Started: {candidate.startDate}</p>
              <p className="text-sm text-gray-400">Expected Completion: {candidate.expectedCompletion}</p>
            </div>
            <button className="text-primary hover:text-primary/80 bg-primary/10 hover:bg-primary/20 px-3 py-1 rounded-lg transition-colors text-sm">
              View Details
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ViewStatus = () => {
  const { id } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const candidatesPerPage = 9;

  // Mock data with Indian names and details
  const mockData = useMemo(() => [
    {
      id: 1,
      name: 'Rajesh Kumar',
      mobile: '+91 98765 43210',
      email: 'rajesh.kumar@example.com',
      location: 'Mumbai, Maharashtra',
      position: 'Senior Software Engineer',
      experience: '5 years',
      photo: 'https://i.pravatar.cc/150?img=11',
      status: 'Verified',
      progress: 100,
      startDate: '2025-03-01',
      expectedCompletion: 'Completed',
      documents: [
        { type: 'Identity Verification', name: 'Aadhaar Card', status: 'Verified', description: 'Verify identity documents' },
        { type: 'Address Verification', name: 'Utility Bill', status: 'Verified', description: 'Verify residential address' },
        { type: 'Academic Verification', name: 'Degree Certificate', status: 'Verified', description: 'Verify educational qualifications' },
        { type: 'Employment Records', name: 'Experience Letters', status: 'Verified', description: 'Verify employment history' },
        { type: 'Credit Report', name: 'Credit History', status: 'Verified', description: 'Verify credit history' },
        { type: 'Professional License', name: 'Engineering License', status: 'Verified', description: 'Verify professional licenses' },
        { type: 'Reference Verification', name: 'Professional References', status: 'Verified', description: 'Verify professional references' }
      ],
      notes: 'All documents verified successfully. Background check completed with no issues.'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      mobile: '+91 98765 43211',
      email: 'priya.sharma@example.com',
      location: 'Bangalore, Karnataka',
      position: 'Product Manager',
      experience: '4 years',
      photo: 'https://i.pravatar.cc/150?img=5',
      status: 'Pending',
      progress: 60,
      startDate: '2025-03-15',
      expectedCompletion: '2025-03-22',
      documents: [
        { type: 'Identity Verification', name: 'Aadhaar Card', status: 'Verified', description: 'Verify identity documents' },
        { type: 'Address Verification', name: 'Utility Bill', status: 'Verified', description: 'Verify residential address' },
        { type: 'Academic Verification', name: 'Degree Certificate', status: 'Verified', description: 'Verify educational qualifications' },
        { type: 'Employment Records', name: 'Experience Letters', status: 'Pending', description: 'Verify employment history' },
        { type: 'Credit Report', name: 'Credit History', status: 'Pending', description: 'Verify credit history' },
        { type: 'Professional License', name: 'Product Management Certification', status: 'Verified', description: 'Verify professional licenses' },
        { type: 'Reference Verification', name: 'Professional References', status: 'Pending', description: 'Verify professional references' }
      ],
      notes: 'Awaiting verification of experience letters and PAN card details.'
    },
    {
      id: 3,
      name: 'Amit Patel',
      mobile: '+91 98765 43212',
      email: 'amit.patel@example.com',
      location: 'Delhi, NCR',
      position: 'UI/UX Designer',
      experience: '3 years',
      photo: 'https://i.pravatar.cc/150?img=12',
      status: 'Flagged',
      progress: 30,
      startDate: '2025-03-10',
      expectedCompletion: 'On Hold',
      documents: [
        { type: 'Identity Verification', name: 'Aadhaar Card', status: 'Flagged', description: 'Verify identity documents' },
        { type: 'Address Verification', name: 'Utility Bill', status: 'Pending', description: 'Verify residential address' },
        { type: 'Academic Verification', name: 'Degree Certificate', status: 'Pending', description: 'Verify educational qualifications' },
        { type: 'Employment Records', name: 'Experience Letters', status: 'Flagged', description: 'Verify employment history' },
        { type: 'Credit Report', name: 'Credit History', status: 'Pending', description: 'Verify credit history' },
        { type: 'Professional License', name: 'Design Certification', status: 'Verified', description: 'Verify professional licenses' },
        { type: 'Reference Verification', name: 'Professional References', status: 'Pending', description: 'Verify professional references' }
      ],
      notes: 'Discrepancies found in experience letters. Aadhaar card verification failed.'
    },
    {
      id: 4,
      name: 'Sunita Reddy',
      mobile: '+91 98765 43213',
      email: 'sunita.reddy@example.com',
      location: 'Hyderabad, Telangana',
      position: 'Data Scientist',
      experience: '6 years',
      photo: 'https://i.pravatar.cc/150?img=6',
      status: 'Verified',
      progress: 100,
      startDate: '2025-02-20',
      expectedCompletion: 'Completed',
      documents: [
        { name: 'Resume', status: 'Verified' },
        { name: 'Aadhaar Card', status: 'Verified' },
        { name: 'Education Certificates', status: 'Verified' },
        { name: 'Experience Letters', status: 'Verified' }
      ],
      notes: 'All documents verified successfully. Background check completed.'
    },
    {
      id: 5,
      name: 'Vikram Singh',
      mobile: '+91 98765 43214',
      email: 'vikram.singh@example.com',
      location: 'Chandigarh, Punjab',
      position: 'DevOps Engineer',
      experience: '4 years',
      photo: 'https://i.pravatar.cc/150?img=13',
      status: 'Pending',
      progress: 75,
      startDate: '2025-03-05',
      expectedCompletion: '2025-03-18',
      documents: [
        { name: 'Resume', status: 'Verified' },
        { name: 'PAN Card', status: 'Verified' },
        { name: 'Education Certificates', status: 'Verified' },
        { name: 'Experience Letters', status: 'Pending' }
      ],
      notes: 'Awaiting final verification of experience letters. All other documents verified.'
    },
    {
      id: 6,
      name: 'Meera Joshi',
      mobile: '+91 98765 43215',
      email: 'meera.joshi@example.com',
      location: 'Pune, Maharashtra',
      position: 'Frontend Developer',
      experience: '2 years',
      photo: 'https://i.pravatar.cc/150?img=7',
      status: 'Pending',
      progress: 40,
      startDate: '2025-03-12',
      expectedCompletion: '2025-03-25',
      documents: [
        { name: 'Resume', status: 'Verified' },
        { name: 'Aadhaar Card', status: 'Pending' },
        { name: 'Education Certificates', status: 'Verified' },
        { name: 'Experience Letters', status: 'Pending' }
      ],
      notes: 'Awaiting verification of Aadhaar card and experience letters.'
    },
    {
      id: 7,
      name: 'Arjun Nair',
      mobile: '+91 98765 43216',
      email: 'arjun.nair@example.com',
      location: 'Kochi, Kerala',
      position: 'Backend Developer',
      experience: '3 years',
      photo: 'https://i.pravatar.cc/150?img=14',
      status: 'Verified',
      progress: 100,
      startDate: '2025-02-25',
      expectedCompletion: 'Completed',
      documents: [
        { name: 'Resume', status: 'Verified' },
        { name: 'Aadhaar Card', status: 'Verified' },
        { name: 'Education Certificates', status: 'Verified' },
        { name: 'Experience Letters', status: 'Verified' }
      ],
      notes: 'All documents verified successfully. Background check completed.'
    },
    {
      id: 8,
      name: 'Kavita Gupta',
      mobile: '+91 98765 43217',
      email: 'kavita.gupta@example.com',
      location: 'Jaipur, Rajasthan',
      position: 'QA Engineer',
      experience: '4 years',
      photo: 'https://i.pravatar.cc/150?img=8',
      status: 'Flagged',
      progress: 20,
      startDate: '2025-03-08',
      expectedCompletion: 'On Hold',
      documents: [
        { name: 'Resume', status: 'Verified' },
        { name: 'PAN Card', status: 'Flagged' },
        { name: 'Education Certificates', status: 'Pending' },
        { name: 'Experience Letters', status: 'Flagged' }
      ],
      notes: 'Discrepancies found in experience letters and PAN card details. Verification on hold.'
    },
    {
      id: 9,
      name: 'Rahul Verma',
      mobile: '+91 98765 43218',
      email: 'rahul.verma@example.com',
      location: 'Ahmedabad, Gujarat',
      position: 'System Administrator',
      experience: '5 years',
      photo: 'https://i.pravatar.cc/150?img=15',
      status: 'Pending',
      progress: 50,
      startDate: '2025-03-14',
      expectedCompletion: '2025-03-28',
      documents: [
        { name: 'Resume', status: 'Verified' },
        { name: 'Aadhaar Card', status: 'Verified' },
        { name: 'Education Certificates', status: 'Pending' },
        { name: 'Experience Letters', status: 'Pending' }
      ],
      notes: 'Education certificates and experience letters under verification.'
    },
    {
      id: 10,
      name: 'Ananya Desai',
      mobile: '+91 98765 43219',
      email: 'ananya.desai@example.com',
      location: 'Chennai, Tamil Nadu',
      position: 'Project Manager',
      experience: '7 years',
      photo: 'https://i.pravatar.cc/150?img=9',
      status: 'Verified',
      progress: 100,
      startDate: '2025-02-18',
      expectedCompletion: 'Completed',
      documents: [
        { name: 'Resume', status: 'Verified' },
        { name: 'PAN Card', status: 'Verified' },
        { name: 'Education Certificates', status: 'Verified' },
        { name: 'Experience Letters', status: 'Verified' }
      ],
      notes: 'All documents verified successfully. Background check completed.'
    },
    {
      id: 11,
      name: 'Karthik Rajan',
      mobile: '+91 98765 43220',
      email: 'karthik.rajan@example.com',
      location: 'Coimbatore, Tamil Nadu',
      position: 'Network Engineer',
      experience: '3 years',
      photo: 'https://i.pravatar.cc/150?img=16',
      status: 'Pending',
      progress: 65,
      startDate: '2025-03-07',
      expectedCompletion: '2025-03-21',
      documents: [
        { name: 'Resume', status: 'Verified' },
        { name: 'Aadhaar Card', status: 'Verified' },
        { name: 'Education Certificates', status: 'Verified' },
        { name: 'Experience Letters', status: 'Pending' }
      ],
      notes: 'Awaiting verification of experience letters. All other documents verified.'
    },
    {
      id: 12,
      name: 'Neha Malhotra',
      mobile: '+91 98765 43221',
      email: 'neha.malhotra@example.com',
      location: 'Lucknow, Uttar Pradesh',
      position: 'HR Specialist',
      experience: '4 years',
      photo: 'https://i.pravatar.cc/150?img=10',
      status: 'Verified',
      progress: 100,
      startDate: '2025-02-28',
      expectedCompletion: 'Completed',
      documents: [
        { name: 'Resume', status: 'Verified' },
        { name: 'PAN Card', status: 'Verified' },
        { name: 'Education Certificates', status: 'Verified' },
        { name: 'Experience Letters', status: 'Verified' }
      ],
      notes: 'All documents verified successfully. Background check completed.'
    }
  ], []);

  // Set initial candidates data
  useEffect(() => {
    setCandidates(mockData);
  }, [mockData]);

  // Select candidate by ID from URL
  useEffect(() => {
    if (id) {
      const candidate = candidates.find(c => c.id === parseInt(id));
      if (candidate) {
        setSelectedCandidate(candidate);
      }
    }
  }, [id, candidates]);

  // Handle search input changes
  const handleSearchInputChange = useCallback((e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (!value.trim()) {
      setFilteredResults([]);
      return;
    }
    
    const formattedQuery = value.toLowerCase().replace(/\s+/g, '');
    const filtered = candidates.filter(candidate => 
      candidate.mobile.replace(/\s+/g, '').includes(formattedQuery) ||
      candidate.name.toLowerCase().includes(formattedQuery)
    );
    setFilteredResults(filtered);
  }, [candidates]);

  // Filter candidates based on search and status
  const displayedCandidates = useMemo(() => {
    let filtered = searchQuery ? filteredResults : candidates;
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(candidate => candidate.status === statusFilter);
    }
    
    return filtered;
  }, [candidates, searchQuery, statusFilter, filteredResults]);

  // Calculate pagination
  const totalPages = Math.ceil(displayedCandidates.length / candidatesPerPage);
  const startIndex = (currentPage - 1) * candidatesPerPage;
  const endIndex = startIndex + candidatesPerPage;
  const currentCandidates = displayedCandidates.slice(startIndex, endIndex);

  return (
    <div className="p-6 space-y-6">
      {/* Search and filter controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-white">Verification Status</h1>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Search input */}
          <div className="relative flex-grow md:flex-grow-0 md:min-w-[300px]">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search by mobile number..."
              className="w-full bg-background-lighter text-gray-300 border border-gray-700 rounded-lg px-4 py-2 pl-10 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilteredResults([]);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white"
              >
                ×
              </button>
            )}
          </div>
          
          <select 
            value={statusFilter} 
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1); // Reset to first page when filter changes
            }} 
            className="bg-background-lighter text-gray-300 border border-gray-700 rounded-lg px-4 py-2 pr-8 focus:ring-primary focus:border-primary appearance-none"
            style={{ 
              backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", 
              backgroundPosition: "right 0.5rem center", 
              backgroundRepeat: "no-repeat", 
              backgroundSize: "1.5em 1.5em" 
            }}
          >
            <option value="all">All Status</option>
            <option value="Verified">Verified</option>
            <option value="Pending">Pending</option>
            <option value="Flagged">Flagged</option>
          </select>
        </div>
      </div>

      {/* Filter and search status messages */}
      <div className="flex flex-wrap gap-2">
        {/* Status filter message */}
        {statusFilter !== 'all' && (
          <div className="text-gray-300 bg-background-lighter px-3 py-1 rounded-full text-sm flex items-center">
            <span>Filtered by: {statusFilter}</span>
            <button 
              onClick={() => {
                setStatusFilter('all');
                setCurrentPage(1);
              }}
              className="ml-2 text-gray-400 hover:text-white"
              aria-label="Clear status filter"
            >
              ×
            </button>
          </div>
        )}
        
        {/* Search results message */}
        {searchQuery.trim() && (
          <div className="text-gray-300 bg-background-lighter px-3 py-1 rounded-full text-sm flex items-center">
            {filteredResults.length === 0 ? (
              <span>No results found for "{searchQuery}"</span>
            ) : (
              <span>Found {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''}</span>
            )}
            <button 
              onClick={() => {
                setSearchQuery('');
                setFilteredResults([]);
              }}
              className="ml-2 text-gray-400 hover:text-white"
              aria-label="Clear search"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* No results message when both filters are applied but no matches */}
      {displayedCandidates.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-400 text-lg">No candidates match the current filters</p>
          <button
            onClick={() => {
              setStatusFilter('all');
              setSearchQuery('');
              setCurrentPage(1);
            }}
            className="mt-4 px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg text-white transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Candidate list (previously grid) */}
      {displayedCandidates.length > 0 && (
        <div className="space-y-4">
          {currentCandidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onClick={() => setSelectedCandidate(candidate)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg mr-2 ${
              currentPage === 1 
                ? 'text-gray-500 cursor-not-allowed' 
                : 'text-white hover:bg-background-lighter'
            }`}
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 mx-1 rounded-lg ${
                currentPage === index + 1
                  ? 'bg-primary text-white'
                  : 'bg-background-lighter text-gray-300 hover:bg-gray-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg ml-2 ${
              currentPage === totalPages 
                ? 'text-gray-500 cursor-not-allowed' 
                : 'text-white hover:bg-background-lighter'
            }`}
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Full screen profile */}
      <AnimatePresence>
        {selectedCandidate && (
          <FullScreenProfile
            candidate={selectedCandidate}
            onClose={() => setSelectedCandidate(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ViewStatus;
