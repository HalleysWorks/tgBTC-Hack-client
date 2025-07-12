import { TonClient } from '@ton/ton';
import { parseContractAddresses } from './contracts';
import type { ContractAddresses } from './contracts';

export async function getContractAddresses(): Promise<ContractAddresses> {
  const res = await fetch('/contract_address.txt');
  const text = await res.text();
  return parseContractAddresses(text);
}

export function getTonClient() {
  // Use mainnet endpoint by default
  return new TonClient({ endpoint: 'https://toncenter.com/api/v2/jsonRPC' });
}
