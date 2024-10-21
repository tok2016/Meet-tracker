import { Components } from '@mui/material';

import { TextColors } from '../Colors';

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
    fontFamily: 'Inter',
    fontSize: 32,
    fontWeight: 400,
    color: TextColors.main
  },
  styleOverrides: {
    h1: {
      fontSize: 64,
    },
    h2: {
      fontSize: 40,
      fontWeight: 700
    },
    h3: {
      fontSize: 32,
      fontWeight: 700
    },
    h4: {
      fontSize: 32,
      fontWeight: 700
    },
    body2: {
      color: TextColors.secondary,
      fontSize: 24
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 700
    },
    subtitle2: {
      fontSize: 16
    }
  },
  variants: [
    {
      props: {
        variant: 'h1Highlight'
      },
      style: {
        color: TextColors.highlight,
        fontWeight: 700
      }
    },
    {
      props: {
        variant: 'h2Promo'
      },
      style: {
        fontSize: 96,
      }
    },
    {
      props: {
        variant: 'h2PromoHighlight'
      },
      style: {
        fontSize: 96,
        color: TextColors.highlight
      }
    },
    {
      props: {
        variant: 'h3Promo'
      },
      style: {
        fontSize: 48
      }
    },
    {
      props: {
        variant: 'body2Highlight'
      },
      style: {
        fontSize: 24,
        fontWeight: 700
      }
    }
  ]
};

export default Typography;
