import { useEffect, useState } from 'react';
import { getContractAddresses, getTonClient } from '../tonHelpers';
import type { ContractAddresses } from '../contracts';
import type { TonClient } from '@ton/ton';

export function useTonContracts() {
  const [addresses, setAddresses] = useState<ContractAddresses | null>(null);
  const [client, setClient] = useState<TonClient | null>(null);

  useEffect(() => {
    getContractAddresses().then(setAddresses);
    // Lazy load the client
    getTonClient().then(setClient);
  }, []);

  return { addresses, client };
}
