import { Components } from '@mui/material';

import { TextColors, UIColors } from '../Colors';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    containtedSecondary: true,
    containtedTetriatry: true
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
        fontSize: 24,
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
    }
  ]
};

export default Button;
