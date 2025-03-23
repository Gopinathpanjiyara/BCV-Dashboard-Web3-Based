import React from 'react';

const IdentityVerification = ({ data, onChange, onFileUpload }) => {
  return (
    <div className="bg-background-lighter rounded-xl p-6 shadow-neumorph mb-6">
      <h2 className="text-xl font-medium mb-4">Identity Verification</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">ID Type*</label>
          <select
            name="idType"
            value={data.idType}
            onChange={(e) => onChange('identity', 'idType', e.target.value)}
            className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
            required
          >
            <option value="">Select ID Type</option>
            <option value="passport">Passport</option>
            <option value="driverLicense">Driver's License</option>
            <option value="nationalId">National ID</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">ID Number*</label>
          <input
            type="text"
            value={data.idNumber}
            onChange={(e) => onChange('identity', 'idNumber', e.target.value)}
            className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Issue Date*</label>
          <input
            type="date"
            value={data.issueDate}
            onChange={(e) => onChange('identity', 'issueDate', e.target.value)}
            className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Expiry Date*</label>
          <input
            type="date"
            value={data.expiryDate}
            onChange={(e) => onChange('identity', 'expiryDate', e.target.value)}
            className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Issuing Authority*</label>
          <input
            type="text"
            value={data.issuingAuthority}
            onChange={(e) => onChange('identity', 'issuingAuthority', e.target.value)}
            className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Upload ID Document</label>
          <input
            type="file"
            onChange={(e) => onFileUpload('identity', 'document', e)}
            className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
          />
          {data.document && (
            <p className="mt-1 text-sm text-green-400">
              File selected: {data.document.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdentityVerification;
