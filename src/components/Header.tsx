import { TonConnectButton } from '@tonconnect/ui-react';
import { Moon, Sun, Settings, BarChart3, Bell } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

type Tab = 'home' | 'lp' | 'dashboard' | 'metrics' | 'alerts' | 'settings';

interface HeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-6 py-4'>
      <div className='flex justify-between items-center max-w-6xl mx-auto'>
        <div className='flex items-center'>
          <div className='w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl mr-4 flex items-center justify-center'>
            <span className='text-white font-bold text-sm'>₿</span>
          </div>
          <h1 className='text-xl font-bold text-gray-900 dark:text-white'>
            tgBTC LP
          </h1>
        </div>

        <div className='flex items-center space-x-2'>
          {/* Quick Access Buttons */}
          <button
            onClick={() => setActiveTab('metrics')}
            className={`p-2 rounded-xl transition-colors ${
              activeTab === 'metrics'
                ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}
            aria-label='View metrics'
          >
            <BarChart3 size={18} />
          </button>

          <button
            onClick={() => setActiveTab('alerts')}
            className={`p-2 rounded-xl transition-colors relative ${
              activeTab === 'alerts'
                ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}
            aria-label='View alerts'
          >
            <Bell size={18} />
            {/* Notification indicator */}
            <span className='absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full'></span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`p-2 rounded-xl transition-colors ${
              activeTab === 'settings'
                ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}
            aria-label='Settings'
          >
            <Settings size={18} />
          </button>

          <button
            onClick={toggleTheme}
            className='p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
            aria-label='Toggle theme'
          >
            {theme === 'light' ? (
              <Moon size={18} className='text-gray-600 dark:text-gray-400' />
            ) : (
              <Sun size={18} className='text-gray-600 dark:text-gray-400' />
            )}
          </button>

          <TonConnectButton />
        </div>
      </div>
    </header>
  );
}
