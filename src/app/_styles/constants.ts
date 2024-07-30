export const SPACE = {
  none: '0',
  'spacing-2': '2px',
  'spacing-4': '4px',
  'spacing-8': '8px',
  'spacing-12': '12px',
  'spacing-16': '16px',
  'spacing-20': '20px',
  'spacing-24': '24px',
  'spacing-32': '32px',
  'spacing-40': '40px',
  'spacing-48': '48px',
  'spacing-56': '56px',
  'spacing-64': '64px',
};

export const TABLET_QUERY =
  'screen and (min-width : 768px) and (max-width: 1200px)';

export const MOBILE_QUERY = '(max-width : 767px)';

export const DESKTOP_QUERY = 'screen and (min-width: 1201px)';

export const TABLET_AND_MOBILE_QUERY = 'screen and (max-width: 1200px)';

export const MEDIA_QUERY = {
  desktop: DESKTOP_QUERY,
  tablet: TABLET_QUERY,
  mobile: MOBILE_QUERY,
  tabletAndMobile: TABLET_AND_MOBILE_QUERY,
};

export const Z_INDEX = {
  dropdown: '1000',
  sticky: '1010',
  fixed: '1020',
  popover: '1030',
  tooltip: '1040',
  'modal-backdrop': '1050',
  modal: '1060',
  toast: '1070',
};
