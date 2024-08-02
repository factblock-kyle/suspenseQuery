'use client';

import { useMutation } from '@tanstack/react-query';
import { createWeb3Modal, useWeb3Modal } from '@web3modal/wagmi/react';
import { signOut, useSession } from 'next-auth/react';
import { useDisconnect } from 'wagmi';

import { postLogout } from '@/api/user/logout';
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
  const { data: session, status } = useSession();
  const { mutateAsync: logout } = useMutation({
    mutationFn: postLogout,
  });
  const { disconnect } = useDisconnect();

  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';
  const handleLogOut = async () => {
    try {
      if (status === 'authenticated') {
        await logout(session.accessToken);
        disconnect();
      }
      await signOut({ redirect: true, callbackUrl: '/' });
    } catch (err) {
      console.error(err);
    }
  };
  if (isLoading) return <div>loading</div>;
  if (isAuthenticated)
    return (
      <button type="button" onClick={handleLogOut}>
        log out
      </button>
    );
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
