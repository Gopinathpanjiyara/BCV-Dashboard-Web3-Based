import React from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

const ReferenceVerification = ({ data, onChange, onFileUpload, onAddItem, onRemoveItem }) => {
  return (
    <div className="bg-background-lighter rounded-xl p-6 shadow-neumorph mb-6">
      <h2 className="text-xl font-medium mb-4">Reference Verification</h2>
      
      {data.references.map((reference, index) => (
        <div key={index} className="mb-6 border border-gray-700 rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Reference {index + 1}</h3>
            {index > 0 && (
              <button
                type="button"
                onClick={() => onRemoveItem('reference', 'references', index)}
                className="p-1 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30 transition-colors"
              >
                <MinusIcon className="w-5 h-5" />
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name*</label>
              <input
                type="text"
                value={reference.name}
                onChange={(e) => onChange('reference', 'references', { ...reference, name: e.target.value }, index)}
                className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Relationship*</label>
              <input
                type="text"
                value={reference.relationship}
                onChange={(e) => onChange('reference', 'references', { ...reference, relationship: e.target.value }, index)}
                className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Company*</label>
              <input
                type="text"
                value={reference.company}
                onChange={(e) => onChange('reference', 'references', { ...reference, company: e.target.value }, index)}
                className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Position*</label>
              <input
                type="text"
                value={reference.position}
                onChange={(e) => onChange('reference', 'references', { ...reference, position: e.target.value }, index)}
                className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email*</label>
              <input
                type="email"
                value={reference.email}
                onChange={(e) => onChange('reference', 'references', { ...reference, email: e.target.value }, index)}
                className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone*</label>
              <input
                type="tel"
                value={reference.phone}
                onChange={(e) => onChange('reference', 'references', { ...reference, phone: e.target.value }, index)}
                className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Upload Supporting Document (Optional)</label>
              <input
                type="file"
                onChange={(e) => onFileUpload('reference', 'references', e, index)}
                className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
              />
              {reference.document && (
                <p className="mt-1 text-sm text-green-400">
                  File selected: {reference.document.name}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
      
      <button
        type="button"
        onClick={() => onAddItem('reference', 'references')}
        className="flex items-center gap-2 text-primary hover:text-primary-light"
      >
        <PlusIcon className="w-5 h-5" />
        <span>Add Another Reference</span>
      </button>
    </div>
  );
};

export default ReferenceVerification;
