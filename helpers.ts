import { ID_REGISTRY_ADDRESS, idGatewayABI, idRegistryABI } from '@farcaster/hub-web';
import { publicClient, fromAccount } from './clients.ts';

export const getDeadline = () => {
  const now = Math.floor(Date.now() / 1000);
  const oneHour = 60 * 60;
  return now + oneHour;
};

export const readNonce = async (address: `0x${string}`) => {
  return await publicClient.readContract({
    address: ID_REGISTRY_ADDRESS,
    abi: idGatewayABI,
    functionName: 'nonces',
    args: [address],
  });
};

export const getFid = async () => {
  const address = fromAccount.address;
  return await publicClient.readContract({
    address: ID_REGISTRY_ADDRESS,
    abi: idRegistryABI,
    functionName: 'idOf',
    args: [address],
  });
}