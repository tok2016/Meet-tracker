import { Components } from '@mui/material';

import {getCssVariable} from '../utils/Colors';
import { breakpoints } from './BasicTypography';
import { LgFontSizes, MdFontSizes, SmFontSizes, XlFontSizes, XsFontSizes } from './FontSizes';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1Highlight: true,
    h2Promo: true,
    h2PromoHighlight: true,
    h3Promo: true,
    body2Highlight: true,
    h3Normal: true,
    error: true
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
    color: getCssVariable('textMainColor')
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
      color: getCssVariable('textSecondaryColor'),
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
        color: getCssVariable('textHighlightColor'),
        fontWeight: 700,
        [breakpoints.down('sm')]: {
          fontSize: XsFontSizes.h1Highlight
        },
        [breakpoints.up('sm')]: {
          fontSize: SmFontSizes.h1Highlight
        },
        [breakpoints.up('md')]: {
          fontSize: MdFontSizes.h1Highlight
        },
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
        [breakpoints.down('sm')]: {
          fontSize: XsFontSizes.h2Promo
        },
        [breakpoints.up('sm')]: {
          fontSize: SmFontSizes.h2Promo
        },
        [breakpoints.up('md')]: {
          fontSize: MdFontSizes.h2Promo
        },
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
        [breakpoints.down('sm')]: {
          fontSize: XsFontSizes.h2PromoHighlight
        },
        [breakpoints.up('sm')]: {
          fontSize: SmFontSizes.h2PromoHighlight
        },
        [breakpoints.up('md')]: {
          fontSize: MdFontSizes.h2PromoHighlight
        },
        [breakpoints.up('lg')]: {
          fontSize: LgFontSizes.h2PromoHighlight
        },
        [breakpoints.only('xl')]: {
          fontSize: XlFontSizes.h2PromoHighlight
        },
        color: getCssVariable('textHighlightColor')
      }
    },
    {
      props: {
        variant: 'h3Promo'
      },
      style: {
        [breakpoints.down('sm')]: {
          fontSize: XsFontSizes.h3Promo
        },
        [breakpoints.up('sm')]: {
          fontSize: SmFontSizes.h3Promo
        },
        [breakpoints.up('md')]: {
          fontSize: MdFontSizes.h3Promo
        },
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
        [breakpoints.down('sm')]: {
          fontSize: XsFontSizes.body2Highlight
        },
        [breakpoints.up('sm')]: {
          fontSize: SmFontSizes.body2Highlight
        },
        [breakpoints.up('md')]: {
          fontSize: MdFontSizes.body2Highlight
        },
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
        [breakpoints.down('sm')]: {
          fontSize: XsFontSizes.h3
        },
        [breakpoints.up('sm')]: {
          fontSize: SmFontSizes.h3
        },
        [breakpoints.up('md')]: {
          fontSize: MdFontSizes.h3
        },
        [breakpoints.up('lg')]: {
          fontSize: LgFontSizes.h3
        },
        [breakpoints.only('xl')]: {
          fontSize: XlFontSizes.h3
        }
      }
    },
    {
      props: {
        variant: 'error'
      },
      style: {
        color: getCssVariable('errorColor'),
        fontWeight: 700,
        [breakpoints.down('sm')]: {
          fontSize: XsFontSizes.subtitle1
        },
        [breakpoints.up('sm')]: {
          fontSize: SmFontSizes.subtitle1
        },
        [breakpoints.up('md')]: {
          fontSize: MdFontSizes.subtitle1
        },
        [breakpoints.up('lg')]: {
          fontSize: LgFontSizes.subtitle1
        },
        [breakpoints.only('xl')]: {
          fontSize: XlFontSizes.subtitle1
        },
      }
    }
  ]
};

export default Typography;
