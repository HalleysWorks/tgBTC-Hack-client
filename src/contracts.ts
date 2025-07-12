import { Address } from '@ton/ton';

export type ContractAddresses = {
  dedustPool: string;
  megatonPool: string;
  stonPool: string;
  vault: string;
  tgbtcRoot: string;
  jettonWallet: string;
};

export function parseContractAddresses(text: string): ContractAddresses {
  // Extracts addresses from the contract_address.txt format
  const get = (label: string) => {
    const match = text.match(new RegExp(label + '.*?([A-Z0-9_-]{48,})', 'i'));
    return match ? match[1] : '';
  };
  return {
    dedustPool: get('DeDust'),
    megatonPool: get('MegatonPool'),
    stonPool: get('StonPool'),
    vault: get('Vault'),
    tgbtcRoot: get('tgbtc root'),
    jettonWallet: get('JettonWallet'),
  };
}

export function isValidTonAddress(addr: string): boolean {
  try {
    Address.parse(addr);
    return true;
  } catch {
    return false;
  }
}
