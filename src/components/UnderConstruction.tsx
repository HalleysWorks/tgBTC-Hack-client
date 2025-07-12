import React from 'react';

const UNDER_CONSTRUCTION_LIST = [
  'Metrics',
  'Alerts',
  // Add more page names as needed
];

const HIDE_COMPONENT_LIST = [
  'Notifications',
  'SettingsPanel',
  // Add more component names as needed
];

export function isUnderConstruction(name: string) {
  return UNDER_CONSTRUCTION_LIST.includes(name);
}

export function isComponentHidden(name: string) {
  return HIDE_COMPONENT_LIST.includes(name);
}

export function UnderConstruction({ name }: { name: string }) {
  return (
    <div className='flex flex-col items-center justify-center py-16'>
      <span className='text-5xl mb-4'>🚧</span>
      <h2 className='text-2xl font-bold mb-2'>{name} is under construction</h2>
      <p className='text-gray-500'>This feature is coming soon.</p>
    </div>
  );
}
