import { useState } from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import {
  Wallet,
  BarChart3,
  Settings,
  Bell,
  Home as HomeIcon,
} from 'lucide-react';
import Header from './components/Header.tsx';
import LiquidityProvider from './components/LiquidityProvider.tsx';
import Dashboard from './components/Dashboard.tsx';
import Metrics from './components/Metrics.tsx';
import Alerts from './components/Alerts.tsx';
import SettingsPanel from './components/SettingsPanel.tsx';

type Tab = 'home' | 'lp' | 'dashboard' | 'metrics' | 'alerts' | 'settings';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const manifestUrl = '/tonconnect-manifest.json';

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50'>
        <Header />

        <main className='pb-20'>
          {activeTab === 'home' && <Home />}
          {activeTab === 'lp' && <LiquidityProvider />}
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'metrics' && <Metrics />}
          {activeTab === 'alerts' && <Alerts />}
          {activeTab === 'settings' && <SettingsPanel />}
        </main>

        {/* Bottom Navigation */}
        <nav className='fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2'>
          <div className='flex justify-around items-center'>
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                activeTab === 'home'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600'
              }`}
            >
              <HomeIcon size={20} />
              <span className='text-xs mt-1'>Home</span>
            </button>

            <button
              onClick={() => setActiveTab('lp')}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                activeTab === 'lp'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600'
              }`}
            >
              <Wallet size={20} />
              <span className='text-xs mt-1'>LP</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                activeTab === 'dashboard'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600'
              }`}
            >
              <BarChart3 size={20} />
              <span className='text-xs mt-1'>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('metrics')}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                activeTab === 'metrics'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600'
              }`}
            >
              <BarChart3 size={20} />
              <span className='text-xs mt-1'>Metrics</span>
            </button>

            <button
              onClick={() => setActiveTab('alerts')}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                activeTab === 'alerts'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600'
              }`}
            >
              <Bell size={20} />
              <span className='text-xs mt-1'>Alerts</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                activeTab === 'settings'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600'
              }`}
            >
              <Settings size={20} />
              <span className='text-xs mt-1'>Settings</span>
            </button>
          </div>
        </nav>
      </div>
    </TonConnectUIProvider>
  );
}

// Home component
function Home() {
  return (
    <div className='p-4'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>
          tgBTC Liquidity Protocol
        </h1>
        <p className='text-gray-600'>
          Maximize your yield through intelligent liquidity management
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
        <div className='bg-white rounded-xl p-6 shadow-sm'>
          <h3 className='text-lg font-semibold text-gray-800 mb-2'>
            Total Value Locked
          </h3>
          <p className='text-3xl font-bold text-blue-600'>$2.4M</p>
          <p className='text-sm text-green-600 mt-1'>↑ 12.5% this week</p>
        </div>

        <div className='bg-white rounded-xl p-6 shadow-sm'>
          <h3 className='text-lg font-semibold text-gray-800 mb-2'>
            Your Portfolio
          </h3>
          <p className='text-3xl font-bold text-purple-600'>$8,250</p>
          <p className='text-sm text-green-600 mt-1'>↑ 3.2% APY</p>
        </div>
      </div>

      <div className='bg-white rounded-xl p-6 shadow-sm'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>
          Quick Actions
        </h3>
        <div className='grid grid-cols-2 gap-4'>
          <button className='flex items-center justify-center p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors'>
            <Wallet className='mr-2' size={20} />
            <span className='font-medium'>Add Liquidity</span>
          </button>
          <button className='flex items-center justify-center p-4 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors'>
            <BarChart3 className='mr-2' size={20} />
            <span className='font-medium'>View Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
