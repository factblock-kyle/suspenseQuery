import '@styles/reset.css';
import '@styles/globals.css';

import type { Metadata } from 'next';

import { dir } from 'i18next';
import { Inter } from 'next/font/google';

import { languages } from '@i18n/settings';

import Provider from './provider';

interface LayoutProps {
  children: React.ReactNode;
  params: { lng: string };
}

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({ children, params: { lng } }: LayoutProps) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
