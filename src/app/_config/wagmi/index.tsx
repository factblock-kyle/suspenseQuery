import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { mainnet, sepolia } from 'wagmi/chains';

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error('Project ID is not defined');

export const metadata = {
  name: 'Fablo',
  description: 'Fablo Wallet connect',
  url: 'https://playfablo.com', // origin must match your domain & subdomain
  icons: [
    `${process.env.NEXT_PUBLIC_FABLO_S3_BUCKET_URL}/web/'fablo-logo-beta.png`,
  ],
};

// Create wagmiConfig
const chains = [mainnet, sepolia] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
});
