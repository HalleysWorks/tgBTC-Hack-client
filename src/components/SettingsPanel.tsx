import { useState } from 'react';
import {
  Shield,
  Zap,
  Users,
  Vote,
  Bell,
  Moon,
  Sun,
  Globe,
  HelpCircle,
} from 'lucide-react';

const riskProfiles = [
  {
    id: 'conservative',
    label: 'Conservative',
    description: 'Prioritize stability and lower risk',
    icon: Shield,
  },
  {
    id: 'balanced',
    label: 'Balanced',
    description: 'Moderate risk for better returns',
    icon: Zap,
  },
  {
    id: 'aggressive',
    label: 'Aggressive',
    description: 'Higher risk for maximum yield',
    icon: Users,
  },
];

const governanceProposals = [
  {
    id: 1,
    title: 'Reduce Slippage Target to 0.3%',
    description:
      'Proposal to tighten slippage tolerance for better user experience',
    votes: { for: 847, against: 123, abstain: 45 },
    timeLeft: '3 days',
    status: 'active',
  },
  {
    id: 2,
    title: 'Add Support for Megaton DEX',
    description:
      'Expand protocol to include Megaton DEX for broader liquidity distribution',
    votes: { for: 1205, against: 89, abstain: 67 },
    timeLeft: '1 day',
    status: 'active',
  },
  {
    id: 3,
    title: 'Increase LP Rewards by 20%',
    description:
      'Boost incentives for liquidity providers to attract more capital',
    votes: { for: 692, against: 234, abstain: 98 },
    timeLeft: 'Ended',
    status: 'passed',
  },
];

const stewards = [
  {
    id: 1,
    name: 'Alice Protocol',
    votes: 1234,
    description: 'Core protocol developer',
    trusted: true,
  },
  {
    id: 2,
    name: 'TON Foundation',
    votes: 2567,
    description: 'Ecosystem supporter',
    trusted: true,
  },
  {
    id: 3,
    name: 'DeFi Collective',
    votes: 891,
    description: 'Community representative',
    trusted: false,
  },
];

