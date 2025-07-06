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
    <div className='p-4 space-y-6'>
      <div className='text-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 mb-2'>
          Provide Liquidity
        </h2>
        <p className='text-gray-600'>
          Deposit tokens to earn rewards from trading fees
        </p>
      </div>

      {/* Token Selection */}
      <div className='bg-white rounded-xl p-6 shadow-sm'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>
          Select Token
        </h3>
        <div className='grid grid-cols-1 gap-3'>
          {tokens.map((token) => (
            <button
              key={token.symbol}
              onClick={() => setSelectedToken(token)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedToken.symbol === token.symbol
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3'></div>
                  <div className='text-left'>
                    <div className='font-semibold text-gray-800'>
                      {token.symbol}
                    </div>
                    <div className='text-sm text-gray-600'>{token.name}</div>
                  </div>
                </div>
                <div className='text-right'>
                  <div className='text-sm font-medium text-gray-800'>
                    {token.balance}
                  </div>
                  <div className='text-sm text-green-600 flex items-center'>
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
      <div className='bg-white rounded-xl p-6 shadow-sm'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>
          Deposit Amount
        </h3>
        <div className='relative'>
          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder='0.0'
            className='w-full p-4 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          />
          <div className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'>
            {selectedToken.symbol}
          </div>
        </div>
        <div className='flex justify-between mt-2 text-sm text-gray-600'>
          <span>
            Balance: {selectedToken.balance} {selectedToken.symbol}
          </span>
          <button
            onClick={() => setAmount(selectedToken.balance)}
            className='text-blue-600 hover:text-blue-700 font-medium'
          >
            MAX
          </button>
        </div>
      </div>

      {/* Lock Period Options */}
      <div className='bg-white rounded-xl p-6 shadow-sm'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-semibold text-gray-800'>
            Lock Period (Optional)
          </h3>
          <button
            onClick={() => setShowLockOptions(!showLockOptions)}
            className='text-blue-600 hover:text-blue-700'
          >
            <Info size={20} />
          </button>
        </div>

        {showLockOptions && (
          <div className='mb-4 p-3 bg-blue-50 rounded-lg'>
            <p className='text-sm text-blue-800'>
              Lock your tokens for higher rewards. Longer lock periods earn
              higher APY multipliers.
            </p>
          </div>
        )}

        <div className='grid grid-cols-3 gap-3'>
          {lockPeriods.map((period) => (
            <button
              key={period.days}
              onClick={() => setLockPeriod(period)}
              className={`p-4 rounded-lg border-2 transition-all ${
                lockPeriod.days === period.days
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className='text-center'>
                <Lock size={16} className='mx-auto mb-1 text-gray-600' />
                <div className='font-semibold text-gray-800'>
                  {period.label}
                </div>
                <div className='text-sm text-purple-600'>
                  {period.multiplier}x rewards
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Estimated Rewards */}
      <div className='bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200'>
        <h3 className='text-lg font-semibold text-gray-800 mb-2'>
          Estimated Rewards
        </h3>
        <div className='text-3xl font-bold text-green-600 mb-1'>
          ${estimatedRewards}
        </div>
        <div className='text-sm text-gray-600'>
          Annual rewards with {lockPeriod.multiplier}x multiplier
        </div>
      </div>

      {/* Action Buttons */}
      <div className='space-y-3'>
        <button className='w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all flex items-center justify-center'>
          <Plus size={20} className='mr-2' />
          Add Liquidity
        </button>

        <button className='w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center'>
          <Wallet size={20} className='mr-2' />
          Preview Transaction
        </button>
      </div>
    </div>
  );
}
