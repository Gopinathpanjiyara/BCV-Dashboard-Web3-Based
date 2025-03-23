import React from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

const LicenseVerification = ({ data, onChange, onFileUpload, onAddItem, onRemoveItem }) => {
  return (
    <div className="bg-background-lighter rounded-xl p-6 shadow-neumorph mb-6">
      <h2 className="text-xl font-medium mb-4">Professional License Verification</h2>
      
      {data.licenses.map((license, index) => (
        <div key={index} className="mb-6 border border-gray-700 rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">License {index + 1}</h3>
            {index > 0 && (
              <button
                type="button"
                onClick={() => onRemoveItem('license', 'licenses', index)}
                className="p-1 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30 transition-colors"
              >
                <MinusIcon className="w-5 h-5" />
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">License Type*</label>
              <input
                type="text"
                value={license.type}
                onChange={(e) => onChange('license', 'licenses', { ...license, type: e.target.value }, index)}
                className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">License Number*</label>
              <input
                type="text"
                value={license.number}
                onChange={(e) => onChange('license', 'licenses', { ...license, number: e.target.value }, index)}
                className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Issuing Authority*</label>
              <input
                type="text"
                value={license.issuingAuthority}
                onChange={(e) => onChange('license', 'licenses', { ...license, issuingAuthority: e.target.value }, index)}
                className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Issue Date*</label>
              <input
                type="date"
                value={license.issueDate}
                onChange={(e) => onChange('license', 'licenses', { ...license, issueDate: e.target.value }, index)}
                className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Expiry Date*</label>
              <input
                type="date"
                value={license.expiryDate}
                onChange={(e) => onChange('license', 'licenses', { ...license, expiryDate: e.target.value }, index)}
                className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Upload License Document</label>
              <input
                type="file"
                onChange={(e) => onFileUpload('license', 'licenses', e, index)}
                className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
              />
              {license.document && (
                <p className="mt-1 text-sm text-green-400">
                  File selected: {license.document.name}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
      
      <button
        type="button"
        onClick={() => onAddItem('license', 'licenses')}
        className="flex items-center gap-2 text-primary hover:text-primary-light"
      >
        <PlusIcon className="w-5 h-5" />
        <span>Add Another License</span>
      </button>
    </div>
  );
};

export default LicenseVerification;
