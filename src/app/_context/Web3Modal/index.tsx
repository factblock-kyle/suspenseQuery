'use client';

import React, { ReactNode } from 'react';

import { State, WagmiProvider } from 'wagmi';

import { config, projectId } from '@config/wagmi';

// Setup queryClient

if (!projectId) throw new Error('Project ID is not defined');

export default function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      {children}
    </WagmiProvider>
  );
}
