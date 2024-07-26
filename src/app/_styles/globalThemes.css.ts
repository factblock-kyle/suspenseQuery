import { createGlobalTheme } from '@vanilla-extract/css';

import { COLOR_TOKEN } from './colorToken';

export const vars = createGlobalTheme(':root', {
  color: COLOR_TOKEN,
});
