import { useState } from 'react';
import { Plus, Wallet, TrendingUp, Lock, Info } from 'lucide-react';

const tokens = [
  {
    symbol: 'tgBTC',
    name: 'Telegram Bitcoin',
    balance: '0.125',
    price: '$94,250',
    apy: '8.5%',
  },
  {
    symbol: 'TON',
    name: 'TON Coin',
    balance: '1,250',
    price: '$5.42',
    apy: '12.3%',
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    balance: '5,000',
    price: '$1.00',
    apy: '6.8%',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    balance: '2,500',
    price: '$1.00',
    apy: '7.2%',
  },
];

const lockPeriods = [
  { days: 7, multiplier: 1.2, label: '7 days' },
  { days: 30, multiplier: 1.5, label: '30 days' },
  { days: 90, multiplier: 2.0, label: '90 days' },
];

export default function LiquidityProvider() {
  const [selectedToken, setSelectedToken] = useState(tokens[0]);
  const [amount, setAmount] = useState('');
  const [lockPeriod, setLockPeriod] = useState(lockPeriods[0]);
  const [showLockOptions, setShowLockOptions] = useState(false);

  const estimatedRewards = amount
    ? (
        ((parseFloat(amount) * parseFloat(selectedToken.apy)) / 100) *
        lockPeriod.multiplier
      ).toFixed(2)
    : '0';

  return (
    <div className='p-6 max-w-4xl mx-auto space-y-8'>
      <div className='text-center mb-8'>
        <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-3'>
          Provide Liquidity
        </h2>
        <p className='text-gray-600 dark:text-gray-400 text-lg'>
          Deposit tokens to earn rewards from trading fees
        </p>
      </div>

      {/* Token Selection */}
      <div className='bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-800'>
        <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-6'>
          Select Token
        </h3>
        <div className='grid grid-cols-1 gap-4'>
          {tokens.map((token) => (
            <button
              key={token.symbol}
              onClick={() => setSelectedToken(token)}
              className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                selectedToken.symbol === token.symbol
                  ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/50'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-900'
              }`}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mr-4 flex items-center justify-center'>
                    <span className='text-white font-bold text-sm'>
                      {token.symbol.slice(0, 2)}
                    </span>
                  </div>
                  <div className='text-left'>
                    <div className='font-semibold text-gray-900 dark:text-white text-lg'>
                      {token.symbol}
                    </div>
                    <div className='text-sm text-gray-500 dark:text-gray-400'>
                      {token.name}
                    </div>
                  </div>
                </div>
                <div className='text-right'>
                  <div className='text-sm font-medium text-gray-900 dark:text-white'>
                    {token.balance}
                  </div>
                  <div className='text-sm text-green-600 dark:text-green-400 flex items-center'>
                    <TrendingUp size={14} className='mr-1' />
                    {token.apy} APY
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Amount Input */}
      <div className='bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-800'>
        <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-6'>
          Deposit Amount
        </h3>
        <div className='relative'>
          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder='0.0'
            className='w-full p-6 text-2xl font-medium border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500'
          />
          <div className='absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium'>
            {selectedToken.symbol}
          </div>
        </div>
        <div className='flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-400'>
          <span>
            Balance: {selectedToken.balance} {selectedToken.symbol}
          </span>
          <button
            onClick={() => setAmount(selectedToken.balance)}
            className='text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium'
          >
            MAX
          </button>
        </div>
      </div>

      {/* Lock Period Options */}
      <div className='bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-800'>
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
            Lock Period (Optional)
          </h3>
          <button
            onClick={() => setShowLockOptions(!showLockOptions)}
            className='text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors'
          >
            <Info size={20} />
          </button>
        </div>

        {showLockOptions && (
          <div className='mb-6 p-4 bg-blue-50 dark:bg-blue-950/50 rounded-xl border border-blue-200 dark:border-blue-800'>
            <p className='text-sm text-blue-800 dark:text-blue-200'>
              Lock your tokens for higher rewards. Longer lock periods earn
              higher APY multipliers.
            </p>
          </div>
        )}

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {lockPeriods.map((period) => (
            <button
              key={period.days}
              onClick={() => setLockPeriod(period)}
              className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                lockPeriod.days === period.days
                  ? 'border-purple-500 dark:border-purple-400 bg-purple-50 dark:bg-purple-950/50'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-900'
              }`}
            >
              <div className='text-center'>
                <Lock
                  size={20}
                  className='mx-auto mb-2 text-gray-600 dark:text-gray-400'
                />
                <div className='font-semibold text-gray-900 dark:text-white text-lg mb-1'>
                  {period.label}
                </div>
                <div className='text-sm text-purple-600 dark:text-purple-400 font-medium'>
                  {period.multiplier}x rewards
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Estimated Rewards */}
      <div className='bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/50 dark:to-blue-950/50 rounded-2xl p-8 border border-green-200 dark:border-green-800'>
        <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
          Estimated Rewards
        </h3>
        <div className='text-4xl font-bold text-green-600 dark:text-green-400 mb-2'>
          ${estimatedRewards}
        </div>
        <div className='text-sm text-gray-600 dark:text-gray-400'>
          Annual rewards with {lockPeriod.multiplier}x multiplier
        </div>
      </div>

      {/* Action Buttons */}
      <div className='space-y-4'>
        <button className='w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-6 rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl'>
          <Plus size={24} className='mr-3' />
          Add Liquidity
        </button>

        <button className='w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-6 rounded-2xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center'>
          <Wallet size={24} className='mr-3' />
          Preview Transaction
        </button>
      </div>
    </div>
  );
}
