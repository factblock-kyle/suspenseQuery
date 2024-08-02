'use client';

import { useMutation } from '@tanstack/react-query';
import { createWeb3Modal, useWeb3Modal } from '@web3modal/wagmi/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useConnect, useDisconnect } from 'wagmi';

import { postLogout } from '@/api/user/logout';
import { siweConfig } from '@config/SIWE';
import { config, metadata, projectId } from '@config/wagmi';

import * as S from './styles.css';

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
  const { disconnectAsync } = useDisconnect();
  useConnect();
  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';
  const handleWeb2Login = async (name: string) => {
    try {
      await signIn(name, {
        callbackUrl: '/',
        redirect: false, // #552
      });
    } catch (err) {
      await signOut(); // #552
    }
  };
  const handleLogOut = async () => {
    try {
      if (status === 'authenticated') {
        await disconnectAsync();
        await logout(session.accessToken);
      }
      await signOut({ redirect: true, callbackUrl: '/' });
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <div>loading</div>;
  if (isAuthenticated)
    return (
      <>
        <div>{session.userId}</div>
        <button type="button" onClick={handleLogOut}>
          log out
        </button>
      </>
    );
  return (
    <div className={S.container}>
      <button
        type="button"
        onClick={() => {
          open();
        }}
      >
        Web3 Login
      </button>
      <button type="button" onClick={() => handleWeb2Login('google')}>
        Google Login
      </button>
      <button type="button" onClick={() => handleWeb2Login('kakao')}>
        Kakao Login
      </button>
      <button type="button" onClick={() => handleWeb2Login('naver')}>
        Naver Login
      </button>
    </div>
  );
}
