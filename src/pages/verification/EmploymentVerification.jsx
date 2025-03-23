import React from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

const EmploymentVerification = ({ data, onChange, onFileUpload, onAddItem, onRemoveItem }) => {
  return (
    <div className="bg-background-lighter rounded-xl p-6 shadow-neumorph mb-6">
      <h2 className="text-xl font-medium mb-4">Employment Records</h2>
      
      {data.history.map((job, index) => (
        <div key={index} className="mb-6 border border-gray-700 rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Employment {index + 1}</h3>
            {index > 0 && (
              <button
                type="button"
                onClick={() => onRemoveItem('employment', 'history', index)}
                className="p-1 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30 transition-colors"
              >
                <MinusIcon className="w-5 h-5" />
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Company*</label>
              <input
                type="text"
                value={job.company}
                onChange={(e) => onChange('employment', 'history', { ...job, company: e.target.value }, index)}
                className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Position*</label>
              <input
                type="text"
                value={job.position}
                onChange={(e) => onChange('employment', 'history', { ...job, position: e.target.value }, index)}
                className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Start Date*</label>
              <input
                type="date"
                value={job.startDate}
                onChange={(e) => onChange('employment', 'history', { ...job, startDate: e.target.value }, index)}
                className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                value={job.endDate}
                onChange={(e) => onChange('employment', 'history', { ...job, endDate: e.target.value }, index)}
                className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Supervisor/Manager</label>
              <input
                type="text"
                value={job.supervisor}
                onChange={(e) => onChange('employment', 'history', { ...job, supervisor: e.target.value }, index)}
                className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Upload Employment Proof</label>
              <input
                type="file"
                onChange={(e) => onFileUpload('employment', 'history', e, index)}
                className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
              />
              {job.document && (
                <p className="mt-1 text-sm text-green-400">
                  File selected: {job.document.name}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
      
      <button
        type="button"
        onClick={() => onAddItem('employment', 'history')}
        className="flex items-center gap-2 text-primary hover:text-primary-light"
      >
        <PlusIcon className="w-5 h-5" />
        <span>Add Another Employment</span>
      </button>
    </div>
  );
};

export default EmploymentVerification;
