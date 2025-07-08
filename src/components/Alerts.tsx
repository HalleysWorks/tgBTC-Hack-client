import { useState } from 'react';
import {
  Bell,
  TrendingUp,
  AlertTriangle,
  Info,
  Settings,
  X,
} from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'opportunity',
    title: 'High Yield Opportunity',
    message:
      'DeDust tgBTC/TON pool running low - great time to provide liquidity!',
    time: '2 hours ago',
    priority: 'high',
    action: 'Add Liquidity',
    icon: TrendingUp,
    color: 'green',
  },
  {
    id: 2,
    type: 'idle',
    title: 'Idle LP Tokens',
    message: 'Your LP tokens are idle - deploy now for better APY',
    time: '4 hours ago',
    priority: 'medium',
    action: 'Deploy Now',
    icon: AlertTriangle,
    color: 'orange',
  },
  {
    id: 3,
    type: 'expiring',
    title: 'Lock Expiring Soon',
    message:
      'Locked position maturing in 2 days - prepare for auto-renew or exit',
    time: '1 day ago',
    priority: 'medium',
    action: 'Manage Lock',
    icon: Info,
    color: 'blue',
  },
  {
    id: 4,
    type: 'rebalance',
    title: 'Rebalancing Complete',
    message: 'Your liquidity has been optimally rebalanced across DEXs',
    time: '6 hours ago',
    priority: 'low',
    action: 'View Details',
    icon: TrendingUp,
    color: 'green',
  },
];

const alertSettings = [
  {
    id: 'opportunities',
    label: 'Yield Opportunities',
    description: 'Alert when high APY pools are available',
    enabled: true,
  },
  {
    id: 'idle',
    label: 'Idle Positions',
    description: 'Notify when LP tokens are not earning optimal yields',
    enabled: true,
  },
  {
    id: 'expiring',
    label: 'Expiring Locks',
    description: 'Remind about positions expiring soon',
    enabled: true,
  },
  {
    id: 'rebalancing',
    label: 'Rebalancing Events',
    description: 'Updates on automatic rebalancing',
    enabled: false,
  },
  {
    id: 'price',
    label: 'Price Alerts',
    description: 'Significant price movements in your tokens',
    enabled: true,
  },
  {
    id: 'governance',
    label: 'Governance',
    description: 'New proposals and voting opportunities',
    enabled: false,
  },
];

export default function Alerts() {
  const [activeAlerts, setActiveAlerts] = useState(alerts);
  const [settings, setSettings] = useState(alertSettings);
  const [showSettings, setShowSettings] = useState(false);

  const dismissAlert = (id: number) => {
    setActiveAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const toggleSetting = (id: string) => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 dark:bg-red-950/50 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-950/50 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800';
      case 'low':
        return 'bg-green-100 dark:bg-green-950/50 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'green':
        return 'text-green-600 dark:text-green-400';
      case 'orange':
        return 'text-orange-600 dark:text-orange-400';
      case 'blue':
        return 'text-blue-600 dark:text-blue-400';
      case 'red':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className='p-4 space-y-6 max-w-6xl mx-auto'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
            Alerts & Notifications
          </h2>
          <p className='text-gray-600 dark:text-gray-400'>
            Stay informed about your liquidity positions
          </p>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className='p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'
        >
          <Settings size={20} />
        </button>
      </div>

      {showSettings && (
        <div className='bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
              Alert Settings
            </h3>
            <button
              onClick={() => setShowSettings(false)}
              className='p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            >
              <X size={20} />
            </button>
          </div>
          <div className='space-y-4'>
            {settings.map((setting) => (
              <div
                key={setting.id}
                className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg'
              >
                <div className='flex-1'>
                  <div className='font-medium text-gray-900 dark:text-white'>
                    {setting.label}
                  </div>
                  <div className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
                    {setting.description}
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting(setting.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    setting.enabled
                      ? 'bg-blue-600 dark:bg-blue-500'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      setting.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Alerts */}
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
            Active Alerts
          </h3>
          <div className='flex items-center text-sm text-gray-600 dark:text-gray-400'>
            <Bell size={16} className='mr-1' />
            {activeAlerts.length} alerts
          </div>
        </div>

        {activeAlerts.length === 0 ? (
          <div className='bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-800 text-center'>
            <Bell
              size={48}
              className='mx-auto text-gray-400 dark:text-gray-500 mb-4'
            />
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
              No Active Alerts
            </h3>
            <p className='text-gray-600 dark:text-gray-400'>
              You're all caught up! We'll notify you when there are new
              opportunities.
            </p>
          </div>
        ) : (
          <div className='space-y-3'>
            {activeAlerts.map((alert) => {
              const IconComponent = alert.icon;
              return (
                <div
                  key={alert.id}
                  className='bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-800'
                >
                  <div className='flex items-start justify-between'>
                    <div className='flex items-start space-x-3'>
                      <div
                        className={`p-2 rounded-full ${
                          alert.color === 'green'
                            ? 'bg-green-100 dark:bg-green-950/50'
                            : alert.color === 'orange'
                            ? 'bg-orange-100 dark:bg-orange-950/50'
                            : 'bg-blue-100 dark:bg-blue-950/50'
                        }`}
                      >
                        <IconComponent
                          size={20}
                          className={getIconColor(alert.color)}
                        />
                      </div>
                      <div className='flex-1'>
                        <div className='flex items-center space-x-2 mb-1'>
                          <h4 className='font-semibold text-gray-900 dark:text-white'>
                            {alert.title}
                          </h4>
                          <span
                            className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(
                              alert.priority
                            )}`}
                          >
                            {alert.priority}
                          </span>
                        </div>
                        <p className='text-gray-600 dark:text-gray-400 text-sm mb-2'>
                          {alert.message}
                        </p>
                        <div className='flex items-center justify-between'>
                          <span className='text-xs text-gray-500 dark:text-gray-500'>
                            {alert.time}
                          </span>
                          <div className='flex space-x-2'>
                            <button className='px-3 py-1 bg-blue-100 dark:bg-blue-950/50 text-blue-800 dark:text-blue-200 text-sm rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors'>
                              {alert.action}
                            </button>
                            <button
                              onClick={() => dismissAlert(alert.id)}
                              className='px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
                            >
                              Dismiss
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recommendations */}
      <div className='bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-xl p-6 border border-blue-200 dark:border-blue-800'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
          Smart Recommendations
        </h3>
        <div className='space-y-3'>
          <div className='flex items-start space-x-3'>
            <div className='w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0'></div>
            <div>
              <div className='font-medium text-gray-900 dark:text-white'>
                Optimize Your Portfolio
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
                Consider moving 20% of your USDT to tgBTC/TON pair for +2.3% APY
                increase
              </div>
            </div>
          </div>
          <div className='flex items-start space-x-3'>
            <div className='w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full mt-2 flex-shrink-0'></div>
            <div>
              <div className='font-medium text-gray-900 dark:text-white'>
                Lock Extension Available
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
                Extend your TON lock for 30 days to earn 1.5x multiplier on
                rewards
              </div>
            </div>
          </div>
          <div className='flex items-start space-x-3'>
            <div className='w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full mt-2 flex-shrink-0'></div>
            <div>
              <div className='font-medium text-gray-900 dark:text-white'>
                New Pool Opportunity
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
                New USDC/TON pool launched with 15% APY - perfect for stable
                yield
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
