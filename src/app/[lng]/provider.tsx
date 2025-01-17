'use client';

import { useState } from 'react';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function Providers({ children }: React.PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 3,
          refetchIntervalInBackground: false,
          retryOnMount: false,
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      {/* <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration> */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Providers;
