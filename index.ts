import { ID_REGISTRY_EIP_712_TYPES, idRegistryABI, ID_REGISTRY_ADDRESS } from '@farcaster/hub-web';
import { fromAccount, toAccount, walletClientTo, walletClientFrom } from './clients.ts';
import { readNonce, getDeadline, getFid } from './helpers.ts';

const nonceFrom = await readNonce(fromAccount.address);
const nonceTo = await readNonce(toAccount.address);
const deadline = BigInt(getDeadline())

const FID = await getFid();

if(FID === 0n) {
  console.error('From account does not have an FID');
  process.exit(1);
}

if(!toAccount.address.startsWith('0x')) {
  console.error('Invalid transfer to account');
  process.exit(1);
}

if(!fromAccount.address.startsWith('0x')) {
  console.error('Invalid transfer from account');
  process.exit(1);
}

console.log(`Transferring FID ${FID} from ${fromAccount.address} to ${toAccount} with and deadline ${deadline}`);

const sigFrom = await walletClientFrom.signTypedData({
  account: fromAccount,
  ...ID_REGISTRY_EIP_712_TYPES,
  primaryType: 'Transfer',
  message: {
    fid: FID,
    to: toAccount.address,
    nonce: nonceFrom,
    deadline,
  },
});

const sigTo = await walletClientTo.signTypedData({
  account: toAccount,
  ...ID_REGISTRY_EIP_712_TYPES,
  primaryType: 'Transfer',
  message: {
    fid: FID,
    to: toAccount.address,
    nonce: nonceTo,
    deadline,
  },
});

const args = {
  from: fromAccount.address,
  to: toAccount.address,
  fromDeadline: deadline,
  fromSig: sigFrom,
  toDeadline: deadline,
  toSig: sigTo,
}

// transfer
const tx = await walletClientFrom.writeContract({
  address: ID_REGISTRY_ADDRESS,
  abi: idRegistryABI,
  functionName: 'transferFor',
  args: [args.from, args.to, args.fromDeadline, args.fromSig, args.toDeadline, args.toSig],
});

console.log(`Transfer hash: ${tx}`);