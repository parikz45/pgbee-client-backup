'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

// Helper component for Icons
const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={path} />
  </svg>
);


// Icon Paths
const ICONS = {
    arrowLeft: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z",
    home: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
    pgDetails: "M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm5 15h-2v-6H9v6H7v-7.81l5-4.5 5 4.5V18z",
    inbox: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
    profile: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
};

// Reusable Toggle Switch Component
const ToggleSwitch = ({ checked, onChange }) => (
    <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-800"></div>
    </label>
);

// Reusable Bottom Navigation Item
const BottomNavItem = ({ icon, label, active }) => (
    <a href="#" className={`flex flex-col items-center justify-center w-full text-sm ${active ? 'text-gray-900' : 'text-gray-500'}`}>
        <Icon path={icon} className="w-6 h-6 mb-1" />
        <span>{label}</span>
    </a>
);

const SettingsPage = () => {
  const router = useRouter();
  const [settings, setSettings] = useState({
    pushNotifications: true,
    notificationsSound: false,
    chatNotifications: true,
    walletUpdates: false,
    promotionalNotifications: true,
    twoFactorAuth: false,
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col md:items-center md:justify-center font-sans">
      <div className="w-full max-w-2xl bg-white shadow-lg md:rounded-3xl flex flex-col min-h-screen md:min-h-0 md:my-8">
        {/* Header */}
        <header className="text-center py-4 md:py-6 sticky top-0 bg-white z-10 md:rounded-t-3xl">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            <span className="text-yellow-400">Pg</span>Bee
          </h1>
        </header>

        <main className="flex-grow p-4 md:p-8">
          {/* Back Button and Title */}
          <div className="flex items-center mb-6">
            <button 
              className="text-gray-600 hover:text-gray-900 p-2 -ml-2" 
              onClick={() => router.back()}
            >
              <Icon path={ICONS.arrowLeft} className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <h2 className="text-lg md:text-xl font-bold text-gray-800 ml-2">Settings & Privacy</h2>
          </div>

          <div className="space-y-6 md:space-y-8">
            {/* Notification Settings */}
            <section className="p-4 md:p-6 bg-gray-50 rounded-xl">
              <h3 className="text-base md:text-lg font-semibold mb-4">Notification Settings</h3>
              <div className="space-y-4">
                {Object.entries({
                    pushNotifications: 'Push Notifications',
                    notificationsSound: 'Notifications Sound',
                    chatNotifications: 'Chat Notifications',
                    walletUpdates: 'Wallet Updates',
                    promotionalNotifications: 'Promotional Notifications',
                }).map(([key, label]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-sm md:text-base text-gray-700">{label}</span>
                    <ToggleSwitch checked={settings[key]} onChange={() => handleToggle(key)} />
                  </div>
                ))}
              </div>
            </section>

            {/* Two-factor Authentication */}
            <section className="p-4 md:p-6 bg-gray-50 rounded-xl">
              <h3 className="text-base md:text-lg font-semibold">Two-factor Authentication</h3>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs md:text-sm text-gray-600 max-w-xs">Enable or disable two factor authentication</p>
                <ToggleSwitch checked={settings.twoFactorAuth} onChange={() => handleToggle('twoFactorAuth')} />
              </div>
            </section>

            {/* Change Password */}
            <section className="p-4 md:p-6 bg-gray-50 rounded-xl">
              <h3 className="text-base md:text-lg font-semibold mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs md:text-sm font-medium text-gray-700">Current Password</label>
                  <input 
                    type="password" 
                    placeholder="************" 
                    className="mt-1 w-full px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800" 
                  />
                </div>
                <div>
                  <label className="text-xs md:text-sm font-medium text-gray-700">New Password</label>
                  <input 
                    type="password" 
                    placeholder="************" 
                    className="mt-1 w-full px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800" 
                  />
                </div>
                <button className="w-full bg-gray-800 text-white py-2.5 rounded-lg text-sm md:text-base font-semibold hover:bg-gray-700">
                  Edit Password
                </button>
              </div>
            </section>

            {/* Delete Account */}
            <section className="p-4 md:p-6 bg-gray-50 rounded-xl">
              <h3 className="text-base md:text-lg font-semibold">Delete Account</h3>
              <p className="text-xs md:text-sm text-gray-600 mt-1">Note: This action is irreversible.</p>
              <button className="w-full mt-4 border border-red-500 text-red-500 py-2.5 rounded-lg text-sm md:text-base font-semibold hover:bg-red-50">
                Delete Account
              </button>
            </section>
          </div>
        </main>

        {/* Bottom Navigation - Only show on mobile */}
        <footer className="md:hidden sticky bottom-0 bg-white border-t">
          <div className="flex justify-around items-center p-4">
            <BottomNavItem icon={ICONS.home} label="Home" />
            <BottomNavItem icon={ICONS.pgDetails} label="PG Details" />
            <BottomNavItem icon={ICONS.inbox} label="Inbox" />
            <BottomNavItem icon={ICONS.profile} label="Profile" active />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SettingsPage;
