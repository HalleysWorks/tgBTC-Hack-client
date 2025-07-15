import { useState } from 'react';
import { TrendingUp, Wallet, Clock, Unlock, Eye, EyeOff } from 'lucide-react';

// Use actual wallet data; show no positions by default
const portfolioData: any[] = [];

export default function Dashboard() {
  const [showDetails, setShowDetails] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleDetails = (token: string) => {
    setShowDetails((prev) => ({
      ...prev,
      [token]: !prev[token],
    }));
  };

  return (
    <div className='p-6 max-w-6xl mx-auto space-y-8'>
      <div className='text-center mb-8'>
        <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-3'>
          LP Dashboard
        </h2>
        <p className='text-gray-600 dark:text-gray-400 text-lg'>
          Track your liquidity positions and rewards
        </p>
      </div>

      {/* Portfolio Overview */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-800'>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400 mb-3'>
            Total Portfolio Value
          </h3>
          <p className='text-4xl font-bold text-gray-900 dark:text-white mb-2'>
            $0.00
          </p>
          <p className='text-sm text-green-600 dark:text-green-400 flex items-center'>
            <TrendingUp size={16} className='mr-1' />
            +5.2% this month
          </p>
        </div>

        <div className='bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-800'>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400 mb-3'>
            Total Rewards Earned
          </h3>
          <p className='text-4xl font-bold text-gray-900 dark:text-white mb-2'>
            $0.00
          </p>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Across all positions
          </p>
        </div>
      </div>

      {/* Portfolio Positions */}
      <div className='bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
          Your Positions
        </h3>
        {portfolioData.length === 0 ? (
          <p className='text-center text-gray-600 dark:text-gray-400 py-8'>
            Connect your wallet to view portfolio positions.
          </p>
        ) : (
          <div className='space-y-4'>
            {portfolioData.map((position) => (
              <div
                key={position.token}
                className='border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3'></div>
                    <div>
                      <div className='font-semibold text-gray-900 dark:text-white flex items-center'>
                        {position.token}
                        {position.isLocked && (
                          <div className='ml-2 px-2 py-1 bg-purple-100 dark:bg-purple-950/50 text-purple-800 dark:text-purple-200 text-xs rounded-full flex items-center'>
                            <Clock size={12} className='mr-1' />
                            Locked
                          </div>
                        )}
                      </div>
                      <div className='text-sm text-gray-600 dark:text-gray-400'>
                        {position.deposited} tokens
                      </div>
                    </div>
                  </div>
                  <div className='text-right'>
                    <div className='font-semibold text-gray-900 dark:text-white'>
                      {position.value}
                    </div>
                    <div className='text-sm text-green-600 dark:text-green-400'>
                      +{position.rewards} rewards
                    </div>
                  </div>
                </div>

                <div className='mt-3 flex justify-between items-center'>
                  <button
                    onClick={() => toggleDetails(position.token)}
                    className='text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm flex items-center'
                  >
                    {showDetails[position.token] ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                    <span className='ml-1'>
                      {showDetails[position.token] ? 'Hide' : 'Show'} Details
                    </span>
                  </button>
                  <div className='flex space-x-2'>
                    <button className='px-3 py-1 bg-blue-100 dark:bg-blue-950/50 text-blue-800 dark:text-blue-200 text-sm rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors'>
                      Add More
                    </button>
                    <button className='px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'>
                      Withdraw
                    </button>
                  </div>
                </div>

                {showDetails[position.token] && (
                  <div className='mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'>
                    <div className='space-y-2 text-sm'>
                      <div className='flex justify-between'>
                        <span className='text-gray-600 dark:text-gray-400'>
                          Allocation:
                        </span>
                        <span className='text-gray-900 dark:text-white'>
                          {position.allocation}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-600 dark:text-gray-400'>
                          APY:
                        </span>
                        <span className='text-green-600 dark:text-green-400 font-medium'>
                          8.5%
                        </span>
                      </div>
                      {position.isLocked && position.lockExpiry && (
                        <div className='flex justify-between'>
                          <span className='text-gray-600 dark:text-gray-400'>
                            Lock Expires:
                          </span>
                          <span className='text-purple-600 dark:text-purple-400 font-medium'>
                            {position.lockExpiry}
                          </span>
                        </div>
                      )}
                      <div className='flex justify-between'>
                        <span className='text-gray-600 dark:text-gray-400'>
                          Daily Rewards:
                        </span>
                        <span className='text-green-600 dark:text-green-400 font-medium'>
                          $
                          {(
                            parseFloat(position.rewards.replace('$', '')) / 30
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className='bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
          Quick Actions
        </h3>
        <div className='grid grid-cols-2 gap-4'>
          <button className='flex items-center justify-center p-4 bg-green-50 dark:bg-green-950/50 rounded-lg border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors'>
            <TrendingUp
              className='mr-2 text-green-600 dark:text-green-400'
              size={20}
            />
            <span className='font-medium text-gray-900 dark:text-white'>
              Compound Rewards
            </span>
          </button>
          <button className='flex items-center justify-center p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors'>
            <Wallet
              className='mr-2 text-blue-600 dark:text-blue-400'
              size={20}
            />
            <span className='font-medium text-gray-900 dark:text-white'>
              Claim Rewards
            </span>
          </button>
          <button className='flex items-center justify-center p-4 bg-purple-50 dark:bg-purple-950/50 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors'>
            <Clock
              className='mr-2 text-purple-600 dark:text-purple-400'
              size={20}
            />
            <span className='font-medium text-gray-900 dark:text-white'>
              Extend Lock
            </span>
          </button>
          <button className='flex items-center justify-center p-4 bg-orange-50 dark:bg-orange-950/50 rounded-lg border border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors'>
            <Unlock
              className='mr-2 text-orange-600 dark:text-orange-400'
              size={20}
            />
            <span className='font-medium text-gray-900 dark:text-white'>
              Emergency Withdraw
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
