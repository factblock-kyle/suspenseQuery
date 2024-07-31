'use client';

import { createGlobalTheme, globalStyle } from '@vanilla-extract/css';

import { COLOR_TOKEN } from './colorToken';
import { SPACE, Z_INDEX } from './constants';

export const vars = createGlobalTheme(':root', {
  color: COLOR_TOKEN,
  zIndex: Z_INDEX,
  space: SPACE,
});

globalStyle('textarea', {
  resize: 'none',
});

globalStyle('button', {
  cursor: 'pointer',
  border: 'none',
  backgroundColor: 'transparent',
  padding: '0',
});

globalStyle('button:disabled', {
  cursor: 'default',
});

globalStyle('a', {
  textDecoration: 'none',
  color: 'inherit',
  padding: 0,
});

globalStyle('input', {
  border: 'none',
  backgroundColor: 'inherit',
});

globalStyle('input:focus', {
  outline: 'none',
});
