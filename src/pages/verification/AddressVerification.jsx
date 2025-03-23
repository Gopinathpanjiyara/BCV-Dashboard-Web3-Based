import React from 'react';

const AddressVerification = ({ data, onChange, onFileUpload }) => {
  return (
    <div className="bg-background-lighter rounded-xl p-6 shadow-neumorph mb-6">
      <h2 className="text-xl font-medium mb-4">Address Verification</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Street Address*</label>
          <input
            type="text"
            value={data.street}
            onChange={(e) => onChange('address', 'street', e.target.value)}
            className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">City*</label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => onChange('address', 'city', e.target.value)}
            className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">State/Province*</label>
          <input
            type="text"
            value={data.state}
            onChange={(e) => onChange('address', 'state', e.target.value)}
            className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Zip/Postal Code*</label>
          <input
            type="text"
            value={data.zipCode}
            onChange={(e) => onChange('address', 'zipCode', e.target.value)}
            className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Country*</label>
          <input
            type="text"
            value={data.country}
            onChange={(e) => onChange('address', 'country', e.target.value)}
            className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Residence Since*</label>
          <input
            type="date"
            value={data.residenceSince}
            onChange={(e) => onChange('address', 'residenceSince', e.target.value)}
            className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Upload Address Proof</label>
          <input
            type="file"
            onChange={(e) => onFileUpload('address', 'document', e)}
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

export default AddressVerification;
