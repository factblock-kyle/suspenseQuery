import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const layout = style({
  display: 'flex',
  gap: '20px',
});

export const clicked = recipe({
  variants: {
    clicked: {
      true: {
        backgroundColor: 'red',
      },
    },
  },
});
