import { style } from '@vanilla-extract/css';

import { Z_INDEX } from '@styles/constants';

export const overlay = style({
  background: 'rgba(0, 0, 0, 0.4)',
  position: 'fixed',
  inset: 0,
  animation: 'fade-in 150ms cubic-bezier(0.16, 1, 0.3, 1)',
  zIndex: Z_INDEX['modal-backdrop'],
});

export const content = style({
  position: 'fixed',
  zIndex: Z_INDEX.modal,
  backgroundColor: 'white',
  borderRadius: 6,
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '25px',
  animation: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
});
