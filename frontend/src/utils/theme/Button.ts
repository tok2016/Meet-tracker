import { Components } from '@mui/material';

import { TextColors, UIColors } from '../Colors';
import { breakpoints } from './BasicTypography';
import { LgFontSizes, XlFontSizes } from './FontSizes';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    containtedSecondary: true,
    containtedTab: true,
    containtedTabSelected: true,
    transparent: true,
    danger: true,
    filter: true,
    filterSelected: true,
    filterValuable: true,
    filterValue: true
  }
}

const Button: Components['MuiButton'] = {
  defaultProps: {
    variant: 'contained',
    sx: {
      borderRadius: 30,
      height: '2.2em'
    }
  },
  variants: [
    {
      props: {
        variant: 'containtedSecondary'
      },
      style: {
        borderRadius: 10,
        height: '2.5em',
        [breakpoints.up('lg')]: {
          fontSize: 16
        },
        [breakpoints.only('xl')]: {
          fontSize: 24
        },
        fontWeight: 700,
        boxShadow: '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);',
        ':hover': {
          boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);'
        }
      }
    },
    {
      props: {
        variant: 'containtedTabSelected'
      },
      style: {
        background: UIColors.mainGradient(),
        color: TextColors.contrast,
        minHeight: '3em',
        borderRadius: 10,
        ':hover': {
          background: UIColors.mainHoverGradient(),
          color: TextColors.contrast
        }
      }
    },
    {
      props: {
        variant: 'containtedTab'
      },
      style: {
        background: UIColors.disabled,
        color: TextColors.contrast,
        minHeight: '3em',
        borderRadius: 10,
        ':hover': {
          background: UIColors.mainHoverGradient(),
          color: TextColors.contrast
        }
      }
    },
    {
      props: {
        variant: 'transparent'
      },
      style: {
        backgroundColor: 'transparent',
        color: TextColors.secondary
      }
    },
    {
      props: {
        variant: 'danger'
      },
      style: {
        color: TextColors.error,
        backgroundColor: 'transparent',
        ':hover': {
          backgroundColor: TextColors.error,
          color: TextColors.contrast
        },
        ':active': {
          color: TextColors.main,
          backgroundColor: 'transparent',
        }
      }
    },
    {
      props: {
        variant: 'filter'
      },
      style: {
        color: TextColors.secondary,
        fontWeight: 400,
        backgroundColor: 'transparent',
        ':hover': {
          color: TextColors.highlight
        }
      }
    },
    {
      props: {
        variant: 'filterSelected'
      },
      style: {
        color: TextColors.highlight,
        fontWeight: 400,
        backgroundColor: 'transparent',
        ':hover': {
          color: TextColors.highlight
        }
      }
    },
    {
      props: {
        variant: 'filterValuable'
      },
      style: {
        color: TextColors.main,
        fontWeight: 400,
        backgroundColor: 'transparent',
        ':hover': {
          color: TextColors.highlight
        }
      }
    },
    {
      props: {
        variant: 'filterValue'
      },
      style: {
        color: TextColors.main,
        backgroundColor: 'transparent',
        fontWeight: 700,
        [breakpoints.up('lg')]: {
          fontSize: LgFontSizes.subtitle1
        },
        [breakpoints.only('xl')]: {
          fontSize: XlFontSizes.subtitle1
        },
        padding: 0,
        height: '1em',
        ':hover': {
          color: TextColors.error
        }
      }
    }
  ]
};

export default Button;
