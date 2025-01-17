import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';
import { dir } from 'i18next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { languages } from '@i18n/settings';
import Providers from './provider';

interface LayoutProps {
  children: React.ReactNode;
  params: { lng: string };
}

export default function RootLayout({ children, params: { lng } }: LayoutProps) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
