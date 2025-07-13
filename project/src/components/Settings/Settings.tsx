import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Globe, 
  Shield, 
  Monitor, 
  Moon, 
  Sun, 
  Smartphone,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    // Profile Preferences
    defaultLandingPage: 'dashboard',
    theme: 'light',
    fontSize: 'medium',
    navigationDensity: 'comfortable',
    
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    portalNotifications: true,
    frequency: 'realtime',
    eventReminders: true,
    examAlerts: true,
    feeAlerts: true,
    feedbackRequests: true,
    
    // Language
    language: 'english',
    
    // Account
    twoFactorAuth: false,
    loginAlerts: true
  });

  const tabs = [
    { id: 'profile', label: 'Profile Preferences', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'language', label: 'Language', icon: Globe },
    { id: 'account', label: 'Account Security', icon: Shield }
  ];

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Save settings logic here
    console.log('Saving settings:', settings);
  };

  const renderProfilePreferences = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Default Landing Page
        </label>
        <select
          value={settings.defaultLandingPage}
          onChange={(e) => handleSettingChange('defaultLandingPage', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="dashboard">Dashboard</option>
          <option value="academics">Academics</option>
          <option value="tracker">Academic Tracker</option>
          <option value="timetable">Timetable</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Theme
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'light', label: 'Light', icon: Sun },
            { value: 'dark', label: 'Dark', icon: Moon },
            { value: 'system', label: 'System', icon: Monitor }
          ].map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => handleSettingChange('theme', value)}
              className={`p-3 border rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                settings.theme === value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Font Size
        </label>
        <select
          value={settings.fontSize}
          onChange={(e) => handleSettingChange('fontSize', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Navigation Density
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'compact', label: 'Compact' },
            { value: 'comfortable', label: 'Comfortable' }
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => handleSettingChange('navigationDensity', value)}
              className={`p-3 border rounded-lg text-center transition-colors ${
                settings.navigationDensity === value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Channels</h3>
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
            { key: 'smsNotifications', label: 'SMS Notifications', description: 'Receive notifications via SMS' },
            { key: 'portalNotifications', label: 'Portal Notifications', description: 'Show notifications in portal' }
          ].map(({ key, label, description }) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">{label}</div>
                <div className="text-sm text-gray-500">{description}</div>
              </div>
              <button
                onClick={() => handleSettingChange(key, !settings[key])}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings[key] ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings[key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notification Frequency
        </label>
        <select
          value={settings.frequency}
          onChange={(e) => handleSettingChange('frequency', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="realtime">Real-time</option>
          <option value="daily">Daily Digest</option>
          <option value="weekly">Weekly Summary</option>
        </select>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Types</h3>
        <div className="space-y-4">
          {[
            { key: 'eventReminders', label: 'Event Reminders' },
            { key: 'examAlerts', label: 'Exam & Fee Alerts' },
            { key: 'feeAlerts', label: 'Fee Due Alerts' },
            { key: 'feedbackRequests', label: 'Feedback Requests' }
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-900">{label}</div>
              <button
                onClick={() => handleSettingChange(key, !settings[key])}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings[key] ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings[key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLanguage = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Language
        </label>
        <select
          value={settings.language}
          onChange={(e) => handleSettingChange('language', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="english">English</option>
          <option value="hindi">हिंदी (Hindi)</option>
          <option value="telugu">తెలుగు (Telugu)</option>
          <option value="tamil">தமிழ் (Tamil)</option>
        </select>
        <p className="text-sm text-gray-500 mt-2">
          Language changes will take effect after refreshing the page.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Language Support</h3>
        <p className="text-sm text-blue-800">
          Currently, the portal supports English and regional languages for basic navigation. 
          Full translation support is being developed and will be available soon.
        </p>
      </div>
    </div>
  );

  const renderAccount = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm new password"
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            Update Password
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-900">Two-Factor Authentication</div>
              <div className="text-sm text-gray-500">Add an extra layer of security to your account</div>
            </div>
            <button
              onClick={() => handleSettingChange('twoFactorAuth', !settings.twoFactorAuth)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-900">Login Alerts</div>
              <div className="text-sm text-gray-500">Get notified of new login attempts</div>
            </div>
            <button
              onClick={() => handleSettingChange('loginAlerts', !settings.loginAlerts)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.loginAlerts ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Login History</h3>
        <div className="space-y-3">
          {[
            { device: 'Chrome on Windows', location: 'Amaravati, AP', time: '2 hours ago', current: true },
            { device: 'Mobile App', location: 'Amaravati, AP', time: '1 day ago', current: false },
            { device: 'Firefox on Windows', location: 'Amaravati, AP', time: '3 days ago', current: false }
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {session.device}
                    {session.current && <span className="ml-2 text-green-600">(Current)</span>}
                  </div>
                  <div className="text-sm text-gray-500">{session.location} • {session.time}</div>
                </div>
              </div>
              {!session.current && (
                <button className="text-red-600 hover:text-red-800 text-sm">
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfilePreferences();
      case 'notifications':
        return renderNotifications();
      case 'language':
        return renderLanguage();
      case 'account':
        return renderAccount();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Customize your portal experience and account preferences</p>
          </div>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Save className="w-4 h-4 mr-2 inline" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            <nav className="p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;