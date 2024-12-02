import { Components } from '@mui/material';

import UIColors from '../utils/Colors';
import { breakpoints } from './BasicTypography';
import { LgFontSizes, XlFontSizes } from './FontSizes';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1Highlight: true,
    h2Promo: true,
    h2PromoHighlight: true,
    h3Promo: true,
    body2Highlight: true,
    h3Normal: true
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
    color: UIColors.textMain
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
      color: UIColors.textSecondary,
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
        variant: 'h1Highlight',
      },
      style: {
        color: UIColors.textHighlight,
        fontWeight: 700,
        [breakpoints.up('lg')]: {
          fontSize: LgFontSizes.h1Highlight
        },
        [breakpoints.only('xl')]: {
          fontSize: XlFontSizes.h1Highlight
        }
      }
    },
    {
      props: {
        variant: 'h2Promo',
      },
      style: {
        [breakpoints.up('lg')]: {
          fontSize: LgFontSizes.h2Promo
        },
        [breakpoints.only('xl')]: {
          fontSize: XlFontSizes.h2Promo
        },
        textAlign: 'center',
        width: '100%',
        fontWeight: 400
      }
    },
    {
      props: {
        variant: 'h2PromoHighlight',
      },
      style: {
        [breakpoints.up('lg')]: {
          fontSize: LgFontSizes.h2PromoHighlight
        },
        [breakpoints.only('xl')]: {
          fontSize: XlFontSizes.h2PromoHighlight
        },
        color: UIColors.textHighlight
      }
    },
    {
      props: {
        variant: 'h3Promo'
      },
      style: {
        [breakpoints.up('lg')]: {
          fontSize: LgFontSizes.h3Promo
        },
        [breakpoints.only('xl')]: {
          fontSize: XlFontSizes.h3Promo
        },
        textAlign: 'center',
        fontWeight: 400
      }
    },
    {
      props: {
        variant: 'body2Highlight',
      },
      style: {
        [breakpoints.up('lg')]: {
          fontSize: LgFontSizes.body2Highlight
        },
        [breakpoints.only('xl')]: {
          fontSize: XlFontSizes.body2Highlight
        },
        fontWeight: 700
      }
    },
    {
      props: {
        variant: 'h3Normal',
      },
      style: {
        fontWeight: 400,
        [breakpoints.up('lg')]: {
          fontSize: LgFontSizes.h3Normal
        },
        [breakpoints.only('xl')]: {
          fontSize: XlFontSizes.h3Normal
        }
      }
    }
  ]
};

export default Typography;
