import { english, generateMnemonic } from 'viem/accounts';

const mnemonic = generateMnemonic(english);
console.log(mnemonic);