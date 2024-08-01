import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const layout = style({
  display: 'flex',
  flexDirection: 'column',
});

export const container = recipe({
  base: {
    border: '1px solid',
    display: 'flex',
    justifyContent: 'space-between',
  },
  variants: {
    status: {
      normal: {
        borderColor: 'black',
      },
      error: {
        borderColor: 'red',
      },
    },
  },
});

export const maxLength = style({
  textAlign: 'right',
});
