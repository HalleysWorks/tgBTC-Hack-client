import { parseContractAddresses } from './contracts';
import type { ContractAddresses } from './contracts';

export async function getContractAddresses(): Promise<ContractAddresses> {
  const res = await fetch('/contract_address.txt');
  const text = await res.text();
  return parseContractAddresses(text);
}

export async function getTonClient() {
  // Lazy load TonClient to ensure Buffer is available
  const { TonClient } = await import('@ton/ton');
  return new TonClient({ endpoint: 'https://toncenter.com/api/v2/jsonRPC' });
}
