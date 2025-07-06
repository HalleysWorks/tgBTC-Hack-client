import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  RefreshCw,
  Clock,
} from 'lucide-react';

const tvlData = [
  { name: 'Mon', value: 2100000 },
  { name: 'Tue', value: 2200000 },
  { name: 'Wed', value: 2150000 },
  { name: 'Thu', value: 2300000 },
  { name: 'Fri', value: 2250000 },
  { name: 'Sat', value: 2400000 },
  { name: 'Sun', value: 2350000 },
];

const slippageData = [
  { name: 'DeDust', before: 0.8, after: 0.3 },
  { name: 'StonFi', before: 1.2, after: 0.4 },
  { name: 'Megaton', before: 1.5, after: 0.5 },
];

const poolDistribution = [
  { name: 'tgBTC/TON', value: 35, color: '#3B82F6' },
  { name: 'TON/USDT', value: 25, color: '#8B5CF6' },
  { name: 'USDC/USDT', value: 20, color: '#10B981' },
  { name: 'tgBTC/USDT', value: 15, color: '#F59E0B' },
  { name: 'Others', value: 5, color: '#EF4444' },
];

const rebalancingEvents = [
  {
    time: '2 hours ago',
    action: 'Moved 50k USDT from DeDust to StonFi',
    reason: 'Better rates',
  },
  {
    time: '4 hours ago',
    action: 'Rebalanced tgBTC/TON pool',
    reason: 'Price arbitrage',
  },
  {
    time: '8 hours ago',
    action: 'Added liquidity to USDC/USDT',
    reason: 'High demand',
  },
  {
    time: '12 hours ago',
    action: 'Withdrew from low-yield pool',
    reason: 'Optimization',
  },
];

export default function Metrics() {
  const [timeframe, setTimeframe] = useState('7d');

  return (
    <div className='p-4 space-y-6'>
      <div className='text-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 mb-2'>
          Protocol Metrics
        </h2>
        <p className='text-gray-600'>
          Real-time insights into protocol performance
        </p>
      </div>

      {/* Key Metrics */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <div className='bg-white rounded-xl p-4 shadow-sm'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600'>Total TVL</p>
              <p className='text-2xl font-bold text-blue-600'>$2.4M</p>
            </div>
            <DollarSign className='text-blue-500' size={24} />
          </div>
          <p className='text-sm text-green-600 mt-1 flex items-center'>
            <TrendingUp size={14} className='mr-1' />
            +12.5%
          </p>
        </div>

        <div className='bg-white rounded-xl p-4 shadow-sm'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600'>Avg Slippage</p>
              <p className='text-2xl font-bold text-green-600'>0.4%</p>
            </div>
            <Activity className='text-green-500' size={24} />
          </div>
          <p className='text-sm text-green-600 mt-1 flex items-center'>
            <TrendingDown size={14} className='mr-1' />
            -60% vs before
          </p>
        </div>

        <div className='bg-white rounded-xl p-4 shadow-sm'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600'>Active Pools</p>
              <p className='text-2xl font-bold text-purple-600'>15</p>
            </div>
            <RefreshCw className='text-purple-500' size={24} />
          </div>
          <p className='text-sm text-blue-600 mt-1'>3 DEXs</p>
        </div>

        <div className='bg-white rounded-xl p-4 shadow-sm'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600'>Rebalances</p>
              <p className='text-2xl font-bold text-orange-600'>24</p>
            </div>
            <Clock className='text-orange-500' size={24} />
          </div>
          <p className='text-sm text-gray-600 mt-1'>Last 24h</p>
        </div>
      </div>

      {/* TVL Chart */}
      <div className='bg-white rounded-xl p-6 shadow-sm'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-semibold text-gray-800'>
            Total Value Locked
          </h3>
          <div className='flex space-x-2'>
            {['24h', '7d', '30d'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  timeframe === period
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={tvlData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis
              tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
            />
            <Tooltip
              formatter={(value) => [
                `$${(value as number).toLocaleString()}`,
                'TVL',
              ]}
              labelStyle={{ color: '#374151' }}
            />
            <Line
              type='monotone'
              dataKey='value'
              stroke='#3B82F6'
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Slippage Comparison */}
      <div className='bg-white rounded-xl p-6 shadow-sm'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>
          Slippage Reduction by DEX
        </h3>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={slippageData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis tickFormatter={(value) => `${value}%`} />
            <Tooltip formatter={(value) => [`${value}%`, 'Slippage']} />
            <Bar dataKey='before' fill='#EF4444' name='Before Protocol' />
            <Bar dataKey='after' fill='#10B981' name='After Protocol' />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pool Distribution */}
      <div className='bg-white rounded-xl p-6 shadow-sm'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>
          Liquidity Distribution
        </h3>
        <div className='flex flex-col md:flex-row items-center'>
          <div className='w-full md:w-1/2'>
            <ResponsiveContainer width='100%' height={300}>
              <PieChart>
                <Pie
                  data={poolDistribution}
                  cx='50%'
                  cy='50%'
                  outerRadius={80}
                  dataKey='value'
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {poolDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className='w-full md:w-1/2 space-y-2'>
            {poolDistribution.map((pool, index) => (
              <div
                key={index}
                className='flex items-center justify-between p-2 bg-gray-50 rounded'
              >
                <div className='flex items-center'>
                  <div
                    className='w-4 h-4 rounded-full mr-2'
                    style={{ backgroundColor: pool.color }}
                  ></div>
                  <span className='font-medium'>{pool.name}</span>
                </div>
                <span className='text-gray-600'>{pool.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Rebalancing Events */}
      <div className='bg-white rounded-xl p-6 shadow-sm'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>
          Recent Rebalancing Events
        </h3>
        <div className='space-y-3'>
          {rebalancingEvents.map((event, index) => (
            <div
              key={index}
              className='flex items-start space-x-3 p-3 bg-gray-50 rounded-lg'
            >
              <div className='w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0'></div>
              <div className='flex-1'>
                <div className='font-medium text-gray-800'>{event.action}</div>
                <div className='text-sm text-gray-600 mt-1'>
                  <span className='font-medium'>Reason:</span> {event.reason}
                </div>
                <div className='text-xs text-gray-500 mt-1'>{event.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
