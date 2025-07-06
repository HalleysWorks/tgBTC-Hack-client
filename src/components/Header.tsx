import { TonConnectButton } from '@tonconnect/ui-react';

export default function Header() {
  return (
    <header className='bg-white border-b border-gray-200 p-4'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center'>
          <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3'></div>
          <h1 className='text-xl font-bold text-gray-800'>tgBTC LP</h1>
        </div>
        <TonConnectButton />
      </div>
    </header>
  );
}
