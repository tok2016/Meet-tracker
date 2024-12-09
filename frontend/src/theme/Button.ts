import { Components } from '@mui/material';

import UIColors, {getCssVariable} from '../utils/Colors';
import { breakpoints } from './BasicTypography';
import { LgFontSizes, SmFontSizes, XlFontSizes, XsFontSizes } from './FontSizes';

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
        [breakpoints.down('sm')]: {
          fontSize: XsFontSizes.input
        },
        [breakpoints.up('sm')]: {
          fontSize: SmFontSizes.input
        },
        [breakpoints.up('lg')]: {
          fontSize: LgFontSizes.input
        },
        [breakpoints.only('xl')]: {
          fontSize: XlFontSizes.input
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
        width: '13vw',
        lineHeight: 1,
        background: UIColors.mainGradient(),
        color: getCssVariable('textContrast'),
        minHeight: '3em',
        borderRadius: 10,
        [breakpoints.down('sm')]: {
          fontSize: XsFontSizes.subtitle1
        },
        [breakpoints.up('sm')]: {
          fontSize: SmFontSizes.subtitle1
        },
        ':hover': {
          background: UIColors.mainHoverGradient(),
          color: getCssVariable('textContrast')
        }
      }
    },
    {
      props: {
        variant: 'containtedTab'
      },
      style: {
        width: '13vw',
        lineHeight: 1,
        background: getCssVariable('disabled'),
        color: getCssVariable('textContrast'),
        minHeight: '3em',
        borderRadius: 10,
        [breakpoints.down('sm')]: {
          fontSize: XsFontSizes.subtitle1
        },
        [breakpoints.up('sm')]: {
          fontSize: SmFontSizes.subtitle1
        },
        ':hover': {
          background: UIColors.mainHoverGradient(),
          color: getCssVariable('textContrast')
        }
      }
    },
    {
      props: {
        variant: 'transparent'
      },
      style: {
        backgroundColor: 'transparent',
        color: getCssVariable('textSecondary')
      }
    },
    {
      props: {
        variant: 'danger'
      },
      style: {
        color: getCssVariable('error'),
        backgroundColor: 'transparent',
        ':hover': {
          backgroundColor: getCssVariable('error'),
          color: getCssVariable('textContrast')
        },
        ':active': {
          color: getCssVariable('textMain'),
          backgroundColor: 'transparent',
        }
      }
    },
    {
      props: {
        variant: 'filter'
      },
      style: {
        color: getCssVariable('textSecondary'),
        fontWeight: 700,
        backgroundColor: 'transparent',
        ':hover': {
          color: getCssVariable('textHighlight'),
          backgroundColor: 'transparent',
        },
        ':active': {
          backgroundColor: 'transparent',
        }
      }
    },
    {
      props: {
        variant: 'filterSelected'
      },
      style: {
        color: getCssVariable('textHighlight'),
        fontWeight: 700,
        backgroundColor: 'transparent',
        ':hover': {
          color: getCssVariable('textHighlight'),
          backgroundColor: 'transparent',
        },
        ':active': {
          backgroundColor: 'transparent',
        }
      }
    },
    {
      props: {
        variant: 'filterValuable'
      },
      style: {
        color: getCssVariable('textMain'),
        fontWeight: 700,
        backgroundColor: 'transparent',
        ':hover': {
          color: getCssVariable('textHighlight'),
          backgroundColor: 'transparent',
        },
        ':active': {
          backgroundColor: 'transparent',
        }
      }
    },
    {
      props: {
        variant: 'filterValue'
      },
      style: {
        color: getCssVariable('textMain'),
        backgroundColor: 'transparent',
        fontWeight: 700,
        [breakpoints.down('sm')]: {
          fontSize: XsFontSizes.subtitle1
        },
        [breakpoints.up('sm')]: {
          fontSize: SmFontSizes.subtitle1
        },
        [breakpoints.up('lg')]: {
          fontSize: LgFontSizes.subtitle1
        },
        [breakpoints.only('xl')]: {
          fontSize: XlFontSizes.subtitle1
        },
        padding: 0,
        height: '1.1em',
        ':hover': {
          color: getCssVariable('error'),
          backgroundColor: 'transparent',
        },
        ':active': {
          backgroundColor: 'transparent',
        }
      }
    }
  ]
};

export default Button;
