import React, { useState } from 'react';
// import { motion } from 'framer-motion';

const SettingsSection = ({ title, children }) => (
  <div className="bg-background-lighter p-6 rounded-xl shadow-neumorph mb-6">
    <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
    {children}
  </div>
);

const Switch = ({ label, checked, onChange }) => (
  <label className="flex items-center cursor-pointer">
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      <div className={`block w-14 h-8 rounded-full transition-colors duration-200 ${
        checked ? 'bg-primary' : 'bg-gray-600'
      }`}>
        <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-200 ${
          checked ? 'transform translate-x-6' : ''
        }`} />
      </div>
    </div>
    <div className="ml-3 text-gray-300">{label}</div>
  </label>
);

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    darkMode: true,
    twoFactorAuth: true,
  });

  const handleSettingChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="container mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

      <SettingsSection title="User Profile">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 mb-2">Full Name</label>
            <input
              type="text"
              className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-gray-300 focus:ring-primary focus:border-primary"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Email</label>
            <input
              type="email"
              className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-gray-300 focus:ring-primary focus:border-primary"
              placeholder="john@example.com"
            />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Notifications">
        <div className="space-y-4">
          <Switch
            label="Email Notifications"
            checked={settings.emailNotifications}
            onChange={() => handleSettingChange('emailNotifications')}
          />
          <Switch
            label="SMS Notifications"
            checked={settings.smsNotifications}
            onChange={() => handleSettingChange('smsNotifications')}
          />
        </div>
      </SettingsSection>

      <SettingsSection title="Security">
        <div className="space-y-4">
          <Switch
            label="Two-Factor Authentication"
            checked={settings.twoFactorAuth}
            onChange={() => handleSettingChange('twoFactorAuth')}
          />
          <div className="mt-4">
            <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors duration-200">
              Reset Password
            </button>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Appearance">
        <div className="space-y-4">
          <Switch
            label="Dark Mode"
            checked={settings.darkMode}
            onChange={() => handleSettingChange('darkMode')}
          />
        </div>
      </SettingsSection>

      <SettingsSection title="Access Control">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2">Role Management</label>
            <select className="w-full bg-background border border-gray-700 rounded-lg p-2.5 text-gray-300 focus:ring-primary focus:border-primary">
              <option>Administrator</option>
              <option>Manager</option>
              <option>Verifier</option>
              <option>Viewer</option>
            </select>
          </div>
        </div>
      </SettingsSection>

      <div className="flex justify-end space-x-4">
        <button className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors duration-200">
          Cancel
        </button>
        <button className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors duration-200">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
