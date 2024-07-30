import { style } from '@vanilla-extract/css';

import {
  TABLET_AND_MOBILE_QUERY,
  TABLET_QUERY,
  MOBILE_QUERY,
} from '@styles/constants';
import { vars } from '@styles/globals.css';

export const toastViewport = style({
  vars: {
    '--viewport-padding': '16px',
    '--header-height': '81px',
  },
  position: 'absolute',
  top: 'var(--header-height)',
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  padding: 'var(--viewport-padding)',
  gap: '10px',
  margin: 0,
  listStyle: 'none',
  zIndex: vars.zIndex.toast,
  outline: 'none',
  '@media': {
    [TABLET_AND_MOBILE_QUERY]: {
      top: 0,
    },
  },
});

export const mediaLayout = style({
  position: 'fixed',
  top: '0',
  width: '100%',
  zIndex: vars.zIndex.modal,
  '@media': {
    [TABLET_QUERY]: {
      width: '768px',
      backgroundColor: 'transparent',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: vars.zIndex.modal,
    },
    [MOBILE_QUERY]: {
      width: '100%',
      backgroundColor: 'transparent',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: vars.zIndex.modal,
    },
  },
});
