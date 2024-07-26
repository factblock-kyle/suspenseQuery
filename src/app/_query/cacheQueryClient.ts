import { cache } from 'react';

import { QueryClient } from '@tanstack/react-query';

const cacheQueryClient = cache(() => new QueryClient());
export default cacheQueryClient;
