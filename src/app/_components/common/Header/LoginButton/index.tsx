'use client';

import { createWeb3Modal, useWeb3Modal } from '@web3modal/wagmi/react';
import { useSession } from 'next-auth/react';

import { siweConfig } from '@config/SIWE';
import { config, metadata, projectId } from '@config/wagmi';

export default function LoginButton() {
  if (!projectId) throw new Error('Project ID is not defined');
  createWeb3Modal({
    metadata,
    siweConfig,
    wagmiConfig: config,
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
  });
  const { open } = useWeb3Modal();
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  if (isAuthenticated) return <div>logged in</div>;
  return (
    <button
      type="button"
      onClick={() => {
        open();
      }}
    >
      Login
    </button>
  );
}
