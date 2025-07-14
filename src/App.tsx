import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TonConnectUIProvider, useTonConnectUI } from '@tonconnect/ui-react';
import { Wallet, BarChart3, Home as HomeIcon } from 'lucide-react';

import Header from './components/Header.tsx';
import LiquidityProvider from './components/LiquidityProvider.tsx';
import Dashboard from './components/Dashboard.tsx';
import Metrics from './components/Metrics.tsx';
import Alerts from './components/Alerts.tsx';
import TermsOfService from './components/TermsOfService.tsx';
import PrivacyPolicy from './components/PrivacyPolicy.tsx';
import {
  isUnderConstruction,
  UnderConstruction,
  isComponentHidden,
} from './components/UnderConstruction';
import SettingsPanel from './components/SettingsPanel.tsx';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { initializeTelegramWebApp } from './hooks/useTelegramWebApp.ts';

type Tab = 'home' | 'lp' | 'dashboard' | 'metrics' | 'alerts' | 'settings';

// Component to configure TonConnectUI options (e.g., custom bridge URL)
function TonConnectConfigurator() {
  const [, setOptions] = useTonConnectUI();
  useEffect(() => {
    // No custom bridgeUrl supported by TonConnectUiOptions, so leave options empty or set other supported options if needed
    setOptions({});
  }, [setOptions]);
  return null;
}

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  // Use absolute URL for manifest to ensure proper scheme and avoid CORS issues
  const manifestUrl = window.location.origin + '/tonconnect-manifest.json';

  useEffect(() => {
    initializeTelegramWebApp();
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <TonConnectUIProvider manifestUrl={manifestUrl}>
          <TonConnectConfigurator />
          <Routes>
            {/* Main app routes */}
            <Route
              path='/'
              element={
                <MainApp activeTab={activeTab} setActiveTab={setActiveTab} />
              }
            />
            <Route path='/terms' element={<TermsOfService />} />
            <Route path='/privacy' element={<PrivacyPolicy />} />
          </Routes>
        </TonConnectUIProvider>
      </Router>
    </ThemeProvider>
  );
}

// Main App Component (your existing app structure)
function MainApp({
  activeTab,
  setActiveTab,
}: {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}) {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300'>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className='pb-20'>
        {activeTab === 'home' && <Home setActiveTab={setActiveTab} />}
        {activeTab === 'lp' && <LiquidityProvider />}
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'metrics' &&
          (isUnderConstruction('Metrics') ? (
            <UnderConstruction name='Metrics' />
          ) : (
            <Metrics />
          ))}
        {activeTab === 'alerts' &&
          (isUnderConstruction('Alerts') ? (
            <UnderConstruction name='Alerts' />
          ) : (
            <Alerts />
          ))}
        {activeTab === 'settings' &&
          (!isComponentHidden('SettingsPanel') ? <SettingsPanel /> : null)}
      </main>

      {/* Bottom Navigation */}
      <nav className='fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 px-4 py-2'>
        <div className='flex justify-around items-center'>
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 ${
              activeTab === 'home'
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <HomeIcon size={20} />
            <span className='text-xs mt-1 font-medium'>Home</span>
          </button>

          <button
            onClick={() => setActiveTab('lp')}
            className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 ${
              activeTab === 'lp'
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <Wallet size={20} />
            <span className='text-xs mt-1 font-medium'>Liquidity</span>
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 ${
              activeTab === 'dashboard'
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <BarChart3 size={20} />
            <span className='text-xs mt-1 font-medium'>Portfolio</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

// Home component
function Home({ setActiveTab }: { setActiveTab: (tab: Tab) => void }) {
  return (
    <div className='p-6 max-w-6xl mx-auto'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
          tgBTC Liquidity Protocol
        </h1>
        <p className='text-gray-600 dark:text-gray-400 text-lg'>
          Maximize your yield through intelligent liquidity management
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
        <div className='bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-800'>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400 mb-3'>
            Total Value Locked
          </h3>
          <p className='text-4xl font-bold text-gray-900 dark:text-white mb-2'>
            $2.4M
          </p>
          <p className='text-sm text-green-600 dark:text-green-400 flex items-center'>
            <span className='mr-1'>↗</span>
            12.5% this week
          </p>
        </div>

        <div className='bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-800'>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400 mb-3'>
            Your Portfolio
          </h3>
          <p className='text-4xl font-bold text-gray-900 dark:text-white mb-2'>
            $8,250
          </p>
          <p className='text-sm text-green-600 dark:text-green-400 flex items-center'>
            <span className='mr-1'>↗</span>
            3.2% APY
          </p>
        </div>
      </div>

      <div className='bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-800'>
        <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-6'>
          Quick Actions
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <button
            onClick={() => setActiveTab('lp')}
            className='flex items-center justify-center p-6 bg-blue-50 dark:bg-blue-950/50 rounded-xl border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all duration-200 group'
          >
            <Wallet
              className='mr-3 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform'
              size={24}
            />
            <span className='font-medium text-gray-900 dark:text-white'>
              Add Liquidity
            </span>
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className='flex items-center justify-center p-6 bg-purple-50 dark:bg-purple-950/50 rounded-xl border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-all duration-200 group'
          >
            <BarChart3
              className='mr-3 text-purple-600 dark:text-purple-400 group-hover:scale-105 transition-transform'
              size={24}
            />
            <span className='font-medium text-gray-900 dark:text-white'>
              View Portfolio
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
