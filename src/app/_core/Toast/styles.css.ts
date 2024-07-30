import { style, keyframes, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const slideIn = keyframes({
  '0%': { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
  '100%': { transform: 'translateX(0)' },
});

const hide = keyframes({
  '0%': { transform: 'translateX(0)' },
  '100%': { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
});

const swipeOut = keyframes({
  '0%': { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
  '100%': { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
});

export const toastRoot = style({
  borderRadius: '6px',
  width: '328px',
  maxWidth: '328px',
  minWidth: '328px',
  padding: '16px',
  display: 'grid',
  gridTemplateAreas: "'title action' 'description action'",
  gridTemplateColumns: 'auto max-content',
  columnGap: '15px',
  alignItems: 'center',
  // Applying animations based on data attributes
  selectors: {
    '&[data-state="open"]': {
      animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
    },
    '&[data-state="fixed"]': {
      animation: 'none',
    },
    '&[data-state="closed"]': {
      animation: `${hide} 150ms ease-in`,
    },
    '&[data-swipe="move"]': {
      transform: 'translateX(var(--radix-toast-swipe-move-x))',
    },
    '&[data-swipe="cancel"]': {
      transform: 'translateX(0)',
      transition: 'transform 200ms ease-out',
    },
    '&[data-swipe="end"]': {
      animation: `${swipeOut} 100ms ease-out`,
    },
  },
});

export const toastTitle = style({
  gridArea: 'title',
  display: 'flex',
  gap: '12px',
});

// 기존 색상 넣으면 혼동할까봐 디자인 안 넣었습니다.
export const toastVariants = recipe({
  base: toastRoot,
  variants: {
    type: {
      success: {
        // backgroundColor: vars.color.green['green-50'],
        // outlineColor: vars.color.green['green-200'],
        backgroundColor: 'wheat',
        outlineColor: 'black',
      },
      error: {
        // backgroundColor: vars.color.red['red-50'],
        // outlineColor: vars.color.red['red-200'],
        backgroundColor: 'wheat',
        outlineColor: 'black',
      },
      info: {
        // backgroundColor: vars.color.gray['gray-50'],
        // outlineColor: vars.color.gray['gray-200'],
        backgroundColor: 'wheat',
        outlineColor: 'black',
      },
      warning: {
        // backgroundColor: vars.color.yellow['yellow-50'],
        // outlineColor: vars.color.yellow['yellow-200'],
        backgroundColor: 'wheat',
        outlineColor: 'black',
      },
    },
    isInitialOpen: {
      true: {},
      false: { animation: 'none' },
    },
  },
  defaultVariants: {
    type: 'success',
  },
});

export const icon = style({});

globalStyle(`${icon} > svg`, {
  width: '20px',
  height: '20px',
  minWidth: '20px',
  minHeight: '20px',
  maxWidth: '20px',
  maxHeight: '20px',
});
