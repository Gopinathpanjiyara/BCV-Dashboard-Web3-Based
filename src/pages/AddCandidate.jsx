import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  IdentificationIcon,
  HomeIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  CreditCardIcon,
  DocumentCheckIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

// Import verification components
import {
  IdentityVerification,
  AddressVerification,
  AcademicVerification,
  EmploymentVerification,
  CreditVerification,
  LicenseVerification,
  ReferenceVerification
} from './verification';

const AddCandidate = () => {
  const navigate = useNavigate();
  
  // Step state (1 = select verification types, 2 = fill form)
  const [currentStep, setCurrentStep] = useState(1);
  
  // Verification types
  const verificationTypes = [
    {
      id: 'identity',
      name: 'Identity Verification',
      description: 'Verify identity documents',
      icon: IdentificationIcon
    },
    {
      id: 'address',
      name: 'Address Verification',
      description: 'Verify residential address',
      icon: HomeIcon
    },
    {
      id: 'academic',
      name: 'Academic Verification',
      description: 'Verify educational qualifications',
      icon: AcademicCapIcon
    },
    {
      id: 'employment',
      name: 'Employment Records',
      description: 'Verify employment history',
      icon: BriefcaseIcon
    },
    {
      id: 'credit',
      name: 'Credit Report',
      description: 'Verify credit history',
      icon: CreditCardIcon
    },
    {
      id: 'license',
      name: 'Professional License Verification',
      description: 'Verify professional licenses',
      icon: DocumentCheckIcon
    },
    {
      id: 'reference',
      name: 'Reference Verification',
      description: 'Verify professional references',
      icon: UserGroupIcon
    }
  ];
  
  // Selected verification types
  const [selectedTypes, setSelectedTypes] = useState([]);
  
  // Basic candidate information
  const [basicInfo, setBasicInfo] = useState({
    name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    position: '',
    experience: '',
  });

  // State for verification data
  const [verificationData, setVerificationData] = useState({
    identity: {
      idType: '',
      idNumber: '',
      issueDate: '',
      expiryDate: '',
      issuingAuthority: '',
      document: null
    },
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      residenceSince: '',
      document: null
    },
    academic: {
      degrees: [
        {
          degree: '',
          field: '',
          institution: '',
          graduationDate: '',
          document: null
        }
      ]
    },
    employment: {
      history: [
        {
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          supervisor: '',
          document: null
        }
      ]
    },
    credit: {
      ssn: '',
      consent: false,
      document: null
    },
    license: {
      licenses: [
        {
          type: '',
          number: '',
          issuingAuthority: '',
          issueDate: '',
          expiryDate: '',
          document: null
        }
      ]
    },
    reference: {
      references: [
        {
          name: '',
          relationship: '',
          company: '',
          position: '',
          email: '',
          phone: '',
          document: null
        }
      ]
    }
  });

  // State for showing success message
  const [showSuccess, setShowSuccess] = useState(false);

  // Toggle selection of verification type
  const toggleVerificationType = (typeId) => {
    if (selectedTypes.includes(typeId)) {
      setSelectedTypes(selectedTypes.filter(id => id !== typeId));
    } else {
      setSelectedTypes([...selectedTypes, typeId]);
    }
  };
  
  // Proceed to next step
  const proceedToFormStep = () => {
    if (selectedTypes.length === 0) {
      alert('Please select at least one verification type');
      return;
    }
    setCurrentStep(2);
  };
  
  // Go back to verification type selection
  const goBackToSelection = () => {
    setCurrentStep(1);
  };
  
  // Handle basic info changes
  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setBasicInfo({
      ...basicInfo,
      [name]: value
    });
  };
  
  // Handle verification data changes
  const handleVerificationDataChange = (type, field, value, index = null) => {
    setVerificationData(prev => {
      const newData = { ...prev };
      
      if (index !== null) {
        // Handle array fields (like degrees, employment history)
        if (typeof value === 'object') {
          // For updating a specific field in an object within an array
          newData[type][field][index] = {
            ...newData[type][field][index],
            ...value
          };
        } else {
          // For updating a simple value
          newData[type][field][index] = value;
        }
      } else {
        // Handle simple fields
        newData[type][field] = value;
      }
      
      return newData;
    });
  };

  // Function to add a new item to an array in verification data
  const addArrayItem = (type, arrayName) => {
    setVerificationData(prev => {
      const newData = { ...prev };
      
      // Define empty templates for each array type
      const templates = {
        academic: {
          degrees: {
            degree: '',
            field: '',
            institution: '',
            graduationDate: '',
            document: null
          }
        },
        employment: {
          history: {
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            supervisor: '',
            document: null
          }
        },
        license: {
          licenses: {
            type: '',
            number: '',
            issuingAuthority: '',
            issueDate: '',
            expiryDate: '',
            document: null
          }
        },
        reference: {
          references: {
            name: '',
            relationship: '',
            company: '',
            position: '',
            email: '',
            phone: '',
            document: null
          }
        }
      };
      
      // Add a new item to the array
      if (templates[type] && templates[type][arrayName]) {
        newData[type][arrayName] = [...newData[type][arrayName], templates[type][arrayName]];
      }
      
      return newData;
    });
  };
  
  // Function to remove an item from an array in verification data
  const removeArrayItem = (type, arrayName, index) => {
    setVerificationData(prev => {
      const newData = { ...prev };
      
      // Remove the item at the specified index
      if (newData[type] && newData[type][arrayName] && newData[type][arrayName].length > index) {
        newData[type][arrayName] = newData[type][arrayName].filter((_, i) => i !== index);
      }
      
      return newData;
    });
  };
  
  // Handle file uploads
  const handleFileUpload = (type, field, e, index = null) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      handleVerificationDataChange(type, field, file, index);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json'
      };

      // First create the applicant
      const applicantData = {
        ...basicInfo,
      };
      console.log('Applicant data:', applicantData);

      // Create applicant
      const applicantResponse = await fetch('http://localhost:8000/api/applicants/', {
        method: 'POST',
        headers,
        body: JSON.stringify(applicantData)
      });

      if (!applicantResponse.ok) {
        throw new Error('Failed to create applicant');
      }

      const applicant = await applicantResponse.json();
      const applicantId = applicant.id;

      // Submit each verification type data
      for (const type of selectedTypes) {
        const typeData = verificationData[type];
        const formData = new FormData();

        switch(type) {
          case 'identity':
          case 'address':
          case 'credit':
            // Single document uploads
            if (typeData.document) {
              formData.append('document', typeData.document);
            }
            for (const [key, value] of Object.entries(typeData)) {
              if (key !== 'document') {
                formData.append(key, value);
              }
            }
            await fetch(`http://localhost:8000/api/applicants/${applicantId}/${type}/`, {
              method: 'POST',
              headers: { 'Authorization': `token ${token}` },
              body: formData
            });
            break;

          case 'academic':
            // Multiple academic records
            for (const degree of typeData.degrees) {
              const degreeFormData = new FormData();
              if (degree.document) {
                degreeFormData.append('document', degree.document);
              }
              for (const [key, value] of Object.entries(degree)) {
                if (key !== 'document') {
                  degreeFormData.append(key, value);
                }
              }
              await fetch(`http://localhost:8000/api/applicants/${applicantId}/academic/`, {
                method: 'POST',
                headers: { 'Authorization': `token ${token}` },
                body: degreeFormData
              });
            }
            break;

          case 'employment':
            // Multiple employment records
            for (const job of typeData.history) {
              const jobFormData = new FormData();
              if (job.document) {
                jobFormData.append('document', job.document);
              }
              for (const [key, value] of Object.entries(job)) {
                if (key !== 'document') {
                  jobFormData.append(key, value);
                }
              }
              await fetch(`http://localhost:8000/api/applicants/${applicantId}/employment/`, {
                method: 'POST',
                headers: { 'Authorization': `token ${token}` },
                body: jobFormData
              });
            }
            break;

          case 'license':
            // Multiple license records
            for (const license of typeData.licenses) {
              const licenseFormData = new FormData();
              if (license.document) {
                licenseFormData.append('document', license.document);
              }
              for (const [key, value] of Object.entries(license)) {
                if (key !== 'document') {
                  licenseFormData.append(key, value);
                }
              }
              await fetch(`http://localhost:8000/api/applicants/${applicantId}/license/`, {
                method: 'POST',
                headers: { 'Authorization': `token ${token}` },
                body: licenseFormData
              });
            }
            break;

          case 'reference':
            // Multiple reference records
            for (const reference of typeData.references) {
              const referenceFormData = new FormData();
              if (reference.document) {
                referenceFormData.append('document', reference.document);
              }
              for (const [key, value] of Object.entries(reference)) {
                if (key !== 'document') {
                  referenceFormData.append(key, value);
                }
              }
              await fetch(`http://localhost:8000/api/applicants/${applicantId}/reference/`, {
                method: 'POST',
                headers: { 'Authorization': `token ${token}` },
                body: referenceFormData
              });
            }
            break;
        }
      }

      // Show success message
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/');
      }, 2000);

    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit application. Please try again.');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Select Verification Types</h1>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back to Overview</span>
        </button>
      </div>

      {/* Success message */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-xl text-green-400 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <CheckCircleIcon className="w-6 h-6" />
            <span>Candidate added successfully! Redirecting to Overview...</span>
          </div>
          <div className="animate-spin h-5 w-5 border-2 border-green-400 border-t-transparent rounded-full"></div>
        </motion.div>
      )}
      
      {/* Step 1: Select Verification Types */}
      {currentStep === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {verificationTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => toggleVerificationType(type.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedTypes.includes(type.id)
                    ? 'bg-primary/20 border border-primary'
                    : 'bg-background-lighter border border-gray-700 hover:border-gray-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <type.icon className={`w-6 h-6 ${selectedTypes.includes(type.id) ? 'text-primary' : 'text-gray-400'}`} />
                  <div>
                    <h3 className="font-medium">{type.name}</h3>
                    <p className="text-sm text-gray-400">{type.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <motion.button
              type="button"
              onClick={proceedToFormStep}
              className="px-6 py-3 bg-gradient-to-b from-background-lighter to-background text-white rounded-xl font-medium shadow-neumorph transition-all duration-300 flex items-center gap-2 transform-gpu hover:scale-105 relative overflow-hidden"
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
              <span className="relative z-10">Proceed to Form</span>
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
          </div>
        </motion.div>
      )}
      
      {/* Step 2: Fill Form */}
      {currentStep === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <div className="bg-background-lighter rounded-xl p-6 shadow-neumorph mb-6">
              <h2 className="text-xl font-medium mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={basicInfo.name}
                    onChange={handleBasicInfoChange}
                    className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={basicInfo.email}
                    onChange={handleBasicInfoChange}
                    className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone*</label>
                  <input
                    type="tel"
                    name="phone"
                    value={basicInfo.phone}
                    onChange={handleBasicInfoChange}
                    className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date of Birth*</label>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={basicInfo.date_of_birth}
                    onChange={handleBasicInfoChange}
                    className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Position*</label>
                  <input
                    type="text"
                    name="position"
                    value={basicInfo.position}
                    onChange={handleBasicInfoChange}
                    className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Experience (years)*</label>
                  <input
                    type="number"
                    name="experience"
                    value={basicInfo.experience}
                    onChange={handleBasicInfoChange}
                    className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Verification Forms */}
            {selectedTypes.includes('identity') && (
              <IdentityVerification 
                data={verificationData.identity} 
                onChange={handleVerificationDataChange}
                onFileUpload={handleFileUpload}
              />
            )}
            
            {selectedTypes.includes('address') && (
              <AddressVerification 
                data={verificationData.address} 
                onChange={handleVerificationDataChange}
                onFileUpload={handleFileUpload}
              />
            )}
            
            {selectedTypes.includes('academic') && (
              <AcademicVerification 
                data={verificationData.academic} 
                onChange={handleVerificationDataChange}
                onFileUpload={handleFileUpload}
                onAddItem={addArrayItem}
                onRemoveItem={removeArrayItem}
              />
            )}
            
            {selectedTypes.includes('employment') && (
              <EmploymentVerification 
                data={verificationData.employment} 
                onChange={handleVerificationDataChange}
                onFileUpload={handleFileUpload}
                onAddItem={addArrayItem}
                onRemoveItem={removeArrayItem}
              />
            )}
            
            {selectedTypes.includes('credit') && (
              <CreditVerification 
                data={verificationData.credit} 
                onChange={handleVerificationDataChange}
                onFileUpload={handleFileUpload}
              />
            )}
            
            {selectedTypes.includes('license') && (
              <LicenseVerification 
                data={verificationData.license} 
                onChange={handleVerificationDataChange}
                onFileUpload={handleFileUpload}
                onAddItem={addArrayItem}
                onRemoveItem={removeArrayItem}
              />
            )}
            
            {selectedTypes.includes('reference') && (
              <ReferenceVerification 
                data={verificationData.reference} 
                onChange={handleVerificationDataChange}
                onFileUpload={handleFileUpload}
                onAddItem={addArrayItem}
                onRemoveItem={removeArrayItem}
              />
            )}
            
            {/* Form Actions */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={goBackToSelection}
                className="px-6 py-2.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg hover:from-primary/90 hover:to-primary/70 transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default AddCandidate;
