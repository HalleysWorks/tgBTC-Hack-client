import { TonConnectButton } from '@tonconnect/ui-react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function Header() {
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

        <div className='flex items-center space-x-4'>
          <button
            onClick={toggleTheme}
            className='p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
            aria-label='Toggle theme'
          >
            {theme === 'light' ? (
              <Moon size={20} className='text-gray-600 dark:text-gray-400' />
            ) : (
              <Sun size={20} className='text-gray-600 dark:text-gray-400' />
            )}
          </button>
          <TonConnectButton />
        </div>
      </div>
    </header>
  );
}
