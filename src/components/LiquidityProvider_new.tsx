import { useState, useEffect } from 'react';
import {
  useTonWallet,
  TonConnectButton,
  useTonConnectUI,
} from '@tonconnect/ui-react';
import {
  Plus,
  Wallet,
  TrendingUp,
  //   Lock,
  Info,
  AlertCircle,
} from 'lucide-react';

import { useTonContracts } from '../hooks/useTonContracts';
import {
  VaultContract,
  DeDustPoolContract,
  parseTokenAmount,
  //   formatTokenAmount,
} from '../contractWrappers';

// Token interface for pools
interface PoolToken {
  symbol: string;
  name: string;
  balance: string;
  apy: string;
  contract: string;
}

// Initialize with TON pool - will load real data from contracts
const initialTokens: PoolToken[] = [
  {
    symbol: 'TON',
    name: 'Toncoin',
    balance: '0.00',
    apy: '0.00',
    contract: 'dedust', // Will use DeDust pool for TON deposits
  },
];

// const lockPeriods = [
//   { days: 7, multiplier: 1.2, label: '7 days' },
//   { days: 30, multiplier: 1.5, label: '30 days' },
//   { days: 90, multiplier: 2.0, label: '90 days' },
// ];

export default function LiquidityProvider() {
  const { addresses, client } = useTonContracts();
  const [tokens, setTokens] = useState<PoolToken[]>(initialTokens);
  const [selectedToken, setSelectedToken] = useState<PoolToken | null>(
    tokens[0] || null
  );
  const [amount, setAmount] = useState('');
  //   const [lockPeriod, setLockPeriod] = useState(lockPeriods[0]);
  //   const [showLockOptions, setShowLockOptions] = useState(false);
  const [loading, setLoading] = useState(false);

  // Use TonConnect hooks directly for better reliability
  const tonWallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();

  // Use tonWallet for wallet state
  const isWalletConnected = !!tonWallet;

  //   const estimatedRewards =
  //     amount && selectedToken
  //       ? (
  //           ((parseFloat(amount) * parseFloat(selectedToken.apy)) / 100) *
  //           lockPeriod.multiplier
  //         ).toFixed(2)
  //       : '0';

  const walletInfo = tonWallet
    ? {
        address: tonWallet.account.address,
        chain: tonWallet.account.chain,
        walletName: tonWallet.device.appName,
        walletVersion: tonWallet.device.appVersion,
        platform: tonWallet.device.platform,
      }
    : null;

  // Load pool data from contracts
  useEffect(() => {
    const loadPoolData = async () => {
      if (!addresses || !client) return;

      try {
        // Load data from DeDust pool
        const dedustPool = DeDustPoolContract.fromAddress(
          addresses.dedustPool,
          client
        );
        const poolInfo = await dedustPool.getPoolInfo();

        // Update tokens with real APY from contract
        const updatedTokens = [
          {
            symbol: 'TON',
            name: 'Toncoin',
            balance: '0.00', // Will show user's balance once connected
            apy: poolInfo.apy.toFixed(2),
            contract: 'dedust',
          },
        ];

        setTokens(updatedTokens);
        setSelectedToken(updatedTokens[0]);
      } catch (error) {
        console.warn('Failed to load pool data:', error);
      }
    };

    loadPoolData();
  }, [addresses, client]);

  // Handle add liquidity to vault or pool
  const handleAddLiquidity = async () => {
    if (!addresses || !tonWallet || !amount || !selectedToken) return;

    setLoading(true);
    try {
      const tonAmount = parseTokenAmount(amount);

      if (selectedToken.contract === 'vault') {
        // Send to vault contract
        const vault = VaultContract.fromAddress(addresses.vault, client!);
        const body = vault.createDepositMessage(tonAmount);

        const transaction = {
          validUntil: Math.floor(Date.now() / 1000) + 60,
          messages: [
            {
              address: addresses.vault,
              amount: tonAmount.toString(),
              payload: body.toBoc().toString('base64'),
            },
          ],
        };

        await tonConnectUI.sendTransaction(transaction);
      } else {
        // Send to DeDust pool
        const pool = DeDustPoolContract.fromAddress(
          addresses.dedustPool,
          client!
        );
        const body = pool.createAddLiquidityMessage(tonAmount);

        const transaction = {
          validUntil: Math.floor(Date.now() / 1000) + 60,
          messages: [
            {
              address: addresses.dedustPool,
              amount: tonAmount.toString(),
              payload: body.toBoc().toString('base64'),
            },
          ],
        };

        await tonConnectUI.sendTransaction(transaction);
      }

      // Clear form on success
      setAmount('');
      alert(
        'Transaction sent successfully! Check your wallet for confirmation.'
      );
    } catch (error) {
      console.error('Add Liquidity failed:', error);
      alert('Transaction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-6 max-w-4xl mx-auto space-y-8'>
      <div className='text-center mb-8'>
        <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-3'>
          Provide Liquidity
        </h2>
        <p className='text-gray-600 dark:text-gray-400 text-lg'>
          Deposit tokens to earn rewards from trading fees
        </p>
        {/* Debug info */}
        <div className='mt-2 text-xs text-gray-500'>
          Debug: Wallet connected = {isWalletConnected ? 'YES' : 'NO'} |
          Contract Addresses = {addresses ? 'LOADED' : 'LOADING'}
        </div>
      </div>

      {/* Wallet Connection Status */}
      {!isWalletConnected ? (
        <div className='bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-center'>
          <div className='flex items-center justify-center mb-4'>
            <AlertCircle className='text-white mr-2' size={24} />
            <h3 className='text-xl font-semibold text-white'>
              Connect Your Wallet
            </h3>
          </div>
          <p className='text-white/90 mb-6'>
            Connect your TonKeeper wallet to start providing liquidity and
            earning rewards.
          </p>
          <div className='flex justify-center'>
            <TonConnectButton className='!bg-white !text-pink-600 !px-8 !py-3 !rounded-xl !font-semibold hover:!bg-gray-50 transition-colors flex items-center justify-center' />
          </div>
        </div>
      ) : (
        <div className='bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center'>
              <div className='w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl mr-3 flex items-center justify-center'>
                <Wallet className='text-white' size={20} />
              </div>
              <div>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                  {walletInfo?.walletName || 'Connected Wallet'}
                </h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  {walletInfo?.address &&
                    `${walletInfo.address.slice(
                      0,
                      6
                    )}...${walletInfo.address.slice(-4)}`}
                </p>
              </div>
            </div>
            <TonConnectButton className='!bg-red-100 !text-red-600 !rounded-xl !font-medium' />
          </div>
        </div>
      )}

      {/* Token Selection - Only show if wallet is connected */}
      {isWalletConnected && (
        <div className='bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-800'>
          <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-6'>
            Select Pool
          </h3>
          {tokens.length === 0 ? (
            <p className='text-center text-gray-600 dark:text-gray-400 py-8'>
              Loading pools from chain...
            </p>
          ) : (
            <div className='grid grid-cols-1 gap-4'>
              {tokens.map((token) => (
                <button
                  key={token.symbol}
                  onClick={() => setSelectedToken(token)}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                    selectedToken?.symbol === token.symbol
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
                        Pool APY
                      </div>
                      <div className='text-sm text-green-600 dark:text-green-400 flex items-center'>
                        <TrendingUp size={14} className='mr-1' />
                        {token.apy}%
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Amount Input - Only show if wallet is connected */}
      {isWalletConnected && selectedToken && (
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
              Available: {selectedToken.balance} {selectedToken.symbol}
            </span>
            <button
              onClick={() => setAmount(selectedToken.balance)}
              className='text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium'
            >
              MAX
            </button>
          </div>
        </div>
      )}

      {/* Action Button - Only show if wallet is connected */}
      {isWalletConnected && selectedToken && (
        <div className='bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-800'>
          <div className='flex items-center justify-between mb-6'>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
              Transaction Summary
            </h3>
            <Info size={20} className='text-gray-400' />
          </div>

          <div className='space-y-4 mb-6'>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-600 dark:text-gray-400'>Pool</span>
              <span className='text-gray-900 dark:text-white font-medium'>
                {selectedToken.name}
              </span>
            </div>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-600 dark:text-gray-400'>Amount</span>
              <span className='text-gray-900 dark:text-white font-medium'>
                {amount || '0'} {selectedToken.symbol}
              </span>
            </div>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-600 dark:text-gray-400'>APY</span>
              <span className='text-green-600 dark:text-green-400 font-medium'>
                {selectedToken.apy}%
              </span>
            </div>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-600 dark:text-gray-400'>Contract</span>
              <span className='text-gray-900 dark:text-white font-medium text-xs'>
                {selectedToken.contract === 'dedust'
                  ? addresses?.dedustPool.slice(0, 8) + '...'
                  : addresses?.vault.slice(0, 8) + '...'}
              </span>
            </div>
          </div>

          <button
            onClick={handleAddLiquidity}
            disabled={!amount || parseFloat(amount) <= 0 || loading}
            className='w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
          >
            {loading ? (
              <>
                <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2' />
                Sending Transaction...
              </>
            ) : (
              <>
                <Plus size={20} className='mr-2' />
                Add Liquidity
              </>
            )}
          </button>

          <p className='text-xs text-gray-500 dark:text-gray-400 mt-4 text-center'>
            By adding liquidity, you agree to the pool's terms. Your transaction
            will be sent to the {selectedToken.contract} contract.
          </p>
        </div>
      )}
    </div>
  );
}
