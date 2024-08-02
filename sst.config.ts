/* eslint-disable import/no-extraneous-dependencies */
import { SSTConfig } from 'sst';

import { BoilerPlateStack } from './stacks/MyStack';

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config(_input) {
    return {
      name: 'nextjs-boilerplate',
      region: 'ap-northeast-2',
    };
  },
  stacks(app) {
    app.stack(BoilerPlateStack);
  },
} satisfies SSTConfig;
