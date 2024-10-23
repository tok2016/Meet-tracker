import { Components } from '@mui/material';

import { TextColors } from '../Colors';
import { breakpoints } from './BasicTypography';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1Highlight: true,
    h2Promo: true,
    h2PromoHighlight: true,
    h3Promo: true,
    body2Highlight: true
  }
}

const Typography: Components['MuiTypography'] = {
  defaultProps: {
    variantMapping: {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      body1: 'p',
      body2: 'p',
      subtitle1: 'p',
      subtitle2: 'p'
    },
    fontWeight: 400,
    color: TextColors.main
  },
  styleOverrides: {
    h2: {
      fontWeight: 700,
      textAlign: 'center'
    },
    h3: {
      fontWeight: 700,
      textAlign: 'center'
    },
    h4: {
      fontWeight: 700
    },
    body2: {
      color: TextColors.secondary,
    },
    subtitle1: {
      fontWeight: 700,
      textAlign: 'center'
    },
    subtitle2: {
      textAlign: 'center'
    }
  },
  variants: [
    {
      props: {
        variant: 'h1Highlight'
      },
      style: {
        color: TextColors.highlight,
        fontWeight: 700,
        [breakpoints.up('lg')]: {
          fontSize: 48
        },
        [breakpoints.only('xl')]: {
          fontSize: 64
        }
      }
    },
    {
      props: {
        variant: 'h2Promo'
      },
      style: {
        [breakpoints.up('lg')]: {
          fontSize: 64
        },
        [breakpoints.only('xl')]: {
          fontSize: 96
        },
        textAlign: 'center'
      }
    },
    {
      props: {
        variant: 'h2PromoHighlight'
      },
      style: {
        [breakpoints.up('lg')]: {
          fontSize: 64
        },
        [breakpoints.only('xl')]: {
          fontSize: 96
        },
        color: TextColors.highlight
      }
    },
    {
      props: {
        variant: 'h3Promo'
      },
      style: {
        [breakpoints.up('lg')]: {
          fontSize: 32
        },
        [breakpoints.only('xl')]: {
          fontSize: 48
        },
        textAlign: 'center'
      }
    },
    {
      props: {
        variant: 'body2Highlight'
      },
      style: {
        [breakpoints.up('lg')]: {
          fontSize: 16
        },
        [breakpoints.only('xl')]: {
          fontSize: 24
        },
        fontWeight: 700
      }
    }
  ]
};

export default Typography;
