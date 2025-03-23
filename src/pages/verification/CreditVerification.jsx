import React from 'react';

const CreditVerification = ({ data, onChange, onFileUpload }) => {
  return (
    <div className="bg-background-lighter rounded-xl p-6 shadow-neumorph mb-6">
      <h2 className="text-xl font-medium mb-4">Credit Report</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">SSN/ID Number*</label>
          <input
            type="text"
            value={data.ssn}
            onChange={(e) => onChange('credit', 'ssn', e.target.value)}
            className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
            required
          />
          <p className="mt-1 text-xs text-gray-400">This information is securely stored and encrypted</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="creditConsent"
            checked={data.consent}
            onChange={(e) => onChange('credit', 'consent', e.target.checked)}
            className="w-4 h-4 bg-background border border-gray-700 rounded focus:ring-primary"
            required
          />
          <label htmlFor="creditConsent" className="text-sm font-medium">
            I consent to a credit check being performed*
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Upload Additional Documents (Optional)</label>
          <input
            type="file"
            onChange={(e) => onFileUpload('credit', 'document', e)}
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

export default CreditVerification;
