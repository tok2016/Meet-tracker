import { Components } from '@mui/material';

import { TextColors, UIColors } from '../Colors';
import { breakpoints } from './BasicTypography';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    containtedSecondary: true,
    containtedTetriatry: true,
    transparent: true
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
        fontWeight: 700
      }
    },
    {
      props: {
        variant: 'containtedTetriatry'
      },
      style: {
        backgroundColor: UIColors.mainGradient(),
        color: TextColors.contrast,
        minHeight: '3em',
        paddingTop: '2em',
        borderRadius: 0
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
    }
  ]
};

export default Button;