export default function SettingsPanel() {
  const [riskProfile, setRiskProfile] = useState('balanced');
  const [notifications, setNotifications] = useState({
    opportunities: true,
    rebalancing: false,
    governance: true,
    security: true,
  });
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [delegatedSteward, setDelegatedSteward] = useState(stewards[0].id);

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className='p-4 space-y-6'>
      <div className='text-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 mb-2'>Settings</h2>
        <p className='text-gray-600'>
          Customize your liquidity protocol experience
        </p>
      </div>

      {/* Risk Profile */}
      <div className='bg-white rounded-xl p-6 shadow-sm'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>
          Risk Tolerance
        </h3>
        <div className='space-y-3'>
          {riskProfiles.map((profile) => {
            const IconComponent = profile.icon;
            return (
              <button
                key={profile.id}
                onClick={() => setRiskProfile(profile.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  riskProfile === profile.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className='flex items-center space-x-3'>
                  <IconComponent
                    size={24}
                    className={
                      riskProfile === profile.id
                        ? 'text-blue-600'
                        : 'text-gray-600'
                    }
                  />
                  <div className='text-left'>
                    <div className='font-semibold text-gray-800'>
                      {profile.label}
                    </div>
                    <div className='text-sm text-gray-600'>
                      {profile.description}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Notifications */}
      <div className='bg-white rounded-xl p-6 shadow-sm'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>
          Notifications
        </h3>
        <div className='space-y-4'>
          {(
            Object.entries(notifications) as [
              keyof typeof notifications,
              boolean
            ][]
          ).map(([key, enabled]) => (
            <div
              key={key}
              className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
            >
              <div className='flex items-center space-x-3'>
                <Bell size={20} className='text-gray-600' />
                <div>
                  <div className='font-medium text-gray-800 capitalize'>
                    {key}
                  </div>
                  <div className='text-sm text-gray-600'>
                    {key === 'opportunities' &&
                      'High yield opportunities and alerts'}
                    {key === 'rebalancing' &&
                      'Automatic rebalancing notifications'}
                    {key === 'governance' && 'Governance proposals and voting'}
                    {key === 'security' && 'Security alerts and updates'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => toggleNotification(key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  enabled ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Appearance */}
      <div className='bg-white rounded-xl p-6 shadow-sm'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>Appearance</h3>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              {theme === 'light' ? (
                <Sun size={20} className='text-yellow-500' />
              ) : (
                <Moon size={20} className='text-blue-500' />
              )}
              <div>
                <div className='font-medium text-gray-800'>Theme</div>
                <div className='text-sm text-gray-600'>
                  Choose your preferred appearance
                </div>
              </div>
            </div>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            >
              <option value='light'>Light</option>
              <option value='dark'>Dark</option>
              <option value='auto'>Auto</option>
            </select>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              <Globe size={20} className='text-gray-600' />
              <div>
                <div className='font-medium text-gray-800'>Language</div>
                <div className='text-sm text-gray-600'>
                  Select your preferred language
                </div>
              </div>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            >
              <option value='en'>English</option>
              <option value='ru'>Русский</option>
              <option value='es'>Español</option>
              <option value='fr'>Français</option>
            </select>
          </div>
        </div>
      </div>

      {/* Governance */}
      <div className='bg-white rounded-xl p-6 shadow-sm'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>Governance</h3>

        {/* Active Proposals */}
        <div className='mb-6'>
          <h4 className='font-medium text-gray-800 mb-3'>Active Proposals</h4>
          <div className='space-y-3'>
            {governanceProposals
              .filter((p) => p.status === 'active')
              .map((proposal) => (
                <div key={proposal.id} className='p-3 bg-gray-50 rounded-lg'>
                  <div className='flex items-start justify-between mb-2'>
                    <div className='flex-1'>
                      <div className='font-medium text-gray-800'>
                        {proposal.title}
                      </div>
                      <div className='text-sm text-gray-600 mt-1'>
                        {proposal.description}
                      </div>
                    </div>
                    <div className='text-sm text-gray-500 ml-4'>
                      {proposal.timeLeft}
                    </div>
                  </div>
                  <div className='flex items-center space-x-4 mt-3'>
                    <div className='flex items-center space-x-2'>
                      <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                      <span className='text-sm text-gray-600'>
                        For: {proposal.votes.for}
                      </span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                      <span className='text-sm text-gray-600'>
                        Against: {proposal.votes.against}
                      </span>
                    </div>
                    <button className='ml-auto px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full hover:bg-blue-200 transition-colors'>
                      <Vote size={14} className='inline mr-1' />
                      Vote
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Delegate Votes */}
        <div>
          <h4 className='font-medium text-gray-800 mb-3'>Delegate Votes</h4>
          <div className='space-y-2'>
            {stewards.map((steward) => (
              <button
                key={steward.id}
                onClick={() => setDelegatedSteward(steward.id)}
                className={`w-full p-3 rounded-lg border-2 transition-all ${
                  delegatedSteward === steward.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className='flex items-center justify-between'>
                  <div className='text-left'>
                    <div className='font-medium text-gray-800 flex items-center'>
                      {steward.name}
                      {steward.trusted && (
                        <span className='ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full'>
                          Trusted
                        </span>
                      )}
                    </div>
                    <div className='text-sm text-gray-600'>
                      {steward.description}
                    </div>
                  </div>
                  <div className='text-sm text-gray-500'>
                    {steward.votes} votes
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Help & Support */}
      <div className='bg-white rounded-xl p-6 shadow-sm'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>
          Help & Support
        </h3>
        <div className='space-y-3'>
          <button className='w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center'>
            <HelpCircle size={20} className='text-gray-600 mr-3' />
            <div className='text-left'>
              <div className='font-medium text-gray-800'>Documentation</div>
              <div className='text-sm text-gray-600'>
                Learn how to use the protocol
              </div>
            </div>
          </button>
          <button className='w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center'>
            <Users size={20} className='text-gray-600 mr-3' />
            <div className='text-left'>
              <div className='font-medium text-gray-800'>Community</div>
              <div className='text-sm text-gray-600'>
                Join our Telegram group
              </div>
            </div>
          </button>
          <button className='w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center'>
            <Shield size={20} className='text-gray-600 mr-3' />
            <div className='text-left'>
              <div className='font-medium text-gray-800'>Security</div>
              <div className='text-sm text-gray-600'>
                Report security issues
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
