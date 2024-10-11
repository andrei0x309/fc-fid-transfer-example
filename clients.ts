import { createWalletClient, http, createPublicClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { optimism } from 'viem/chains';

const PK_FROM = process.env.PK_FROM as `0x${string}`;
const PK_TO = process.env.PK_TO as `0x${string}`;

export const fromAccount = privateKeyToAccount(PK_FROM);

export const toAccount = privateKeyToAccount(PK_TO);

export const walletClientFrom = createWalletClient({
  account: fromAccount,
  chain: optimism,
  transport: http(),
});

export const walletClientTo = createWalletClient({
  account: toAccount,
  chain: optimism,
  transport: http(),
});

export const publicClient = createPublicClient({
  chain: optimism,
  transport: http(),
});


