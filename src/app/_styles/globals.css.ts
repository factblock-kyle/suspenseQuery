'use client';

import { globalStyle } from '@vanilla-extract/css';

globalStyle('textarea', {
  resize: 'none',
});

globalStyle('button', {
  cursor: 'pointer',
  border: 'none',
  backgroundColor: 'transparent',
  padding: '0',
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
