import { style } from '@vanilla-extract/css';

import { vars } from '@styles/globalThemes.css';

export const container = style({
  width: '100%',
  backgroundColor: vars.color.primary['primary-100'],
});
