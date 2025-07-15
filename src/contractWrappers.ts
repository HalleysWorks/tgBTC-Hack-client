import { Cell, beginCell, Address } from '@ton/core';
import { TonClient } from '@ton/ton';

export interface ContractAddresses {
  dedustPool: string;
  megatonPool: string;
  stonPool: string;
  vault: string;
  tgbtcRoot: string;
  jettonWallet: string;
}

// Contract operation codes (based on .fc files)
const OP_VAULT_DEPOSIT = 1;
const OP_VAULT_WITHDRAW = 2;
const OP_DEDUST_ADD_LIQUIDITY = 10;
const OP_DEDUST_REMOVE_LIQUIDITY = 11;

export class VaultContract {
  private address: Address;
  private client: TonClient;

  constructor(address: Address, client: TonClient) {
    this.address = address;
    this.client = client;
  }

  static fromAddress(address: string, client: TonClient) {
    return new VaultContract(Address.parse(address), client);
  }

  // Build deposit message (op=1: deposit TON + tgBTC)
  createDepositMessage(tonAmount: bigint, tgbtcAmount: bigint = 0n) {
    return beginCell()
      .storeUint(OP_VAULT_DEPOSIT, 32)
      .storeAddress(Address.parse('EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c')) // placeholder sender
      .storeUint(tonAmount, 64)
      .storeUint(tgbtcAmount, 64)
      .endCell();
  }

  // Build withdraw message (op=2: withdraw shares)
  createWithdrawMessage(shares: bigint) {
    return beginCell()
      .storeUint(OP_VAULT_WITHDRAW, 32)
      .storeAddress(Address.parse('EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c')) // placeholder sender
      .storeUint(shares, 64)
      .endCell();
  }

  // Get vault state balances
  async getStateBalances(): Promise<{ tonBalance: bigint; tgbtcBalance: bigint }> {
    try {
      const result = await this.client.runMethod(this.address, 'get_state_balances');
      const stack = result.stack;
      return {
        tonBalance: stack.readBigNumber(),
        tgbtcBalance: stack.readBigNumber(),
      };
    } catch (error) {
      console.warn('Failed to get vault state balances:', error);
      return { tonBalance: 0n, tgbtcBalance: 0n };
    }
  }

  // Get total shares
  async getTotalShares(): Promise<bigint> {
    try {
      const result = await this.client.runMethod(this.address, 'get_total_shares');
      return result.stack.readBigNumber();
    } catch (error) {
      console.warn('Failed to get total shares:', error);
      return 0n;
    }
  }
}

export class DeDustPoolContract {
  private address: Address;
  private client: TonClient;

  constructor(address: Address, client: TonClient) {
    this.address = address;
    this.client = client;
  }

  static fromAddress(address: string, client: TonClient) {
    return new DeDustPoolContract(Address.parse(address), client);
  }

  // Build add liquidity message (op=10)
  createAddLiquidityMessage(tonAmount: bigint, tgbtcAmount: bigint = 0n) {
    return beginCell()
      .storeUint(OP_DEDUST_ADD_LIQUIDITY, 32)
      .storeAddress(Address.parse('EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c')) // placeholder sender
      .storeUint(tonAmount, 64)
      .storeUint(tgbtcAmount, 64)
      .endCell();
  }

  // Build remove liquidity message (op=11)
  createRemoveLiquidityMessage(lpTokens: bigint) {
    return beginCell()
      .storeUint(OP_DEDUST_REMOVE_LIQUIDITY, 32)
      .storeAddress(Address.parse('EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c')) // placeholder sender
      .storeUint(lpTokens, 64)
      .endCell();
  }

  // Get pool info (reserves, LP total, APY)
  async getPoolInfo(): Promise<{
    tonReserve: bigint;
    tgbtcReserve: bigint;
    lpTotal: bigint;
    apy: number;
  }> {
    try {
      const result = await this.client.runMethod(this.address, 'get_pool_info');
      const stack = result.stack;
      return {
        tonReserve: stack.readBigNumber(),
        tgbtcReserve: stack.readBigNumber(),
        lpTotal: stack.readBigNumber(),
        apy: Number(stack.readBigNumber()) / 100, // Convert basis points to percentage
      };
    } catch (error) {
      console.warn('Failed to get pool info:', error);
      return { tonReserve: 0n, tgbtcReserve: 0n, lpTotal: 0n, apy: 0 };
    }
  }

  // Get APY
  async getYield(): Promise<number> {
    try {
      const result = await this.client.runMethod(this.address, 'get_yield');
      return Number(result.stack.readBigNumber()) / 100; // Convert basis points to percentage
    } catch (error) {
      console.warn('Failed to get yield:', error);
      return 0;
    }
  }
}

export class JettonWalletContract {
  private address: Address;
  private client: TonClient;

  constructor(address: Address, client: TonClient) {
    this.address = address;
    this.client = client;
  }

  static fromAddress(address: string, client: TonClient) {
    return new JettonWalletContract(Address.parse(address), client);
  }

  // Get wallet data (balance, owner, master)
  async getWalletData(): Promise<{
    balance: bigint;
    owner: Address;
    master: Address;
  }> {
    try {
      const result = await this.client.runMethod(this.address, 'get_wallet_data');
      const stack = result.stack;
      return {
        balance: stack.readBigNumber(),
        owner: stack.readAddress(),
        master: stack.readAddress(),
      };
    } catch (error) {
      console.warn('Failed to get wallet data:', error);
      return {
        balance: 0n,
        owner: Address.parse('EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c'),
        master: Address.parse('EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c'),
      };
    }
  }
}

// Utility functions for TonConnect transactions
export function createTonConnectTransaction(
  address: string,
  amount: bigint,
  body?: Cell
) {
  return {
    validUntil: Math.floor(Date.now() / 1000) + 60,
    messages: [
      {
        address: address,
        amount: amount.toString(),
        payload: body ? body.toBoc().toString('base64') : undefined,
      },
    ],
  };
}

// Helper to format amounts
export function formatTokenAmount(amount: bigint, decimals: number = 9): string {
  const divisor = BigInt(10 ** decimals);
  const quotient = amount / divisor;
  const remainder = amount % divisor;
  
  if (remainder === 0n) {
    return quotient.toString();
  }
  
  const remainderStr = remainder.toString().padStart(decimals, '0');
  const trimmed = remainderStr.replace(/0+$/, '');
  
  return trimmed ? `${quotient}.${trimmed}` : quotient.toString();
}

// Helper to parse token amounts
export function parseTokenAmount(amount: string, decimals: number = 9): bigint {
  const parts = amount.split('.');
  const whole = parts[0] || '0';
  const fractional = (parts[1] || '').padEnd(decimals, '0').slice(0, decimals);
  
  return BigInt(whole) * BigInt(10 ** decimals) + BigInt(fractional);
}
