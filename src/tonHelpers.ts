import type { ContractAddresses } from './contracts';

export async function getContractAddresses(): Promise<ContractAddresses> {
  // Return actual deployed testnet contract addresses
  return {
    dedustPool: 'EQCCL2mH3OrsHUJk_s01g4S1zSpnISKOjnkZ02FkQqoY6aWx',
    megatonPool: 'EQB52aT77-AesFVKmM6Wb7iUkBN-rCBILfURFSQwVVsShc',
    stonPool: 'EQDbezboymmTdBEt0_pO49bZV0kK26ZaBOOiOyekQAXZaeB7',
    vault: 'EQDAu-JP0E5K8Rc7NmyS5auYRb78FKAtFJg3nJ-irs2EYRP7',
    tgbtcRoot: 'EQDLpbQ2sNlYHfBb88iAVqJYgywQpNvlsVkVpxVqor8Yws9T',
    jettonWallet: 'EQDqUJoFjH6asVbEXL-P_LZ1Ng25K3xWGzpgaHH9RJ-Npnzy',
  };
}

export async function getTonClient() {
  // Lazy load TonClient to ensure Buffer is available
  const { TonClient } = await import('@ton/ton');
  return new TonClient({ endpoint: 'https://toncenter.com/api/v2/jsonRPC' });
}
