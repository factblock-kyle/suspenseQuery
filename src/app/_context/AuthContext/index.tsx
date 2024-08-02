/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */

'use client';

import { SessionProvider } from 'next-auth/react';

type Props = {
  children: React.ReactNode;
  url: string;
};

const AuthContext = ({ children, url }: Props) => {
  return <SessionProvider basePath={url}>{children}</SessionProvider>;
};

export default AuthContext;
